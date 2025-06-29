# Inertz Script

A JavaScript-inspired interpreted programming language with C++-like structure, built in Node.js.

## Features

### Data Types
- **Numbers**: `int` and `float` (automatic detection)
- **Strings**: `"hello world"`
- **Booleans**: `true`, `false`
- **Null**: `null`

### Language Constructs
- **Variables**: `var name = value;`
- **Functions**: `function name(params) { ... }`
- **Control Flow**: `if/else`, `while` loops
- **Operators**: Arithmetic (`+`, `-`, `*`, `/`, `%`), Comparison (`==`, `!=`, `>`, `<`, `>=`, `<=`), Logical (`&&`, `||`, `!`)
- **Ternary**: `condition ? true_value : false_value`

### Built-in Functions
- `print(...)` - Output to console
- `len(string)` - Get string length
- `typeof(value)` - Get type of value
- `abs(number)` - Absolute value
- `floor(number)` - Floor function
- `ceil(number)` - Ceiling function
- `round(number)` - Round to nearest integer
- `sqrt(number)` - Square root
- `pow(base, exp)` - Power function

## Installation & Usage

### Running Files
```bash
# Install dependencies
npm install

# Run a Inertz Script file
npm start examples/demo.bn
npm run example

# Run specific file
node src/main.js path/to/your/file.bn
```

### Interactive REPL
```bash
# Start the REPL
npm run repl

# In REPL, type Inertz Script code:
inertz> var x = 10;
inertz> print(x * 2);
20
inertz> exit
```

### Running Tests
```bash
npm test
```

## Example Code

```inertz
// Variables and basic operations
var name = "Indra";
var age = 25;
var total = age * 2;

// Control flow
if (total > 40) {
    print("Big number!");
} else {
    print("Small number");
}

// Functions
function greet(person) {
    print("Hello, " + person + "!");
}

function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Function calls
greet(name);
print("5! =", factorial(5));

// Loops
var count = 3;
while (count > 0) {
    print("Countdown:", count);
    count = count - 1;
}

// Built-in functions
print("Type of age:", typeof(age));
print("Length of name:", len(name));
print("Square root of 16:", sqrt(16));
```

## Project Structure

```
inertz-script/
├── src/
│   ├── main.js         # Main CLI interface
│   ├── repl.js         # Interactive REPL
│   ├── lexer.js        # Tokenizer/Lexer
│   ├── parser.js       # Parser (generates AST)
│   ├── ast.js          # AST node definitions
│   ├── interpreter.js  # Interpreter/Evaluator
│   ├── environment.js  # Variable scoping
│   ├── builtins.js     # Built-in functions
│   ├── token.js        # Token definitions
│   └── test.js         # Test suite
├── examples/
│   ├── demo.bn         # Language showcase
│   ├── fibonacci.bn    # Fibonacci sequence
│   └── calculator.bn   # Simple calculator
└── README.md
```

## Language Design

Inertz Script follows these design principles:

1. **Familiar Syntax**: JavaScript-inspired syntax for ease of learning
2. **Strong Foundation**: Proper lexer, parser, and AST-based interpreter
3. **Modular Architecture**: Clean separation of concerns
4. **Extensible**: Easy to add new features and built-ins
5. **Error Handling**: Comprehensive error reporting

## Technical Implementation

- **Lexical Analysis**: Converts source code into tokens
- **Parsing**: Builds Abstract Syntax Tree (AST) using recursive descent parser
- **Interpretation**: Tree-walking interpreter with proper scoping
- **Environment**: Lexical scoping with environment chains
- **Built-ins**: Native function support with proper arity checking

## Future Enhancements

- Arrays and objects
- For loops
- Import/export system
- Standard library modules
- Bytecode compilation
- Debugging support