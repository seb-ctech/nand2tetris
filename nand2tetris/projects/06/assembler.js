const fs = require('fs')


// TODO: Progress in stages
const args = process.argv.slice(2);

const someBinary = [
  "0001000100100111",
  "0001111100100001",
  "1111000100100101",
  "0101010100100111"
]

function testPrograms(){
  
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