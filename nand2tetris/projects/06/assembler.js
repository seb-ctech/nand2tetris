const fs = require('fs')
const path = require('path')

// TODO: Progress in stages
const args = process.argv.slice(2);

const someBinary = [
  "0001000100100111",
  "0001111100100001",
  "1111000100100101",
  "0101010100100111"
]

const programs = [
  "./add/Add.asm",
  "./max/Max.asm",
  "./max/MaxL.asm",
  "./pong/Pong.asm",
  "./pong/PongL.asm",
  "./rect/Rect.asm",
  "./rect/RectL.asm"
]

const C = {
  op:
    {
      "0": "101010",
      "1": "111111",
      "-1": "111010",
      "D": "001100",
      "X": "110000",
      "!D": "001101",
      "!X": "110001",
      "-D": "001111",
      "-X": "110011",
      "D+1": "011111",
      "X+1": "110111",
      "D-1": "001110",
      "X-1": "110010",
      "D+X": "000010",
      "D-X": "010011",
      "X-D": "000111",
      "D&X": "000000",
      "D|X": "010101"
    }
  ,
  opmode: {
    "A": 0,
    "M": 1
  },
  dest: {
    "n": "000",
    "M": "001",
    "D": "010",
    "MD": "011",
    "A": "100",
    "AM": "101",
    "AD": "110",
    "AMD": "111"
  },
  jump: {
    n: "000",
    JGT: "001",
    JEQ: "010",
    JGE: "011",
    JLT: "100",
    JNE: "101",
    JLE: "110",
    JMP: "111"
  }
}

assemblePrograms([
  programs[0], 
  programs[2], 
  programs[4], 
  programs[6]
]);

function assemblePrograms(programs){
  programs.map(program => ({src: program, bin: assemble(readInputFile(program))}))
    .forEach(binary => writeBinaryFile(binary.bin, path.format({
      dir: "./",
      name: path.parse(binary.src).name,
      ext: ".hack"
    })))
}

function assemble(code){
  const clean_code = removeComments(code);
  return clean_code.map(instruction => match_instruction(instruction, resolveA, resolveC));
}

function match_instruction(instruction, onA, onC){
  if(/^@.*$/.test(instruction)){
    return "0" + onA(instruction);
  } else {
    return "1" + onC(instruction);
  }
}

function resolveA(instruction){
  const stripped = instruction.replace("@", "");
  return resolveValue(stripped);
}

function resolveValue(value){
  if(/\d*/.test(value)){
    return convertToBinary(value);
  } else {
    //TODO: Is Variable
    return "000000000000000"
  }
}

function resolveC(instruction){
  console.log({instruction});
  const buffer = "11";
  const hasAssignment = instruction.includes("=");
  const assignCompute = instruction.split("=");
  const computeJump = (hasAssignment ? assignCompute[1] : assignCompute[0]).split(";");
  const computation = parseComputation(computeJump[0]);
  const parsed = {
    op: C.op[computation.op],
    opmode: C.opmode[computation.mode],
    dest: parseDestination(hasAssignment ? assignCompute[0] : null),
    jump: C.jump[computeJump[1] ? computeJump[1] : "n"]
  }
  return buffer + parsed.opmode + parsed.op + parsed.dest + parsed.jump;
}

function parseComputation(computation){
  const match = computation.match(/(A|M){1}/);
  return {
    op: computation.replace(/A|M/, "X"),
    mode: match ? match[0] : "A"
  }
}

function parseDestination(destination){
  return destination ?  C.dest[destination] : C.dest["n"]
}

//TODO: How to solve this functionally?
function convertToBinary(value){
  const length = 14;
  let numberToMatch = Math.pow(2, length);
  let remainingValue = value;
  let finalBinary = "";
  if(value > 0){
    while(numberToMatch >= 1){
      if(remainingValue >= numberToMatch){
        finalBinary += "1";
        remainingValue -= numberToMatch;
      } else {
        finalBinary += "0";
      }
      numberToMatch /= 2;
    }
  } else {
    for(let i = 0; i <= length; i++){
      finalBinary += "0";
    }
  }
  return finalBinary;
}

function readInputFile(path){
  const inputStream = fs.readFileSync(path, 'utf8');
  const lines = inputStream.split("\n");
  return lines;
}

function log(value, additional=""){
  console.log(value, additional);
  return value
}

function removeComments(lines){
  const ruleFindComments = new RegExp("\s*\/\/.*", 'g');
  return lines
    .map(line => line.replace(/\s/g, ""))
    .map(line => line.replace(ruleFindComments, ""))
    .filter(line => line.length > 0)
}

function writeBinaryFile(code, path){
  fs.writeFile(path, code.join("\n"), console.error);
}


// Symbol Table Handling

function resolveSymbols(){

}

function assignLabels(){

}