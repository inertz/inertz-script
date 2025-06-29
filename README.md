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

#### Basic Functions
- `print(...)` - Output to console
- `len(value)` - Get length of string, array, or object
- `typeof(value)` - Get type of value

#### Array Manipulation
- `push(array, value)` - Add element to array
- `pop(array)` - Remove and return last element from array

#### Array Methods (Functional Programming)
- `map(array, function)` - Transform each element using a function
- `filter(array, function)` - Keep elements that match a condition
- `reduce(array, function, initialValue)` - Combine all elements into single value
- `find(array, function)` - Get first element that matches condition
- `some(array, function)` - Check if any element matches condition
- `every(array, function)` - Check if all elements match condition

#### Object Functions
- `keys(object)` - Get array of object keys
- `values(object)` - Get array of object values

#### Math Functions
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

# Run array methods example
node src/main.js examples/array-methods.is

# Run specific file
node src/main.js path/to/your/file.is
```

### Interactive REPL
```bash
# Start the REPL
npm run repl

# In REPL, type Inertz Script code:
inertz> var numbers = [1, 2, 3, 4, 5];
inertz> var doubled = map(numbers, function(x) { return x * 2; });
inertz> print(doubled);
[2, 4, 6, 8, 10]
inertz> exit
```

### Running Tests
```bash
npm test
```

## Array Methods Examples

### Map - Transform Elements
```inertz
var numbers = [1, 2, 3, 4, 5];

// Double each number
function double(x) {
    return x * 2;
}
var doubled = map(numbers, double);
print(doubled); // [2, 4, 6, 8, 10]

// Using anonymous function
var squared = map(numbers, function(x) {
    return x * x;
});
print(squared); // [1, 4, 9, 16, 25]
```

### Filter - Select Elements
```inertz
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get even numbers
function isEven(x) {
    return x % 2 == 0;
}
var evens = filter(numbers, isEven);
print(evens); // [2, 4, 6, 8, 10]

// Get numbers greater than 5
var bigNumbers = filter(numbers, function(x) {
    return x > 5;
});
print(bigNumbers); // [6, 7, 8, 9, 10]
```

### Reduce - Combine Elements
```inertz
var numbers = [1, 2, 3, 4, 5];

// Sum all numbers
function add(acc, x) {
    return acc + x;
}
var sum = reduce(numbers, add, 0);
print(sum); // 15

// Find maximum
function max(acc, x) {
    return x > acc ? x : acc;
}
var maximum = reduce(numbers, max, numbers[0]);
print(maximum); // 5
```

### Chaining Methods
```inertz
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get even numbers, square them, then sum
function isEven(x) { return x % 2 == 0; }
function square(x) { return x * x; }
function add(acc, x) { return acc + x; }

var result = reduce(
    map(
        filter(numbers, isEven),
        square
    ),
    add,
    0
);
print(result); // 220 (2² + 4² + 6² + 8² + 10²)
```

### Working with Objects
```inertz
var people = [
    {name: "Alice", age: 25, salary: 50000},
    {name: "Bob", age: 30, salary: 60000},
    {name: "Charlie", age: 35, salary: 70000}
];

// Extract names
function getName(person) {
    return person.name;
}
var names = map(people, getName);
print(names); // ["Alice", "Bob", "Charlie"]

// Filter high earners
function isHighEarner(person) {
    return person.salary >= 60000;
}
var highEarners = filter(people, isHighEarner);
print(highEarners); // [{name: "Bob", ...}, {name: "Charlie", ...}]

// Calculate total salary
function addSalary(acc, person) {
    return acc + person.salary;
}
var totalSalary = reduce(people, addSalary, 0);
print(totalSalary); // 180000
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

// Array methods - functional programming style
function isEven(x) { return x % 2 == 0; }
function double(x) { return x * 2; }
function add(acc, x) { return acc + x; }

var evenDoubledSum = reduce(
    map(filter(numbers, isEven), double),
    add,
    0
);
print("Sum of doubled even numbers:", evenDoubledSum);
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
│   ├── break-continue.is # Break and continue examples
│   └── array-methods.is # Array methods demonstration
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
9. **Functional Programming**: Array methods for elegant data transformation

## Technical Implementation

- **Lexical Analysis**: Converts source code into tokens
- **Parsing**: Builds Abstract Syntax Tree (AST) using recursive descent parser
- **Interpretation**: Tree-walking interpreter with proper scoping
- **Environment**: Lexical scoping with environment chains
- **Built-ins**: Native function support with proper arity checking
- **Data Structures**: Native JavaScript arrays and objects with Inertz Script syntax
- **Loop Constructs**: Traditional for loops and for-in iteration
- **Exception Handling**: Break and continue implemented as controlled exceptions
- **Array Methods**: Functional programming support with map, filter, reduce, and more

## Array Methods Features

### Functional Programming Support
- Higher-order functions that accept callback functions
- Immutable operations (original arrays are not modified by map/filter)
- Chainable operations for complex data transformations
- Support for both named functions and anonymous function expressions

### Method Signatures
- `map(array, callback)` - callback receives (element, index, array)
- `filter(array, callback)` - callback receives (element, index, array)
- `reduce(array, callback, initialValue)` - callback receives (accumulator, element, index, array)
- `find(array, callback)` - returns first matching element or null
- `some(array, callback)` - returns true if any element matches
- `every(array, callback)` - returns true if all elements match

### Error Handling
- Type checking ensures methods are called on arrays
- Callback validation ensures functions are provided
- Proper error messages guide developers to correct usage
- Reduce handles empty arrays appropriately

## Future Enhancements

- Labeled break and continue statements
- More array methods (forEach, indexOf, includes, slice, splice)
- Object methods and prototypes
- Import/export system
- Standard library modules
- Bytecode compilation
- Debugging support
- Exception handling (try/catch/finally)
- Arrow functions for more concise callbacks