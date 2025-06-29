const { TokenType } = require('./token');
const Environment = require('./environment');
const { InertzCallable, builtins } = require('./builtins');

class InertzUserFunction extends InertzCallable {
  constructor(declaration, closure) {
    super();
    this.declaration = declaration;
    this.closure = closure;
  }

  arity() {
    return this.declaration.params.length;
  }

  call(interpreter, args) {
    const environment = new Environment(this.closure);

    for (let i = 0; i < this.declaration.params.length; i++) {
      environment.define(this.declaration.params[i].lexeme, args[i]);
    }

    try {
      interpreter.executeBlock(this.declaration.body, environment);
    } catch (returnValue) {
      if (returnValue instanceof ReturnException) {
        return returnValue.value;
      }
      throw returnValue;
    }

    return null;
  }

  toString() {
    if (this.declaration.name === null) {
      return '<anonymous fn>';
    }
    return `<fn ${this.declaration.name.lexeme}>`;
  }
}

class ReturnException extends Error {
  constructor(value) {
    super();
    this.value = value;
  }
}

class BreakException extends Error {
  constructor() {
    super();
  }
}

class ContinueException extends Error {
  constructor() {
    super();
  }
}

class Interpreter {
  constructor() {
    this.globals = new Environment();
    this.environment = this.globals;

    // Define built-in functions
    for (const [name, fn] of Object.entries(builtins)) {
      this.globals.define(name, fn);
    }
  }

  interpret(statements) {
    try {
      for (const statement of statements) {
        this.execute(statement);
      }
    } catch (error) {
      console.error('Runtime Error:', error.message);
      throw error;
    }
  }

  execute(stmt) {
    return stmt.accept(this);
  }

  evaluate(expr) {
    return expr.accept(this);
  }

  executeBlock(statements, environment) {
    const previous = this.environment;
    try {
      this.environment = environment;

      for (const statement of statements) {
        this.execute(statement);
      }
    } finally {
      this.environment = previous;
    }
  }

  // Visit methods for statements
  visitExpressionStmt(stmt) {
    this.evaluate(stmt.expression);
    return null;
  }

  visitVarStmt(stmt) {
    let value = null;
    if (stmt.initializer !== null) {
      value = this.evaluate(stmt.initializer);
    }

    this.environment.define(stmt.name.lexeme, value);
    return null;
  }

  visitBlockStmt(stmt) {
    this.executeBlock(stmt.statements, new Environment(this.environment));
    return null;
  }

  visitIfStmt(stmt) {
    if (this.isTruthy(this.evaluate(stmt.condition))) {
      this.execute(stmt.thenBranch);
    } else if (stmt.elseBranch !== null) {
      this.execute(stmt.elseBranch);
    }
    return null;
  }

  visitWhileStmt(stmt) {
    try {
      while (this.isTruthy(this.evaluate(stmt.condition))) {
        try {
          this.execute(stmt.body);
        } catch (error) {
          if (error instanceof ContinueException) {
            continue; // Skip to next iteration
          }
          throw error; // Re-throw other exceptions (including break)
        }
      }
    } catch (error) {
      if (error instanceof BreakException) {
        return null; // Exit the loop normally
      }
      throw error; // Re-throw other exceptions
    }
    return null;
  }

  visitForStmt(stmt) {
    // Create new environment for the for loop
    const environment = new Environment(this.environment);
    const previous = this.environment;
    
    try {
      this.environment = environment;

      // Execute initializer
      if (stmt.initializer !== null) {
        this.execute(stmt.initializer);
      }

      // Loop
      try {
        while (true) {
          // Check condition
          if (stmt.condition !== null) {
            if (!this.isTruthy(this.evaluate(stmt.condition))) {
              break;
            }
          }

          // Execute body
          try {
            this.execute(stmt.body);
          } catch (error) {
            if (error instanceof ContinueException) {
              // Continue to increment step
            } else if (error instanceof BreakException) {
              break; // Exit the loop
            } else {
              throw error; // Re-throw other exceptions
            }
          }

          // Execute increment
          if (stmt.increment !== null) {
            this.evaluate(stmt.increment);
          }
        }
      } catch (error) {
        if (error instanceof BreakException) {
          // Loop was broken, this is normal
        } else {
          throw error; // Re-throw other exceptions
        }
      }
    } finally {
      this.environment = previous;
    }

    return null;
  }

