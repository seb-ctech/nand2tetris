const fs = require('fs')
const path = require('path')

// TODO: Progress in stages
const args = process.argv.slice(2);

/*

A: Address Register.
D: Data Register.
M: Refers to the register in Main Memory whose address is currently stored in A.
SP: RAM address 0.
LCL: RAM address 1.
ARG: RAM address 2.
THIS: RAM address 3.
THAT: RAM address 4.
R0-R15: Addresses of 16 RAM Registers, mapped from 0 to 15.
SCREEN: Base address of the Screen Map in Main Memory, which is equal to 16384.
KBD: Keyboard Register address in Main Memory, which is equal to 24576.

*/

const defaultSymbols = {
  "SP": 0,
  "LCL": 1,
  "ARG": 2,
  "THIS": 3,
  "THAT": 4,
  "SCREEN": 16384,
  "KBD": 24576
}

let addresses = [];

let symbolTable = {

}

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

// Failed on @END_GT: Expected(65), Got(17)

assemblePrograms(programs);

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
  symbolTable = {};
  const labeless_code = resolveLabels(clean_code);
  console.log(symbolTable);
  return labeless_code.map( (instruction, i) => match_instruction(instruction, i, resolveA, resolveC));
}

function resolveLabels(code){
 return code.filter( (line, i) => {
   if(/\((\w|.|_)+\)/.test(line)){
    	const label = line.match(/[^\(](\w|.|_)+[^\)]/)[0];
      const offset = Object.entries(symbolTable).length;
      symbolTable[label] = i - offset;
      return false
   } else return true;
 })
}

function match_instruction(instruction, line, onA, onC){
  console.log(line, ":", instruction);
  if(/^@.*$/.test(instruction)){
    return "0" + log(onA(instruction), "\n");
  } else {
    return "1" + log(onC(instruction), "\n");
  }
}

function resolveA(instruction){
  const stripped = instruction.replace("@", "");
  return resolveValue(stripped);
}

function resolveValue(value){
  if(/^\d*$/.test(value)){
    return convertToBinary(value);
  } else {
    return convertToBinary(resolveSymbol(value));
  }
}

function resolveSymbol(symbol){
  if(/R\d+/.test(symbol)){
    const registerNumber = parseInt(symbol.match(/\d+/));
    if(registerNumber >= 0 && registerNumber <= 15){
      return registerNumber
    }
  }
  if(Object.keys(defaultSymbols).includes(symbol)){
    return defaultSymbols[symbol]
  }
  if (Object.keys(symbolTable).includes(symbol)){
    return symbolTable[symbol]
  } else {
    return findFreeAddressAndAssign(symbol)
  }
}

function findFreeAddressAndAssign(symbol){
  const newAddress = addresses.length > 0 ? addresses[addresses.length - 1] + 1 : 16;
  addresses.push(newAddress);
  symbolTable[symbol] = newAddress;
  console.log({symbol, newAddress});
  return newAddress
}

function resolveC(instruction){
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