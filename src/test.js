#!/usr/bin/env node

const BanjarScript = require('./main');

class BanjarTester {
  constructor() {
    this.banjar = new BanjarScript();
    this.passed = 0;
    this.failed = 0;
  }

  test(name, code, expectedOutput = null) {
    console.log(`\n--- Testing: ${name} ---`);
    
    try {
      // Capture console output
      const originalLog = console.log;
      const outputs = [];
      console.log = (...args) => {
        outputs.push(args.join(' '));
      };

      this.banjar.run(code);

      // Restore console.log
      console.log = originalLog;

      if (expectedOutput !== null) {
        const actualOutput = outputs.join('\n');
        if (actualOutput === expectedOutput) {
          console.log('✅ PASSED');
          this.passed++;
        } else {
          console.log('❌ FAILED');
          console.log('Expected:', expectedOutput);
          console.log('Actual:', actualOutput);
          this.failed++;
        }
      } else {
        console.log('✅ PASSED (no output check)');
        this.passed++;
        // Show the output
        if (outputs.length > 0) {
          console.log('Output:', outputs.join('\n'));
        }
      }
    } catch (error) {
      console.log('❌ FAILED with error:', error.message);
      this.failed++;
    }
  }

  runTests() {
    console.log('Banjar Script Test Suite');
    console.log('========================');

    // Basic arithmetic
    this.test('Basic Arithmetic', `
      var a = 10;
      var b = 5;
      print(a + b);
      print(a - b);
      print(a * b);
      print(a / b);
    `, '15\n5\n50\n2');

    // Variables and types
    this.test('Variables and Types', `
      var num = 42;
      var str = "hello";
      var bool = true;
      var nothing = null;
      print(typeof(num));
      print(typeof(str));
      print(typeof(bool));
      print(typeof(nothing));
    `, 'int\nstring\nbool\nnull');

    // String concatenation
    this.test('String Concatenation', `
      var first = "Hello";
      var second = "World";
      print(first + " " + second);
    `, 'Hello World');

    // Control flow
    this.test('If Statement', `
      var x = 10;
      if (x > 5) {
          print("big");
      } else {
          print("small");
      }
    `, 'big');

    // While loop
    this.test('While Loop', `
      var i = 3;
      while (i > 0) {
          print(i);
          i = i - 1;
      }
    `, '3\n2\n1');

    // Functions
    this.test('Function Definition and Call', `
      function add(a, b) {
          return a + b;
      }
      var result = add(3, 4);
      print(result);
    `, '7');

    // Recursion
    this.test('Recursive Factorial', `
      function factorial(n) {
          if (n <= 1) {
              return 1;
          }
          return n * factorial(n - 1);
      }
      print(factorial(5));
    `, '120');

    // Ternary operator
    this.test('Ternary Operator', `
      var x = 10;
      var result = x > 5 ? "big" : "small";
      print(result);
    `, 'big');

    // Logical operators
    this.test('Logical Operators', `
      print(true && false);
      print(true || false);
      print(!true);
    `, 'false\ntrue\nfalse');

    // Built-in functions
    this.test('Built-in Functions', `
      print(len("hello"));
      print(abs(-5));
      print(sqrt(16));
    `, '5\n5\n4');

    // Summary
    console.log('\n========================');
    console.log(`Tests completed: ${this.passed + this.failed}`);
    console.log(`Passed: ${this.passed}`);
    console.log(`Failed: ${this.failed}`);
    console.log(`Success rate: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
  }
}

function main() {
  const tester = new BanjarTester();
  tester.runTests();
}

if (require.main === module) {
  main();
}

module.exports = BanjarTester;