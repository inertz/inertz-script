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
- **Control Flow**: `if/else`, `while` loops
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

# Run specific file
node src/main.js path/to/your/file.bn
```

### Interactive REPL
```bash
# Start the REPL
npm run repl

# In REPL, type Inertz Script code:
inertz> var x = [1, 2, 3];
inertz> print(x[0]);
1
inertz> var obj = {name: "Alice"};
inertz> print(obj.name);
Alice
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
var age = 25;
var numbers = [1, 2, 3, 4, 5];

// Arrays
print("First number:", numbers[0]);
push(numbers, 6);
print("Updated array:", numbers);

// Objects
var person = {
    name: "Alice",
    age: 30,
    city: "New York"
};

print("Person name:", person.name);
person.age = 31;
print("Updated person:", person);

// Nested structures
var data = {
    users: [
        {name: "Alice", age: 30},
        {name: "Bob", age: 25}
    ]
};

print("First user:", data.users[0].name);

// Control flow with arrays
var i = 0;
while (i < len(numbers)) {
    print("Number at index", i, ":", numbers[i]);
    i = i + 1;
}

// Functions with objects
function createUser(name, age) {
    return {
        name: name,
        age: age,
        isAdult: age >= 18
    };
}

var user = createUser("Charlie", 22);
print("User:", user);
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
│   └── arrays-objects.bn # Arrays and objects demo
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

## Technical Implementation

- **Lexical Analysis**: Converts source code into tokens
- **Parsing**: Builds Abstract Syntax Tree (AST) using recursive descent parser
- **Interpretation**: Tree-walking interpreter with proper scoping
- **Environment**: Lexical scoping with environment chains
- **Built-ins**: Native function support with proper arity checking
- **Data Structures**: Native JavaScript arrays and objects with Inertz Script syntax

## Arrays and Objects Features

### Arrays
- **Creation**: `var arr = [1, 2, 3];`
- **Access**: `arr[0]` (zero-indexed)
- **Modification**: `arr[0] = 10;`
- **Methods**: `push(arr, value)`, `pop(arr)`, `len(arr)`
- **Mixed types**: `[1, "hello", true, null]`

### Objects
- **Creation**: `var obj = {key: value, name: "Alice"};`
- **Property access**: `obj.name` or `obj["name"]`
- **Property modification**: `obj.name = "Bob";`
- **Dynamic properties**: `obj.newProp = "value";`
- **Methods**: `keys(obj)`, `values(obj)`, `len(obj)`

### Nested Structures
- Arrays of objects: `[{name: "Alice"}, {name: "Bob"}]`
- Objects with arrays: `{users: ["Alice", "Bob"]}`
- Deep nesting: `data.users[0].profile.settings`

## Future Enhancements

- For loops with array iteration
- Array methods (map, filter, reduce)
- Object methods and prototypes
- Import/export system
- Standard library modules
- Bytecode compilation
- Debugging support