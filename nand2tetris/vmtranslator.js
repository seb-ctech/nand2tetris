const fs = require('fs')
const path = require('path')

const validCommands = [
  "pop",
  "push",
  "call",
  "return",
  "function",
  "label",
  "if-goto",
  "goto",
  "add",
  "sub",
  "neg",
  "eq",
  "gt",
  "lt",
  "and",
  "or",
  "not"
]

const validSegments = [
  "local",
  "static",
  "constant",
  "pointer",
  "temp",
  "this",
  "that",
  "argument"
]

const symbolMap = {
  sp: "SP",
  local: "LCL",
  this: "THIS",
  that: "THAT",
  argument: "ARG"
}

const trace = message => value => {
  console.log(message, value);
  return value;
}

const assert = (file, line) => (assertion, onValid, error) => value => {
  if(assertion(value)){
    return onValid(value)
  } else {
    console.trace()
    console.error({
      error: error(value),
      file,
      line
    })
    process.exit()
  }
}

class Command {
  constructor(string, line_number, file){
    this.original = string;
    this.assert = assert(file, line_number);
    const parts = string.split(" ").map(part => part.replace(/\s./g, "").replace(/\t/g, ""))
    this.file = file;
    this.line = line_number;
    this.type = this.assert(value => validCommands.includes(value),
      v => v,
      v => "Command '" + v + "' is invalid or unrecognized")(parts[0]);
    this.isMemoryCommand = this.type === "pop" || this.type === "push";
    this.isBranchCommand = this.type === "goto" || this.type === "if-goto";
    if(this.isMemoryCommand){
      this.segment = this.assert(value => validSegments.includes(value),
        v => v,
        v => "Segment '" + v + "' is invalid or unrecognized")(parts[1]);
      this.isConstant = this.segment === "constant";
      this.value = this.assert(value => Number.isInteger(parseInt(value)),
      v => v,
      v => "Last argument is not a number or missing")(parts[2]);
    } else if (this.isBranchCommand){
      this.target = parts[1]
    } else {
      this.arguments = parts.slice(1);
    }
  }

  hasRandomAddress(){
    return symbolMap[this.segment] !== undefined
  }

  resolveLocation(){
    switch(this.segment){
      case "static": return "@" + this.file + "." + this.value
      case "temp": return "@" + "R" + (5 + parseInt(this.value))
      case "pointer": return "@" + symbolMap[["this", "that"][
        assert(this.file, this.line)(v => v < 2, v => v, v => `pointer ${v} invalid. Pointer can only be 0 or 1`)(this.value)
      ]]
      case "constant": return "@" + this.value
      default: return "@" + symbolMap[this.segment]
    }
  }

  buildUniqueLabel(){
    return this.file + "." + this.type.toUpperCase() + "." + this.line
  }

}
// Kinda Functor
class InputToOutputMapper {
  constructor(source, ext, out){
    this.extension = "." + ext;
    this.targetExtension = "." + out;
    this.source = source;
    if(!fs.existsSync(source)){
      throw new Error("Invalid or non existing directory")
    }
    this.dirName = path.basename(source);
    this.files = fs.readdirSync(this.source, "utf8")
      .filter(file => file.endsWith(this.extension))
      .map(file => ({
        name: path.basename(file, this.extension),
        dir: path.join(this.source, file)
      }));
    this.isDirectory = this.files.length > 1;
  }

  mapToJoinedFiles(f){
    return [].concat(...this.files.map(file => f(file)))
  }

  get out(){
    return path.join(this.source, (this.isDirectory ? this.dirName : this.files[0].name) + this.targetExtension)
  }
}

const mapper = new InputToOutputMapper(process.argv[2], "vm", "asm");
const combineLines = lines => lines.filter(line => line.length > 0).join("\n")
const bootstrap = [
  "@256",
  "D=A",
  "@SP",
  "M=D",
  writeAssembly(new Command("call Sys.init", 2, "__BTSTRP"))
]
const load = file => fs.readFileSync(file, 'utf8').split(/\r\n/)
const preprocess = lines => removeComments(lines)

const writer = command => (process.argv[3] == "--no-debug" ? "" : "// " + command.original + "\n") + writeAssembly(command)

const runCompiler = () => fs.writeFileSync(
  mapper.out,
  bootstrap.concat(
  mapper.mapToJoinedFiles( file =>
    preprocess(load(file.dir))
    .map((line, i) => writer(new Command(line, i, file.name)))
  )).join("\n"), console.error);

runCompiler()

function writeAssembly(command){
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

  const comparisonAlgorithmCode = (op) => {
    const label = command.buildUniqueLabel();
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
  
  const commandTranslator = command => {
    switch(command.type){
     case "pop": return combineLines(
          command.hasRandomAddress() ? 
          [
            command.resolveLocation(),
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
            command.resolveLocation(),
            mem.write
          ]
        );
      case "push": return combineLines(
          (command.hasRandomAddress() ?
          [
            command.resolveLocation(),
            mem.offset(command.value),
            "A=D+A",
            mem.read
          ]
          : command.isConstant ?
          [
            command.resolveLocation(),
            "D=A"
          ]
          :
          [
            command.resolveLocation(),
            mem.read
          ]).concat([
            "@SP",
            mem.deref,
            mem.write,
            stackChange("+1")
          ])
        );
      case "add": return combineLines(
        binaryOp(["M=M+D"])
      );
      case "sub": return combineLines(
        binaryOp(["M=M-D"])
      );
      case "neg": return combineLines(
        unaryOp(["M=-D"])
      ); 
      case "eq": return combineLines(
        comparisonAlgorithmCode("JEQ")
      );
      case "gt": return combineLines(
        comparisonAlgorithmCode("JGT")
      ); 
      case "lt": return combineLines(
        comparisonAlgorithmCode("JLT")
      );
      case "and": return combineLines(
        binaryOp(["M=M&D"])
      ); 
      case "or": return combineLines(
        binaryOp(["M=M|D"])
      ); 
      case "not": return combineLines(
        unaryOp(["M=!D"])
      );
      case "label": return command.arguments[0] + ":";
      default: return "not implemented yet".toUpperCase()
      // TODO: write Goto
      // TODO: write If
      // TODO: write Function
      // TODO: write Call
      // TODO: write Return
    } 
  }
  console.log(command)
  return commandTranslator(command)
}

function removeComments(lines){
  const ruleFindComments = new RegExp("\s*\/\/.*", 'g');
  return lines
    .map(line => line.replace(ruleFindComments, ""))
    .filter(line => line.length > 0)
}