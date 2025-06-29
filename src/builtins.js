// Built-in functions for Inertz Script

class InertzFunction {
  constructor(name, arity, fn) {
    this.name = name;
    this._arity = arity;
    this.fn = fn;
  }

  arity() {
    return this._arity;
  }

  call(interpreter, args) {
    return this.fn(interpreter, args);
  }

  toString() {
    return `<native fn ${this.name}>`;
  }
}

class InertzCallable {
  call(interpreter, args) {
    throw new Error('call() must be implemented by subclasses');
  }

  arity() {
    throw new Error('arity() must be implemented by subclasses');
  }
}

// Built-in function implementations
const builtins = {
  print: new InertzFunction('print', -1, (interpreter, args) => {
    const output = args.map(arg => interpreter.stringify(arg)).join(' ');
    console.log(output);
    return null;
  }),

  len: new InertzFunction('len', 1, (interpreter, args) => {
    const arg = args[0];
    if (typeof arg === 'string') {
      return arg.length;
    }
    if (Array.isArray(arg)) {
      return arg.length;
    }
    if (typeof arg === 'object' && arg !== null) {
      return Object.keys(arg).length;
    }
    throw new Error('len() can only be called on strings, arrays, and objects');
  }),

  typeof: new InertzFunction('typeof', 1, (interpreter, args) => {
    const arg = args[0];
    if (arg === null) return 'null';
    if (typeof arg === 'boolean') return 'bool';
    if (typeof arg === 'number') {
      return Number.isInteger(arg) ? 'int' : 'float';
    }
    if (typeof arg === 'string') return 'string';
    if (Array.isArray(arg)) return 'array';
    if (typeof arg === 'object') return 'object';
    if (typeof arg === 'function' || arg instanceof InertzCallable) return 'function';
    return 'unknown';
  }),

  push: new InertzFunction('push', 2, (interpreter, args) => {
    const array = args[0];
    const value = args[1];
    if (!Array.isArray(array)) {
      throw new Error('push() can only be called on arrays');
    }
    array.push(value);
    return array.length;
  }),

  pop: new InertzFunction('pop', 1, (interpreter, args) => {
    const array = args[0];
    if (!Array.isArray(array)) {
      throw new Error('pop() can only be called on arrays');
    }
    return array.pop();
  }),

  keys: new InertzFunction('keys', 1, (interpreter, args) => {
    const obj = args[0];
    if (typeof obj !== 'object' || obj === null) {
      throw new Error('keys() can only be called on objects');
    }
    return Object.keys(obj);
  }),

  values: new InertzFunction('values', 1, (interpreter, args) => {
    const obj = args[0];
    if (typeof obj !== 'object' || obj === null) {
      throw new Error('values() can only be called on objects');
    }
    return Object.values(obj);
  }),

  // Array methods
  map: new InertzFunction('map', 2, (interpreter, args) => {
    const array = args[0];
    const callback = args[1];
    
    if (!Array.isArray(array)) {
      throw new Error('map() can only be called on arrays');
    }
    
    if (!(callback instanceof InertzCallable) && typeof callback.call !== 'function') {
      throw new Error('map() requires a function as second argument');
    }

    const result = [];
    for (let i = 0; i < array.length; i++) {
      const mappedValue = callback.call(interpreter, [array[i], i, array]);
      result.push(mappedValue);
    }
    
    return result;
  }),

  filter: new InertzFunction('filter', 2, (interpreter, args) => {
    const array = args[0];
    const callback = args[1];
    
    if (!Array.isArray(array)) {
      throw new Error('filter() can only be called on arrays');
    }
    
    if (!(callback instanceof InertzCallable) && typeof callback.call !== 'function') {
      throw new Error('filter() requires a function as second argument');
    }

    const result = [];
    for (let i = 0; i < array.length; i++) {
      const shouldInclude = callback.call(interpreter, [array[i], i, array]);
      if (interpreter.isTruthy(shouldInclude)) {
        result.push(array[i]);
      }
    }
    
    return result;
  }),

  reduce: new InertzFunction('reduce', 3, (interpreter, args) => {
    const array = args[0];
    const callback = args[1];
    const initialValue = args[2];
    
    if (!Array.isArray(array)) {
      throw new Error('reduce() can only be called on arrays');
    }
    
    if (!(callback instanceof InertzCallable) && typeof callback.call !== 'function') {
      throw new Error('reduce() requires a function as second argument');
    }

    if (array.length === 0 && initialValue === undefined) {
      throw new Error('reduce() of empty array with no initial value');
    }

    let accumulator = initialValue;
    let startIndex = 0;

    // If no initial value provided, use first element as accumulator
    if (initialValue === undefined) {
      accumulator = array[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < array.length; i++) {
      accumulator = callback.call(interpreter, [accumulator, array[i], i, array]);
    }
    
    return accumulator;
  }),

  // Array utility methods
  find: new InertzFunction('find', 2, (interpreter, args) => {
    const array = args[0];
    const callback = args[1];
    
    if (!Array.isArray(array)) {
      throw new Error('find() can only be called on arrays');
    }
    
    if (!(callback instanceof InertzCallable) && typeof callback.call !== 'function') {
      throw new Error('find() requires a function as second argument');
    }

    for (let i = 0; i < array.length; i++) {
      const found = callback.call(interpreter, [array[i], i, array]);
      if (interpreter.isTruthy(found)) {
        return array[i];
      }
    }
    
    return null;
  }),

  some: new InertzFunction('some', 2, (interpreter, args) => {
    const array = args[0];
    const callback = args[1];
    
    if (!Array.isArray(array)) {
      throw new Error('some() can only be called on arrays');
    }
    
    if (!(callback instanceof InertzCallable) && typeof callback.call !== 'function') {
      throw new Error('some() requires a function as second argument');
    }

    for (let i = 0; i < array.length; i++) {
      const result = callback.call(interpreter, [array[i], i, array]);
      if (interpreter.isTruthy(result)) {
        return true;
      }
    }
    
    return false;
  }),

  every: new InertzFunction('every', 2, (interpreter, args) => {
    const array = args[0];
    const callback = args[1];
    
    if (!Array.isArray(array)) {
      throw new Error('every() can only be called on arrays');
    }
    
    if (!(callback instanceof InertzCallable) && typeof callback.call !== 'function') {
      throw new Error('every() requires a function as second argument');
    }

    for (let i = 0; i < array.length; i++) {
      const result = callback.call(interpreter, [array[i], i, array]);
      if (!interpreter.isTruthy(result)) {
        return false;
      }
    }
    
    return true;
  }),

  input: new InertzFunction('input', 0, (interpreter, args) => {
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
  abs: new InertzFunction('abs', 1, (interpreter, args) => {
    const num = args[0];
    if (typeof num !== 'number') {
      throw new Error('abs() expects a number');
    }
    return Math.abs(num);
  }),

  floor: new InertzFunction('floor', 1, (interpreter, args) => {
    const num = args[0];
    if (typeof num !== 'number') {
      throw new Error('floor() expects a number');
    }
    return Math.floor(num);
  }),

  ceil: new InertzFunction('ceil', 1, (interpreter, args) => {
    const num = args[0];
    if (typeof num !== 'number') {
      throw new Error('ceil() expects a number');
    }
    return Math.ceil(num);
  }),

  round: new InertzFunction('round', 1, (interpreter, args) => {
    const num = args[0];
    if (typeof num !== 'number') {
      throw new Error('round() expects a number');
    }
    return Math.round(num);
  }),

  sqrt: new InertzFunction('sqrt', 1, (interpreter, args) => {
    const num = args[0];
    if (typeof num !== 'number') {
      throw new Error('sqrt() expects a number');
    }
    return Math.sqrt(num);
  }),

  pow: new InertzFunction('pow', 2, (interpreter, args) => {
    const base = args[0];
    const exp = args[1];
    if (typeof base !== 'number' || typeof exp !== 'number') {
      throw new Error('pow() expects two numbers');
    }
    return Math.pow(base, exp);
  })
};

module.exports = { InertzFunction, InertzCallable, builtins };