  visitForInStmt(stmt) {
    const iterable = this.evaluate(stmt.iterable);
    
    // Create new environment for the for-in loop
    const environment = new Environment(this.environment);
    const previous = this.environment;
    
    try {
      this.environment = environment;

      if (Array.isArray(iterable)) {
        // Iterate over array indices
        try {
          for (let i = 0; i < iterable.length; i++) {
            this.environment.define(stmt.variable.lexeme, i);
            try {
              this.execute(stmt.body);
            } catch (error) {
              if (error instanceof ContinueException) {
                continue; // Skip to next iteration
              } else if (error instanceof BreakException) {
                break; // Exit the loop
              } else {
                throw error; // Re-throw other exceptions
              }
            }
          }
        } catch (error) {
          if (error instanceof BreakException) {
            // Loop was broken, this is normal
          } else {
            throw error; // Re-throw other exceptions
          }
        }
      } else if (typeof iterable === 'object' && iterable !== null) {
        // Iterate over object keys
        const keys = Object.keys(iterable);
        try {
          for (const key of keys) {
            this.environment.define(stmt.variable.lexeme, key);
            try {
              this.execute(stmt.body);
            } catch (error) {
              if (error instanceof ContinueException) {
                continue; // Skip to next iteration
              } else if (error instanceof BreakException) {
                break; // Exit the loop
              } else {
                throw error; // Re-throw other exceptions
              }
            }
          }
        } catch (error) {
          if (error instanceof BreakException) {
            // Loop was broken, this is normal
          } else {
            throw error; // Re-throw other exceptions
          }
        }
      } else if (typeof iterable === 'string') {
        // Iterate over string indices
        try {
          for (let i = 0; i < iterable.length; i++) {
            this.environment.define(stmt.variable.lexeme, i);
            try {
              this.execute(stmt.body);
            } catch (error) {
              if (error instanceof ContinueException) {
                continue; // Skip to next iteration
              } else if (error instanceof BreakException) {
                break; // Exit the loop
              } else {
                throw error; // Re-throw other exceptions
              }
            }
          }
        } catch (error) {
          if (error instanceof BreakException) {
            // Loop was broken, this is normal
          } else {
            throw error; // Re-throw other exceptions
          }
        }
      } else {
        throw new Error(`Cannot iterate over ${typeof iterable}`);
      }
    } finally {
      this.environment = previous;
    }

    return null;
  }

  visitFunctionStmt(stmt) {
    const fn = new InertzUserFunction(stmt, this.environment);
    if (stmt.name !== null) {
      this.environment.define(stmt.name.lexeme, fn);
    }
    return fn;
  }

  visitReturnStmt(stmt) {
    let value = null;
    if (stmt.value !== null) {
      value = this.evaluate(stmt.value);
    }

    throw new ReturnException(value);
  }

  visitBreakStmt(stmt) {
    throw new BreakException();
  }

  visitContinueStmt(stmt) {
    throw new ContinueException();
  }

  // Visit methods for expressions
  visitBinaryExpr(expr) {
    const left = this.evaluate(expr.left);
    const right = this.evaluate(expr.right);

    switch (expr.operator.type) {
      case TokenType.GREATER:
        this.checkNumberOperands(expr.operator, left, right);
        return left > right;
      case TokenType.GREATER_EQUAL:
        this.checkNumberOperands(expr.operator, left, right);
        return left >= right;
      case TokenType.LESS:
        this.checkNumberOperands(expr.operator, left, right);
        return left < right;
      case TokenType.LESS_EQUAL:
        this.checkNumberOperands(expr.operator, left, right);
        return left <= right;
      case TokenType.NOT_EQUAL:
        return !this.isEqual(left, right);
      case TokenType.EQUAL:
        return this.isEqual(left, right);
      case TokenType.MINUS:
        this.checkNumberOperands(expr.operator, left, right);
        return left - right;
      case TokenType.PLUS:
        if (typeof left === 'number' && typeof right === 'number') {
          return left + right;
        }
        if (typeof left === 'string' || typeof right === 'string') {
          return this.stringify(left) + this.stringify(right);
        }
        throw new Error(`Unsupported operand types for '+': ${typeof left} and ${typeof right}`);
      case TokenType.DIVIDE:
        this.checkNumberOperands(expr.operator, left, right);
        if (right === 0) {
          throw new Error('Division by zero');
        }
        return left / right;
      case TokenType.MULTIPLY:
        this.checkNumberOperands(expr.operator, left, right);
        return left * right;
      case TokenType.MODULO:
        this.checkNumberOperands(expr.operator, left, right);
        return left % right;
      case TokenType.AND:
        if (!this.isTruthy(left)) return left;
        return right;
      case TokenType.OR:
        if (this.isTruthy(left)) return left;
        return right;
    }

    return null;
  }

  visitUnaryExpr(expr) {
    const right = this.evaluate(expr.right);

    switch (expr.operator.type) {
      case TokenType.NOT:
        return !this.isTruthy(right);
      case TokenType.MINUS:
        this.checkNumberOperand(expr.operator, right);
        return -right;
    }

    return null;
  }

