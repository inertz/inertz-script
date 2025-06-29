#!/usr/bin/env node

const readline = require('readline');
const BanjarScript = require('./main');

class BanjarREPL {
  constructor() {
    this.banjar = new BanjarScript();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'banjar> '
    });
  }

  start() {
    console.log('Banjar Script REPL v1.0.0');
    console.log('Type "exit" or press Ctrl+C to quit.');
    console.log('');

    this.rl.prompt();

    this.rl.on('line', (line) => {
      const input = line.trim();

      if (input === 'exit' || input === 'quit') {
        console.log('Goodbye!');
        this.rl.close();
        return;
      }

      if (input === '') {
        this.rl.prompt();
        return;
      }

      try {
        this.banjar.run(input);
      } catch (error) {
        // Error already printed by BanjarScript
      }

      this.rl.prompt();
    });

    this.rl.on('close', () => {
      console.log('\nGoodbye!');
      process.exit(0);
    });

    this.rl.on('SIGINT', () => {
      console.log('\nGoodbye!');
      process.exit(0);
    });
  }
}

function main() {
  const repl = new BanjarREPL();
  repl.start();
}

if (require.main === module) {
  main();
}

module.exports = BanjarREPL;