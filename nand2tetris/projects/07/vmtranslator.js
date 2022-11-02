const fs = require('fs')
const path = require('path')

const symbolMap = {
  sp: "SP",
  local: "LCL",
  this: "THIS",
  that: "THAT",
  argument: "ARG"
}

const input_file = process.argv[2];
const filename = path.basename(input_file, ".vm")

translate(input_file);


function translate(input_file){
  const lines = removeComments(fs.readFileSync(input_file, 'utf8').split('\r\n'));
  const translation = lines.map(line => writer(parse(line))).join("\n");
  const output_file = path.join(path.dirname(input_file), filename + ".asm");
  fs.writeFileSync(output_file, translation, console.error);
}

function parse(line){
  const keys = ["command", "target", "value"]
  const parts = line.split(" ").map(part => part.replace(/\s./g, ""));
  return Object.fromEntries(Object.keys(parts).map(index => [keys[index], parts[index]]))
}

function writer(command){
  const original = "// " + Object.values(command).join(" ");
  const assembly = writeAssembly(command);
  const block = original + "\n" + assembly
  return block
}

//TODO: Implement comparison operators
function writeAssembly(command){
  const combineLines = lines => lines.filter(line => line.length > 0).join("\n")
  const hasRandomAddress = symbolMap[command.target] !== undefined;
  const isConstant = command.target == "constant";
  const isPointer = command.target == "pointer";
  const resolveLocation = command => {
    switch(command.target){
      case "static": return "@" + filename + "." + command.value
      case "temp": return "@" + "R" + (5 + parseInt(command.value))
      case "pointer": return "@" + (command.value == 0 ? symbolMap["this"] : symbolMap["that"])
      case "constant": return combineLines([
        "@" + command.value
      ]);
      default: return combineLines([
        "@" + symbolMap[command.target]
      ]);
    }
  }
  const tempPointer = "@R13"
  const tempValueA = "@R14"
  const tempValueB = "@R15"
  const mem = {
    read: "D=M", 
    write: "M=D",
    ref: "M=A",
    deref: "A=M", 
    offset: value => combineLines(["A=M","D=A","@" + value])
  }
  const stackChange = offset => combineLines(["@SP", "M=M" + offset])
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
    "add": () => combineLines([
      stackChange("-1"),
      mem.deref,
      mem.read,
      stackChange("-1"),
      mem.deref,
      "M=M+D",
      stackChange("+1")
    ]),
    "sub": () => combineLines([
      stackChange("-1"),
      mem.deref,
      mem.read,
      stackChange("-1"),
      mem.deref,
      "M=M-D",
      stackChange("+1")
    ]),
    "neg": () => combineLines([
      stackChange("-1"),
      mem.deref,
      mem.read,
      "M=-D",
      stackChange("+1")
    ]), 
    "eq": () => combineLines([

    ]),
    "gt": () => combineLines([

    ]), 
    "lt": () => combineLines([

    ]),
    "and": () => combineLines([
      stackChange("-1"),
      mem.deref,
      mem.read,
      stackChange("-1"),
      mem.deref,
      "M=M&D",
      stackChange("+1")
    ]), 
    "or": () => combineLines([
      stackChange("-1"),
      mem.deref,
      mem.read,
      stackChange("-1"),
      mem.deref,
      "M=M|D",
      stackChange("+1")
    ]), 
    "not": () => combineLines([
      stackChange("-1"),
      mem.deref,
      mem.read,
      "M=!D",
      stackChange("+1")
    ])
  }
  return commandTranslator[command.command]()
}

function removeComments(lines){
  const ruleFindComments = new RegExp("\s*\/\/.*", 'g');
  return lines
    .map(line => line.replace(ruleFindComments, ""))
    .filter(line => line.length > 0)
}