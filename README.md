# Inertz Script

A JavaScript-inspired interpreted programming language with C++-like structure, built in Node.js.

## Features

### Data Types
- **Numbers**: `int` and `float` (automatic detection)
- **Strings**: `"hello world"`
- **Booleans**: `true`, `false`
- **Null**: `null`
- **Arrays**: `[1, 2, 3, "hello"]`
- **Objects**: `{name: "Alice", age: 30}`

### Language Constructs
- **Variables**: `var name = value;`
- **Functions**: `function name(params) { ... }`
- **Control Flow**: `if/else`, `while` loops, `for` loops
- **For-In Loops**: `for (var key in object)` and `for (var index in array)`
- **Operators**: Arithmetic (`+`, `-`, `*`, `/`, `%`), Comparison (`==`, `!=`, `>`, `<`, `>=`, `<=`), Logical (`&&`, `||`, `!`)
- **Ternary**: `condition ? true_value : false_value`
- **Array Access**: `array[index]`
- **Object Access**: `object.property` or `object["property"]`

### Built-in Functions
- `print(...)` - Output to console
- `len(value)` - Get length of string, array, or object
- `typeof(value)` - Get type of value
- `push(array, value)` - Add element to array
- `pop(array)` - Remove and return last element from array
- `keys(object)` - Get array of object keys
- `values(object)` - Get array of object values
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

# Run arrays and objects example
node src/main.js examples/arrays-objects.bn

# Run for loops example
node src/main.js examples/for-loops.bn

# Run specific file
node src/main.js path/to/your/file.bn
```

### Interactive REPL
```bash
# Start the REPL
npm run repl

# In REPL, type Inertz Script code:
inertz> var x = [1, 2, 3];
inertz> for (var i in x) { print(i, x[i]); }
0 1
1 2
2 3
inertz> exit
```

### Running Tests
```bash
npm test
```

## Example Code

```inertz
// Variables and basic operations
var name = "Alice";
var numbers = [1, 2, 3, 4, 5];

// Traditional for loop
for (var i = 0; i < len(numbers); i = i + 1) {
    print("Number at index", i, ":", numbers[i]);
}

// For-in loop with arrays (iterates over indices)
for (var index in numbers) {
    print("Index", index, "value:", numbers[index]);
}

// Objects and for-in loops
var person = {
    name: "Alice",
    age: 30,
    city: "New York"
};

// For-in loop with objects (iterates over keys)
for (var key in person) {
    print(key + ":", person[key]);
}

// Nested loops
var matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (var row = 0; row < len(matrix); row = row + 1) {
    for (var col = 0; col < len(matrix[row]); col = col + 1) {
        print("matrix[" + row + "][" + col + "] =", matrix[row][col]);
    }
}

// Functions with loops
function findMax(arr) {
    var max = arr[0];
    for (var i = 1; i < len(arr); i = i + 1) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

var scores = [85, 92, 78, 96, 88];
print("Maximum score:", findMax(scores));
```

## Loop Types

### Traditional For Loop
```inertz
for (var i = 0; i < 10; i = i + 1) {
    print(i);
}
```

### For-In Loop with Arrays
```inertz
var fruits = ["apple", "banana", "orange"];
for (var index in fruits) {
    print("Index:", index, "Fruit:", fruits[index]);
}
```

### For-In Loop with Objects
```inertz
var person = {name: "Alice", age: 30};
for (var key in person) {
    print(key + ":", person[key]);
}
```

### For-In Loop with Strings
```inertz
var message = "Hello";
for (var i in message) {
    print("Character at", i, ":", message[i]);
}
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
│   ├── calculator.bn   # Simple calculator
│   ├── arrays-objects.bn # Arrays and objects demo
│   └── for-loops.bn    # For loops demonstration
└── README.md
```

## Language Design

Inertz Script follows these design principles:

1. **Familiar Syntax**: JavaScript-inspired syntax for ease of learning
2. **Strong Foundation**: Proper lexer, parser, and AST-based interpreter
3. **Modular Architecture**: Clean separation of concerns
4. **Extensible**: Easy to add new features and built-ins
5. **Error Handling**: Comprehensive error reporting
6. **Rich Data Types**: Support for arrays and objects with intuitive syntax
7. **Flexible Iteration**: Multiple loop types for different use cases

## Technical Implementation

- **Lexical Analysis**: Converts source code into tokens
- **Parsing**: Builds Abstract Syntax Tree (AST) using recursive descent parser
- **Interpretation**: Tree-walking interpreter with proper scoping
- **Environment**: Lexical scoping with environment chains
- **Built-ins**: Native function support with proper arity checking
- **Data Structures**: Native JavaScript arrays and objects with Inertz Script syntax
- **Loop Constructs**: Traditional for loops and for-in iteration

## For Loop Features

### Traditional For Loops
- **Syntax**: `for (initializer; condition; increment) { body }`
- **Use case**: When you need precise control over iteration
- **Example**: Counting, array traversal with indices

### For-In Loops
- **Arrays**: Iterates over array indices (0, 1, 2, ...)
- **Objects**: Iterates over object keys
- **Strings**: Iterates over character indices
- **Syntax**: `for (var variable in iterable) { body }`

### Scoping
- Loop variables are properly scoped within the loop environment
- Variables declared in loop initializers are accessible throughout the loop
- Nested loops maintain separate scopes

## Future Enhancements

- Break and continue statements
- Array methods (map, filter, reduce)
- Object methods and prototypes
- Import/export system
- Standard library modules
- Bytecode compilation
- Debugging support