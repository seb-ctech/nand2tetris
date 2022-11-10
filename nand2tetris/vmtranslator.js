const fs = require('fs')
const path = require('path')

// TODO: Add Error Handling -> throw new SyntaxError("Hello", "someFile.js", 10)

const symbolMap = {
  sp: "SP",
  local: "LCL",
  this: "THIS",
  that: "THAT",
  argument: "ARG"
}

// TODO: Should I make command a class to simulate types ? 
// A Constructor, and various getters (non mutable)

// TODO INPUT Either file oder directory name indirection
// OUTPUT: Either fileName.asm or directoryName.asm

const input_file = process.argv[2];
const filename = path.basename(input_file, ".vm")

const assert = (assertion, onValid, error, line) => value => {
  if(assertion(value)){
    return onValid(value)
  } else {
    throw new SyntaxError(error(value), input_file, line)
  }
}

translate(input_file);

function translate(input_file){
  const lines = removeComments(fs.readFileSync(input_file, 'utf8').split('\r\n'));
  const translation = lines.map( (line, i) => writer(parse(line, i))).join("\n");
  const output_file = path.join(path.dirname(input_file), filename + ".asm");
  fs.writeFileSync(output_file, translation, console.error);
}

//TODO: Add a check for invalid symbols and add "label", "goto", "if-goto", "return", "call" and "function"
function parse(line, i){
  const keys = ["command", "target", "value"]
  const parts = line.split(" ").map(part => part.replace(/\s./g, ""));
  const assembled_command = Object.fromEntries(Object.keys(parts).map(index => [keys[index], parts[index]]));
  return Object.assign(assembled_command, {code_line: i});
}

function writer(command){
  const original = "// " + Object.values(command).join(" ");
  const assembly = writeAssembly(command);
  const block = (process.argv[3] == "--no-debug" ? "" : original + "\n") + assembly
  return block
}

//TODO: Needs:
// setFileName and informs the codeWriter that a new VM File started
// writeInit bootstrap code
// writeLabel 
// writeGoto
// writeIf
// writeFunction
// writeCall
// writeReturn

function writeAssembly(command){
  const combineLines = lines => lines.filter(line => line.length > 0).join("\n")
  const hasRandomAddress = symbolMap[command.target] !== undefined;
  const isConstant = command.target == "constant";
  const resolveLocation = command => {
    switch(command.target){
      case "static": return "@" + filename + "." + command.value
      case "temp": return "@" + "R" + (5 + parseInt(command.value))
      case "pointer": return "@" + symbolMap[["this", "that"][
        assert(v => v < 2, v => v, v => `pointer ${v} invalid. Pointer can only be 0 or 1`, command.code_line)(command.value)
      ]]
      case "constant": return combineLines([
        "@" + command.value
      ]);
      default: return combineLines([
        "@" + symbolMap[command.target]
      ]);
    }
  }
  const tempPointer = "@R13"
  const mem = {
    read: "D=M", 
    write: "M=D",
    ref: "M=A",
    deref: "A=M", 
    offset: value => combineLines(["A=M","D=A","@" + value])
  }
  const stackChange = offset => combineLines(["@SP", "M=M" + offset])

  const unaryOp = commandsToWrap => [
    stackChange("-1"),
    mem.deref,
    mem.read].concat(commandsToWrap)
    .concat([
      stackChange("+1")
    ])

  const binaryOp = commandsToWrap => [
    stackChange("-1"),
    mem.deref,
    mem.read,
    stackChange("-1"),
    mem.deref].concat(commandsToWrap)
    .concat([
      stackChange("+1")
    ])

  const comparisonAlgorithmCode = (vmcommand, op) => {
    const label = buildUniqueLabel(vmcommand, command.code_line);
    return binaryOp([
      "D=M-D",
      "@" + label,
      "D;" + op,
      "@SP",
      mem.deref,
      "M=0",
      "@" + label + ".End",
      "0;JMP",
      "(" + label + ")",
      "@SP",
      mem.deref,
      "M=-1",
      "(" + label + ".End" + ")"
    ])
  }

  //TODO: Give it an argument to overwrite the higher-scope command so that it can be used inside of other commands
  const commandTranslator = {
    "pop": () => combineLines(
        hasRandomAddress ? 
        [
          resolveLocation(command),
          mem.offset(command.value),
          "D=D+A",
          tempPointer,
          mem.write,
          stackChange("-1"),
          mem.deref,
          mem.read,
          tempPointer,
          mem.deref,
          mem.write
        ] 
        : 
        [
          stackChange("-1"),
          mem.deref,
          mem.read,
          resolveLocation(command),
          mem.write
        ]
      ),
    "push": () => combineLines(
        (hasRandomAddress ?
        [
          resolveLocation(command),
          mem.offset(command.value),
          "A=D+A",
          mem.read
        ]
        : isConstant ?
        [
          resolveLocation(command),
          "D=A"
        ]
        :
        [
          resolveLocation(command),
          mem.read
        ]).concat([
          "@SP",
          mem.deref,
          mem.write,
          stackChange("+1")
        ])
      ),
    "add": () => combineLines(
      binaryOp(["M=M+D"])
    ),
    "sub": () => combineLines(
      binaryOp(["M=M-D"])
    ),
    "neg": () => combineLines(
      unaryOp(["M=-D"])
    ), 
    "eq": () => combineLines(
      comparisonAlgorithmCode("eq", "JEQ")
    ),
    "gt": () => combineLines(
      comparisonAlgorithmCode("gt", "JGT")
    ), 
    "lt": () => combineLines(
      comparisonAlgorithmCode("lt", "JLT")
    ),
    "and": () => combineLines(
      binaryOp(["M=M&D"])
    ), 
    "or": () => combineLines(
      binaryOp(["M=M|D"])
    ), 
    "not": () => combineLines(
      unaryOp(["M=!D"])
    )
  }
  return commandTranslator[command.command]()
}

function removeComments(lines){
  const ruleFindComments = new RegExp("\s*\/\/.*", 'g');
  return lines
    .map(line => line.replace(ruleFindComments, ""))
    .filter(line => line.length > 0)
}

function buildUniqueLabel(keyword, i){
  return filename + "." + keyword.toUpperCase() + "." + i
}