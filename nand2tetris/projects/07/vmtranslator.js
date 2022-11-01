const fs = require('fs')
const path = require('path')


const input_file = process.argv[2];

translate(input_file);

function translate(input_file){
  const lines = removeComments(fs.readFileSync(input_file, 'utf8').split('\r\n'));
  const translation = lines.map(line => writer(parse(line))).join("\n");
  const output_file = path.join(path.dirname(input_file), path.basename(input_file, ".vm") + ".asm");
  fs.writeFileSync(output_file, translation, console.error);
}

function parse(line){
  //TODO: Implement Parser
}

function writer(command){
  //TODO: Implement Writer
}

function removeComments(lines){
  const ruleFindComments = new RegExp("\s*\/\/.*", 'g');
  return lines
    .map(line => line.replace(ruleFindComments, ""))
    .filter(line => line.length > 0)
}