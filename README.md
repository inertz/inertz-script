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
- **Loop Control**: `break` and `continue` statements
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
npm start examples/demo.is
npm run example

# Run arrays and objects example
node src/main.js examples/arrays-objects.is

# Run for loops example
node src/main.js examples/for-loops.is

# Run break and continue example
node src/main.js examples/break-continue.is

# Run specific file
node src/main.js path/to/your/file.is
```

### Interactive REPL
```bash
# Start the REPL
npm run repl

# In REPL, type Inertz Script code:
inertz> var x = [1, 2, 3];
inertz> for (var i in x) { 
...       if (i == 1) continue;
...       print(i, x[i]); 
...     }
0 1
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

// Traditional for loop with break
for (var i = 0; i < len(numbers); i = i + 1) {
    if (numbers[i] == 3) {
        print("Found 3, breaking!");
        break;
    }
    print("Number:", numbers[i]);
}

// For-in loop with continue
for (var index in numbers) {
    if (numbers[index] % 2 == 0) {
        continue; // Skip even numbers
    }
    print("Odd number:", numbers[index]);
}

// While loop with break and continue
var count = 0;
while (count < 10) {
    count = count + 1;
    if (count % 3 == 0) {
        continue; // Skip multiples of 3
    }
    if (count > 7) {
        break; // Exit when count > 7
    }
    print("Count:", count);
}

// Nested loops with break
for (var row = 1; row <= 3; row = row + 1) {
    for (var col = 1; col <= 3; col = col + 1) {
        if (row == 2 && col == 2) {
            print("Breaking inner loop");
            break;
        }
        print("Position:", row, col);
    }
}
```

## Loop Control Statements

### Break Statement
- **Purpose**: Immediately exit the current loop
- **Usage**: `break;`
- **Works with**: `while`, `for`, and `for-in` loops
- **Behavior**: Exits only the innermost loop containing the break statement

```inertz
for (var i = 0; i < 10; i = i + 1) {
    if (i == 5) {
        break; // Exit loop when i equals 5
    }
    print(i); // Prints 0, 1, 2, 3, 4
}
```

### Continue Statement
- **Purpose**: Skip the rest of the current iteration and continue with the next
- **Usage**: `continue;`
- **Works with**: `while`, `for`, and `for-in` loops
- **Behavior**: Jumps to the next iteration of the innermost loop

```inertz
for (var i = 0; i < 5; i = i + 1) {
    if (i == 2) {
        continue; // Skip when i equals 2
    }
    print(i); // Prints 0, 1, 3, 4
}
```

### Nested Loop Control
- Break and continue only affect the innermost loop
- To break out of multiple nested loops, use flags or function returns

```inertz
var found = false;
for (var i = 0; i < 3 && !found; i = i + 1) {
    for (var j = 0; j < 3; j = j + 1) {
        if (i == 1 && j == 1) {
            found = true;
            break; // Only breaks inner loop
        }
        print(i, j);
    }
}
```

## Loop Types

### Traditional For Loop
```inertz
for (var i = 0; i < 10; i = i + 1) {
    if (i == 5) break;
    if (i % 2 == 0) continue;
    print(i);
}
```

### For-In Loop with Arrays
```inertz
var fruits = ["apple", "banana", "orange"];
for (var index in fruits) {
    if (fruits[index] == "banana") continue;
    print("Index:", index, "Fruit:", fruits[index]);
}
```

### For-In Loop with Objects
```inertz
var person = {name: "Alice", age: 30, city: "New York"};
for (var key in person) {
    if (key == "age") continue;
    print(key + ":", person[key]);
}
```

### While Loop
```inertz
var i = 0;
while (i < 10) {
    i = i + 1;
    if (i % 2 == 0) continue;
    if (i > 7) break;
    print(i);
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
│   ├── demo.is         # Language showcase
│   ├── fibonacci.is    # Fibonacci sequence
│   ├── calculator.is   # Simple calculator
│   ├── arrays-objects.is # Arrays and objects demo
│   ├── for-loops.is    # For loops demonstration
│   └── break-continue.is # Break and continue examples
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
8. **Structured Control Flow**: Break and continue for precise loop control

## Technical Implementation

- **Lexical Analysis**: Converts source code into tokens
- **Parsing**: Builds Abstract Syntax Tree (AST) using recursive descent parser
- **Interpretation**: Tree-walking interpreter with proper scoping
- **Environment**: Lexical scoping with environment chains
- **Built-ins**: Native function support with proper arity checking
- **Data Structures**: Native JavaScript arrays and objects with Inertz Script syntax
- **Loop Constructs**: Traditional for loops and for-in iteration
- **Exception Handling**: Break and continue implemented as controlled exceptions

## Control Flow Features

### Exception-Based Control Flow
- Break and continue are implemented using JavaScript exceptions
- Exceptions are caught and handled appropriately within loop constructs
- Only affects the immediate containing loop (proper scoping)

### Loop Scoping
- Each loop creates its own environment scope
- Variables declared in loop initializers are properly scoped
- Break and continue respect lexical scoping rules

### Error Handling
- Break and continue outside of loops result in runtime errors
- Proper error messages guide developers to correct usage
- Nested loop behavior is clearly defined and predictable

## Future Enhancements

- Labeled break and continue statements
- Array methods (map, filter, reduce)
- Object methods and prototypes
- Import/export system
- Standard library modules
- Bytecode compilation
- Debugging support
- Exception handling (try/catch/finally)