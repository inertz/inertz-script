// Token types for Inertz Script
class TokenType {
  // Literals
  static NUMBER = 'NUMBER';
  static STRING = 'STRING';
  static BOOLEAN = 'BOOLEAN';
  static NULL = 'NULL';
  static IDENTIFIER = 'IDENTIFIER';

  // Keywords
  static VAR = 'VAR';
  static FUNCTION = 'FUNCTION';
  static IF = 'IF';
  static ELSE = 'ELSE';
  static WHILE = 'WHILE';
  static FOR = 'FOR';
  static IN = 'IN';
  static RETURN = 'RETURN';
  static TRUE = 'TRUE';
  static FALSE = 'FALSE';

  // Operators
  static PLUS = 'PLUS';
  static MINUS = 'MINUS';
  static MULTIPLY = 'MULTIPLY';
  static DIVIDE = 'DIVIDE';
  static MODULO = 'MODULO';
  static ASSIGN = 'ASSIGN';

  // Comparison
  static EQUAL = 'EQUAL';
  static NOT_EQUAL = 'NOT_EQUAL';
  static GREATER = 'GREATER';
  static GREATER_EQUAL = 'GREATER_EQUAL';
  static LESS = 'LESS';
  static LESS_EQUAL = 'LESS_EQUAL';

  // Logical
  static AND = 'AND';
  static OR = 'OR';
  static NOT = 'NOT';

  // Punctuation
  static SEMICOLON = 'SEMICOLON';
  static LEFT_PAREN = 'LEFT_PAREN';
  static RIGHT_PAREN = 'RIGHT_PAREN';
  static LEFT_BRACE = 'LEFT_BRACE';
  static RIGHT_BRACE = 'RIGHT_BRACE';
  static LEFT_BRACKET = 'LEFT_BRACKET';
  static RIGHT_BRACKET = 'RIGHT_BRACKET';
  static COMMA = 'COMMA';
  static DOT = 'DOT';
  static QUESTION = 'QUESTION';
  static COLON = 'COLON';

  // Special
  static EOF = 'EOF';
  static NEWLINE = 'NEWLINE';
}

class Token {
  constructor(type, lexeme, literal, line, column) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
    this.column = column;
  }

  toString() {
    return `Token(${this.type}, '${this.lexeme}', ${this.literal}, ${this.line}:${this.column})`;
  }
}

module.exports = { TokenType, Token };