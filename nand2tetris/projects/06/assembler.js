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

testPrograms(["./max/MaxL.asm"]);

function assemble(code){
  return someBinary;
}


function testPrograms(programs){
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


function writeBinaryFile(code, path){
  fs.writeFile(path, code.join("\n"), console.error);
}



// Parsing

// Code Translation


// Symbol Table Handling

// Main Process