  visitTernaryExpr(expr) {
    const condition = this.evaluate(expr.condition);
    if (this.isTruthy(condition)) {
      return this.evaluate(expr.thenExpr);
    } else {
      return this.evaluate(expr.elseExpr);
    }
  }

  visitLiteralExpr(expr) {
    return expr.value;
  }

  visitArrayExpr(expr) {
    const elements = [];
    for (const element of expr.elements) {
      elements.push(this.evaluate(element));
    }
    return elements;
  }

  visitObjectExpr(expr) {
    const object = {};
    for (const property of expr.properties) {
      const value = this.evaluate(property.value);
      object[property.key] = value;
    }
    return object;
  }

  visitGetExpr(expr) {
    const object = this.evaluate(expr.object);
    
    if (object === null || object === undefined) {
      throw new Error(`Cannot access property '${expr.name.lexeme}' of null or undefined`);
    }

    if (typeof object === 'object') {
      return object[expr.name.lexeme];
    }

    throw new Error(`Cannot access property '${expr.name.lexeme}' of ${typeof object}`);
  }

  visitSetExpr(expr) {
    const object = this.evaluate(expr.object);
    
    if (object === null || object === undefined) {
      throw new Error(`Cannot set property '${expr.name.lexeme}' on null or undefined`);
    }

    if (typeof object !== 'object') {
      throw new Error(`Cannot set property '${expr.name.lexeme}' on ${typeof object}`);
    }

    const value = this.evaluate(expr.value);
    object[expr.name.lexeme] = value;
    return value;
  }

  visitIndexExpr(expr) {
    const object = this.evaluate(expr.object);
    const index = this.evaluate(expr.index);

    if (Array.isArray(object)) {
      if (typeof index !== 'number' || !Number.isInteger(index)) {
        throw new Error('Array index must be an integer');
      }
      if (index < 0 || index >= object.length) {
        return null; // Return null for out-of-bounds access
      }
      return object[index];
    }

    if (typeof object === 'object' && object !== null) {
      return object[index];
    }

    if (typeof object === 'string') {
      if (typeof index !== 'number' || !Number.isInteger(index)) {
        throw new Error('String index must be an integer');
      }
      if (index < 0 || index >= object.length) {
        return null;
      }
      return object[index];
    }

    throw new Error(`Cannot index ${typeof object} with ${typeof index}`);
  }

  visitIndexSetExpr(expr) {
    const object = this.evaluate(expr.object);
    const index = this.evaluate(expr.index);
    const value = this.evaluate(expr.value);

    if (Array.isArray(object)) {
      if (typeof index !== 'number' || !Number.isInteger(index)) {
        throw new Error('Array index must be an integer');
      }
      if (index < 0) {
        throw new Error('Array index cannot be negative');
      }
      object[index] = value;
      return value;
    }

    if (typeof object === 'object' && object !== null) {
      object[index] = value;
      return value;
    }

    throw new Error(`Cannot set index on ${typeof object}`);
  }

  visitVariableExpr(expr) {
    return this.environment.get(expr.name);
  }

  visitAssignExpr(expr) {
    const value = this.evaluate(expr.value);
    this.environment.assign(expr.name, value);
    return value;
  }

  visitCallExpr(expr) {
    const callee = this.evaluate(expr.callee);

    const args = [];
    for (const argument of expr.args) {
      args.push(this.evaluate(argument));
    }

    if (!(callee instanceof InertzCallable) && typeof callee.call !== 'function') {
      throw new Error('Can only call functions and classes.');
    }

    if (callee.arity >= 0 && args.length !== callee.arity()) {
      throw new Error(`Expected ${callee.arity()} arguments but got ${args.length}.`);
    }

    return callee.call(this, args);
  }

  // Helper methods
  isTruthy(object) {
    if (object === null) return false;
    if (typeof object === 'boolean') return object;
    return true;
  }

  isEqual(a, b) {
    return a === b;
  }

  checkNumberOperand(operator, operand) {
    if (typeof operand === 'number') return;
    throw new Error(`Operand must be a number.`);
  }

  checkNumberOperands(operator, left, right) {
    if (typeof left === 'number' && typeof right === 'number') return;
    throw new Error(`Operands must be numbers.`);
  }

  stringify(object) {
    if (object === null) return 'null';
    if (typeof object === 'number') {
      let text = object.toString();
      if (text.endsWith('.0')) {
        text = text.substring(0, text.length - 2);
      }
      return text;
    }
    if (Array.isArray(object)) {
      return '[' + object.map(item => this.stringify(item)).join(', ') + ']';
    }
    if (typeof object === 'object') {
      const pairs = [];
      for (const [key, value] of Object.entries(object)) {
        pairs.push(`${key}: ${this.stringify(value)}`);
      }
      return '{' + pairs.join(', ') + '}';
    }
    return object.toString();
  }
}

module.exports = { Interpreter, ReturnException, BreakException, ContinueException };