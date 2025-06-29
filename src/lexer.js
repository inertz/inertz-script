const { TokenType, Token } = require('./token');

class Lexer {
  constructor(source) {
    this.source = source;
    this.tokens = [];
    this.start = 0;
    this.current = 0;
    this.line = 1;
    this.column = 1;

    this.keywords = {
      'var': TokenType.VAR,
      'function': TokenType.FUNCTION,
      'if': TokenType.IF,
      'else': TokenType.ELSE,
      'while': TokenType.WHILE,
      'for': TokenType.FOR,
      'in': TokenType.IN,
      'return': TokenType.RETURN,
      'true': TokenType.TRUE,
      'false': TokenType.FALSE,
      'null': TokenType.NULL
    };
  }

  scanTokens() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, '', null, this.line, this.column));
    return this.tokens;
  }

  scanToken() {
    const c = this.advance();

    switch (c) {
      case ' ':
      case '\r':
      case '\t':
        // Ignore whitespace
        break;
      case '\n':
        this.line++;
        this.column = 1;
        break;
      case '(':
        this.addToken(TokenType.LEFT_PAREN);
        break;
      case ')':
        this.addToken(TokenType.RIGHT_PAREN);
        break;
      case '{':
        this.addToken(TokenType.LEFT_BRACE);
        break;
      case '}':
        this.addToken(TokenType.RIGHT_BRACE);
        break;
      case '[':
        this.addToken(TokenType.LEFT_BRACKET);
        break;
      case ']':
        this.addToken(TokenType.RIGHT_BRACKET);
        break;
      case ',':
        this.addToken(TokenType.COMMA);
        break;
      case '.':
        this.addToken(TokenType.DOT);
        break;
      case ';':
        this.addToken(TokenType.SEMICOLON);
        break;
      case '+':
        this.addToken(TokenType.PLUS);
        break;
      case '-':
        this.addToken(TokenType.MINUS);
        break;
      case '*':
        this.addToken(TokenType.MULTIPLY);
        break;
      case '/':
        if (this.match('/')) {
          // Line comment
          while (!this.isAtEnd() && this.peek() !== '\n') {
            this.advance();
          }
        } else {
          this.addToken(TokenType.DIVIDE);
        }
        break;
      case '%':
        this.addToken(TokenType.MODULO);
        break;
      case '?':
        this.addToken(TokenType.QUESTION);
        break;
      case ':':
        this.addToken(TokenType.COLON);
        break;
      case '!':
        this.addToken(this.match('=') ? TokenType.NOT_EQUAL : TokenType.NOT);
        break;
      case '=':
        this.addToken(this.match('=') ? TokenType.EQUAL : TokenType.ASSIGN);
        break;
      case '<':
        this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS);
        break;
      case '>':
        this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER);
        break;
      case '&':
        if (this.match('&')) {
          this.addToken(TokenType.AND);
        } else {
          this.error(`Unexpected character: ${c}`);
        }
        break;
      case '|':
        if (this.match('|')) {
          this.addToken(TokenType.OR);
        } else {
          this.error(`Unexpected character: ${c}`);
        }
        break;
      case '"':
        this.string();
        break;
      default:
        if (this.isDigit(c)) {
          this.number();
        } else if (this.isAlpha(c)) {
          this.identifier();
        } else {
          this.error(`Unexpected character: ${c}`);
        }
        break;
    }
  }

  identifier() {
    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }

    const text = this.source.substring(this.start, this.current);
    const type = this.keywords[text] || TokenType.IDENTIFIER;
    
    if (type === TokenType.TRUE) {
      this.addToken(type, true);
    } else if (type === TokenType.FALSE) {
      this.addToken(type, false);
    } else if (type === TokenType.NULL) {
      this.addToken(type, null);
    } else {
      this.addToken(type);
    }
  }

  number() {
    while (this.isDigit(this.peek())) {
      this.advance();
    }

    // Look for fractional part
    if (this.peek() === '.' && this.isDigit(this.peekNext())) {
      this.advance(); // Consume the '.'
      while (this.isDigit(this.peek())) {
        this.advance();
      }
    }

    const value = parseFloat(this.source.substring(this.start, this.current));
    this.addToken(TokenType.NUMBER, value);
  }

  string() {
    while (!this.isAtEnd() && this.peek() !== '"') {
      if (this.peek() === '\n') {
        this.line++;
        this.column = 1;
      }
      this.advance();
    }

    if (this.isAtEnd()) {
      this.error("Unterminated string");
      return;
    }

    this.advance(); // Closing "

    // Trim surrounding quotes
    const value = this.source.substring(this.start + 1, this.current - 1);
    this.addToken(TokenType.STRING, value);
  }

  match(expected) {
    if (this.isAtEnd()) return false;
    if (this.source.charAt(this.current) !== expected) return false;

    this.current++;
    this.column++;
    return true;
  }

  peek() {
    if (this.isAtEnd()) return '\0';
    return this.source.charAt(this.current);
  }

  peekNext() {
    if (this.current + 1 >= this.source.length) return '\0';
    return this.source.charAt(this.current + 1);
  }

  isAlpha(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
  }

  isAlphaNumeric(c) {
    return this.isAlpha(c) || this.isDigit(c);
  }

  isDigit(c) {
    return c >= '0' && c <= '9';
  }

  isAtEnd() {
    return this.current >= this.source.length;
  }

  advance() {
    this.column++;
    return this.source.charAt(this.current++);
  }

  addToken(type, literal = null) {
    const text = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(type, text, literal, this.line, this.column - text.length));
  }

  error(message) {
    throw new Error(`Lexer Error at line ${this.line}, column ${this.column}: ${message}`);
  }
}

module.exports = Lexer;