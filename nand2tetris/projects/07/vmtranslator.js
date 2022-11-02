const fs = require('fs')
const path = require('path')


const input_file = process.argv[2];

const symbolMap = {
  sp: "SP",
  local: "LCL",
  this: "THIS",
  that: "THAT",
  argument: "ARG"
}

translate(input_file);

function translate(input_file){
  const lines = removeComments(fs.readFileSync(input_file, 'utf8').split('\r\n'));
  const translation = lines.map(line => writer(parse(line))).join("\n");
  const output_file = path.join(path.dirname(input_file), path.basename(input_file, ".vm") + ".asm");
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

// TODO: Return a closure that recursively goes over all commands?
function writeAssembly(command){
  const combineLines = lines => lines.filter(line => line.length > 0).join("\n")
  const isConstant = command.target == "constant"
  const resolveLocation = command => combineLines([
    "@" + (isConstant ? command.value : symbolMap[command.target]), 
    "D=A", 
    isConstant ? "" : "@" + command.value
  ])
  const tempPointer = "@R13"
  const mem = {read: "D=M", write: "M=D"}
  const stackChange = offset => combineLines(["@SP", "M=M" + offset])
  const commandTranslator = {
    "pop": command => combineLines(
        [
          resolveLocation(command),
          "D=D+A",
          tempPointer,
          mem.write,
          stackChange("-1"),
          "A=M",
          mem.read,
          tempPointer,
          "A=M",
          mem.write
        ]
      ),
    "push": command => combineLines(
        [
          resolveLocation(command),
          isConstant ? "" : "A=D+A",
          "@SP",
          "A=M",
          mem.write,
          stackChange("+1")
        ]
      ),
    "add": command => "NOPE",
    "sub": command => "NOPE"
  }
  return commandTranslator[command.command](command)
}

function removeComments(lines){
  const ruleFindComments = new RegExp("\s*\/\/.*", 'g');
  return lines
    .map(line => line.replace(ruleFindComments, ""))
    .filter(line => line.length > 0)
}