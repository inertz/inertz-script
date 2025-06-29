// Built-in functions for Banjar Script

class BanjarFunction {
  constructor(name, arity, fn) {
    this.name = name;
    this.arity = arity;
    this.fn = fn;
  }

  call(interpreter, args) {
    return this.fn(interpreter, args);
  }

  toString() {
    return `<native fn ${this.name}>`;
  }
}

class BanjarCallable {
  call(interpreter, args) {
    throw new Error('call() must be implemented by subclasses');
  }

  arity() {
    throw new Error('arity() must be implemented by subclasses');
  }
}

// Built-in function implementations
const builtins = {
  print: new BanjarFunction('print', -1, (interpreter, args) => {
    const output = args.map(arg => interpreter.stringify(arg)).join(' ');
    console.log(output);
    return null;
  }),

  len: new BanjarFunction('len', 1, (interpreter, args) => {
    const arg = args[0];
    if (typeof arg === 'string') {
      return arg.length;
    }
    if (Array.isArray(arg)) {
      return arg.length;
    }
    throw new Error('len() can only be called on strings and arrays');
  }),

  typeof: new BanjarFunction('typeof', 1, (interpreter, args) => {
    const arg = args[0];
    if (arg === null) return 'null';
    if (typeof arg === 'boolean') return 'bool';
    if (typeof arg === 'number') {
      return Number.isInteger(arg) ? 'int' : 'float';
    }
    if (typeof arg === 'string') return 'string';
    if (Array.isArray(arg)) return 'array';
    if (typeof arg === 'object') return 'object';
    if (typeof arg === 'function' || arg instanceof BanjarCallable) return 'function';
    return 'unknown';
  }),

  input: new BanjarFunction('input', 0, (interpreter, args) => {
    // Note: This is a simplified version. In a real implementation,
    // you'd want to use readline or similar for proper input handling
    const prompt = args.length > 0 ? interpreter.stringify(args[0]) : '';
    if (prompt) {
      process.stdout.write(prompt);
    }
    // For now, return empty string as placeholder
    return '';
  }),

  // Math functions
  abs: new BanjarFunction('abs', 1, (interpreter, args) => {
    const num = args[0];
    if (typeof num !== 'number') {
      throw new Error('abs() expects a number');
    }
    return Math.abs(num);
  }),

  floor: new BanjarFunction('floor', 1, (interpreter, args) => {
    const num = args[0];
    if (typeof num !== 'number') {
      throw new Error('floor() expects a number');
    }
    return Math.floor(num);
  }),

  ceil: new BanjarFunction('ceil', 1, (interpreter, args) => {
    const num = args[0];
    if (typeof num !== 'number') {
      throw new Error('ceil() expects a number');
    }
    return Math.ceil(num);
  }),

  round: new BanjarFunction('round', 1, (interpreter, args) => {
    const num = args[0];
    if (typeof num !== 'number') {
      throw new Error('round() expects a number');
    }
    return Math.round(num);
  }),

  sqrt: new BanjarFunction('sqrt', 1, (interpreter, args) => {
    const num = args[0];
    if (typeof num !== 'number') {
      throw new Error('sqrt() expects a number');
    }
    return Math.sqrt(num);
  }),

  pow: new BanjarFunction('pow', 2, (interpreter, args) => {
    const base = args[0];
    const exp = args[1];
    if (typeof base !== 'number' || typeof exp !== 'number') {
      throw new Error('pow() expects two numbers');
    }
    return Math.pow(base, exp);
  })
};

module.exports = { BanjarFunction, BanjarCallable, builtins };