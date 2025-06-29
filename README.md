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
- **Arrow Functions**: `x => x * 2`, `(a, b) => a + b`
- **Control Flow**: `if/else`, `while` loops, `for` loops
- **For-In Loops**: `for (var key in object)` and `for (var index in array)`
- **Loop Control**: `break` and `continue` statements
- **Exception Handling**: `try/catch/finally`, `throw`
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
- `forEach(array, function)` - Execute function for each element
- `indexOf(array, element)` - Find index of element (-1 if not found)
- `includes(array, element)` - Check if array contains element
- `slice(array, start, end)` - Extract portion of array
- `splice(array, start, deleteCount, ...items)` - Modify array by removing/adding elements

#### Object Functions
- `keys(object)` - Get array of object keys
- `values(object)` - Get array of object values
- `hasOwnProperty(object, property)` - Check if object has property
- `assign(target, ...sources)` - Copy properties from source objects to target

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

# Run advanced features example
node src/main.js examples/advanced-features.is

# Run specific file
node src/main.js path/to/your/file.is
```

### Interactive REPL
```bash
# Start the REPL
npm run repl

# In REPL, type Inertz Script code:
inertz> var numbers = [1, 2, 3, 4, 5];
inertz> var doubled = map(numbers, x => x * 2);
inertz> print(doubled);
[2, 4, 6, 8, 10]
inertz> exit
```

### Running Tests
```bash
npm test
```

## Exception Handling

### Try/Catch/Finally
```inertz
try {
    // Risky code
    throw "Something went wrong!";
} catch (error) {
    print("Caught error:", error);
} finally {
    print("This always executes");
}
```

### Throwing Exceptions
```inertz
function safeDivide(a, b) {
    if (b == 0) {
        throw "Division by zero";
    }
    return a / b;
}

try {
    var result = safeDivide(10, 0);
} catch (error) {
    print("Error:", error);
}
```

## Arrow Functions

### Basic Syntax
```inertz
// Single parameter
var double = x => x * 2;

// Multiple parameters
var add = (a, b) => a + b;

// With array methods
var numbers = [1, 2, 3, 4, 5];
var doubled = map(numbers, x => x * 2);
var evens = filter(numbers, x => x % 2 == 0);
var sum = reduce(numbers, (acc, x) => acc + x, 0);
```

### Complex Examples
```inertz
var people = [
    {name: "Alice", age: 25, salary: 50000},
    {name: "Bob", age: 30, salary: 60000}
];

// Chain operations with arrow functions
var highEarnerNames = map(
    filter(people, person => person.salary >= 60000),
    person => person.name
);
```

## Array Methods Examples

### Core Methods
```inertz
var numbers = [1, 2, 3, 4, 5];

// Map - transform elements
var doubled = map(numbers, x => x * 2);
print(doubled); // [2, 4, 6, 8, 10]

// Filter - select elements
var evens = filter(numbers, x => x % 2 == 0);
print(evens); // [2, 4]

// Reduce - combine elements
var sum = reduce(numbers, (acc, x) => acc + x, 0);
print(sum); // 15
```

### Additional Methods
```inertz
var fruits = ["apple", "banana", "orange"];

// forEach - execute for each element
forEach(fruits, fruit => print("Fruit:", fruit));

// indexOf - find element index
var index = indexOf(fruits, "banana"); // 1

// includes - check if contains element
var hasApple = includes(fruits, "apple"); // true

// slice - extract portion
var sliced = slice(fruits, 1, 3); // ["banana", "orange"]

// splice - modify array
var removed = splice(fruits, 1, 1, "grape"); // removes "banana", adds "grape"
```

## Object Methods and Prototypes

### Object Manipulation
```inertz
var person = {name: "Alice", age: 30};

// Check property existence
var hasName = hasOwnProperty(person, "name"); // true

// Copy properties
var target = {a: 1};
var source = {b: 2, c: 3};
assign(target, source); // target becomes {a: 1, b: 2, c: 3}
```

### Object Creation Patterns
```inertz
// Factory function with arrow functions
var createUser = (name, age) => ({
    name: name,
    age: age,
    isAdult: age >= 18,
    greet: () => "Hello, I'm " + name
});

var users = [
    createUser("Alice", 25),
    createUser("Bob", 17)
];

