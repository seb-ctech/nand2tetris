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
  dest: {
    M: 3,
    D: 2,
    A: 1
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

testInstructions = [
  "@101",
  "(LOOP)",
  "@LOOP",
  "D = A+1; JLT",
  "A=D-1; // Some Comment and D=M+1 code",
  "0;JMP",
  "//Comment to eliminate"
]

function assemble(code){
  return someBinary;
}


function assemblePrograms(programs){
  programs.map(program => ({src: program, bin: assemble(readInputFile(program))}))
    .forEach(binary => writeBinaryFile(binary.bin, path.format({
      dir: "./",
      name: path.parse(binary.src).name,
      ext: ".hack"
    })))
}

function readInputFile(path){
  const inputStream = fs.readFileSync(path, 'utf8');
  const lines = inputStream.split("\n");
  return lines;
}

function removeComments(lines){
  const ruleFindComments = new RegExp("\/\/.*", 'g');
  const ruleCommentedLine = new RegExp("^\/\/.*", 'g');
  const ruleFindEmptyLines = new RegExp("^\s*$", 'g');
  return lines.filter(line => !ruleFindEmptyLines.test(line))
    .map(line => line.replace(/\s/g, ""))
    .filter(line => !ruleCommentedLine.test(line))
    .map(line => line.replace(ruleFindComments, ""))
}

function writeBinaryFile(code, path){
  fs.writeFile(path, code.join("\n"), console.error);
}



// Parsing


// Code Translation
function identifyOpCode(){

}



// Symbol Table Handling

function resolveSymbols(){

}

function assignLabels(){

}