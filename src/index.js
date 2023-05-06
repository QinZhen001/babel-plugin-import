const fs = require('fs');
const { open } = require("fs/promises")
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


async function ASTDelSSOCode(filePath) {
  let code = fs.readFileSync(filePath, 'utf-8');
  const ast = parse(code);
  const { comments } = ast
  let start = 0
  let end = 0
  for (let i = 0;i < comments.length;i++) {
    const comment = comments[i]
    if (comment.value.includes('SSO')) {
      const { loc } = comment
      if (start === 0) {
        start = loc.start.line
      } else {
        end = loc.start.line
      }
    }
  }

  console.log(code)

  // filehandle = await open(filePath);
  // for await (const line of filehandle.readLines()) {
  //   console.log(line);
  // }



  // const res = traverse(ast, {
  //   // CommentBlock(path) {
  //   //   console.log(path.node)
  //   // }
  // });
  // console.log(ast)
  // const output = generate(
  //   ast,
  //   {
  //     // ...options
  //   },
  //   code
  // );
  // fs.writeFileSync(outputPath, output.code);



}


main();