var adults = filter(users, user => user.isAdult);
```

## Example Code

```inertz
// Exception handling with arrow functions
try {
    var numbers = [1, 2, 3, 4, 5];
    
    // Process with arrow functions
    var result = reduce(
        map(
            filter(numbers, x => x % 2 == 0),
            x => {
                if (x > 10) throw "Number too large";
                return x * x;
            }
        ),
        (acc, x) => acc + x,
        0
    );
    
    print("Result:", result);
} catch (error) {
    print("Processing error:", error);
} finally {
    print("Processing completed");
}

// Advanced array manipulation
var data = [
    {name: "Alice", scores: [85, 92, 78]},
    {name: "Bob", scores: [76, 88, 94]}
];

var averages = map(data, student => ({
    name: student.name,
    average: reduce(student.scores, (sum, score) => sum + score, 0) / len(student.scores)
}));

var topStudents = filter(averages, student => student.average >= 85);
print("Top students:", topStudents);
```

## Loop Control Statements

### Break Statement
- **Purpose**: Immediately exit the current loop
- **Usage**: `break;`
- **Works with**: `while`, `for`, and `for-in` loops

### Continue Statement
- **Purpose**: Skip the rest of the current iteration and continue with the next
- **Usage**: `continue;`
- **Works with**: `while`, `for`, and `for-in` loops

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
│   ├── array-methods.is # Array methods demonstration
│   └── advanced-features.is # Exception handling, arrow functions, etc.
└── README.md
```

## Language Design

Inertz Script follows these design principles:

1. **Familiar Syntax**: JavaScript-inspired syntax for ease of learning
2. **Strong Foundation**: Proper lexer, parser, and AST-based interpreter
3. **Modular Architecture**: Clean separation of concerns
4. **Extensible**: Easy to add new features and built-ins
5. **Error Handling**: Comprehensive error reporting with try/catch/finally
6. **Rich Data Types**: Support for arrays and objects with intuitive syntax
7. **Flexible Iteration**: Multiple loop types for different use cases
8. **Structured Control Flow**: Break and continue for precise loop control
9. **Functional Programming**: Array methods and arrow functions for elegant data transformation
10. **Exception Safety**: Proper exception handling with custom error types

## Technical Implementation

- **Lexical Analysis**: Converts source code into tokens (including arrow function operator)
- **Parsing**: Builds Abstract Syntax Tree (AST) using recursive descent parser
- **Interpretation**: Tree-walking interpreter with proper scoping
- **Environment**: Lexical scoping with environment chains
- **Built-ins**: Native function support with proper arity checking
- **Data Structures**: Native JavaScript arrays and objects with Inertz Script syntax
- **Loop Constructs**: Traditional for loops and for-in iteration
- **Exception Handling**: Try/catch/finally with custom exception types
- **Arrow Functions**: Concise function syntax with lexical scoping
- **Array Methods**: Comprehensive functional programming support

## Advanced Features

### Exception Handling
- **Try/Catch/Finally**: Full exception handling support
- **Custom Exceptions**: Throw custom error messages
- **Nested Exception Handling**: Try/catch blocks can be nested
- **Finally Blocks**: Code that always executes regardless of exceptions

### Arrow Functions
- **Concise Syntax**: `x => x * 2` for single parameters, `(a, b) => a + b` for multiple
- **Lexical Scoping**: Arrow functions capture variables from enclosing scope
- **Functional Programming**: Perfect for use with array methods
- **Expression Bodies**: Arrow functions return the expression result automatically

### Enhanced Array Methods
- **forEach**: Execute function for each element without returning new array
- **indexOf**: Find the index of an element in the array
- **includes**: Check if array contains a specific element
- **slice**: Extract a portion of array without modifying original
- **splice**: Modify array by removing/adding elements at specific positions

### Object Methods
- **hasOwnProperty**: Check if object has a specific property
- **assign**: Copy properties from source objects to target object
- **Enhanced Object Manipulation**: Better support for object-oriented patterns

## Future Enhancements

- Classes and inheritance
- Modules and import/export system
- Async/await support
- Standard library expansion
- Bytecode compilation
- Debugging support
- More built-in data structures (Set, Map)
- Regular expressions