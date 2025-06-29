#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Lexer = require('./lexer');
const { Parser } = require('./parser');
const { Interpreter } = require('./interpreter');

class BanjarScript {
  constructor() {
    this.interpreter = new Interpreter();
  }

  runFile(filePath) {
    try {
      const source = fs.readFileSync(filePath, 'utf8');
      this.run(source);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error(`Error: File '${filePath}' not found.`);
      } else {
        console.error(`Error reading file: ${error.message}`);
      }
      process.exit(1);
    }
  }

  run(source) {
    try {
      // Lexical Analysis
      const lexer = new Lexer(source);
      const tokens = lexer.scanTokens();

      // Syntax Analysis
      const parser = new Parser(tokens);
      const statements = parser.parse();

      // Interpretation
      this.interpreter.interpret(statements);
    } catch (error) {
      console.error(`Banjar Script Error: ${error.message}`);
      process.exit(1);
    }
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Banjar Script v1.0.0');
    console.log('Usage: node src/main.js <file.bn>');
    console.log('       npm run repl  # Start interactive REPL');
    process.exit(0);
  }

  if (args.length === 1) {
    const banjar = new BanjarScript();
    banjar.runFile(args[0]);
  } else {
    console.log('Usage: node src/main.js <file.bn>');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = BanjarScript;