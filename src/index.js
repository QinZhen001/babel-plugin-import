const fs = require('fs');
const path = require('path');
const { parse } = require("@babel/parser");
const generate = require("@babel/generator").default
const traverse = require("@babel/traverse").default
const t = require("@babel/types")


const inputPath = path.join(__dirname, '../test/input.js');
const outputPath = path.join(__dirname, '../test/output.js');

function main() {
  ASTDelSSOCode(inputPath)
}


function ASTDelSSOCode(filePath) {
  let code = fs.readFileSync(p, 'utf-8');
  const ast = parse(code);
  const output = generate(
    ast,
    {
      // ...options
    },
    code
  );
  fs.writeFileSync(outputPath, output.code);
}


main();
