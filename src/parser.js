const { TokenType } = require('./token');
const {
  BinaryExpr, UnaryExpr, TernaryExpr, LiteralExpr, ArrayExpr, ObjectExpr,
  GetExpr, SetExpr, IndexExpr, IndexSetExpr, VariableExpr, AssignExpr, CallExpr,
  ArrowFunctionExpr, ExpressionStmt, VarStmt, BlockStmt, IfStmt, WhileStmt, 
  ForStmt, ForInStmt, FunctionStmt, ReturnStmt, BreakStmt, ContinueStmt,
  TryStmt, CatchClause, ThrowStmt
} = require('./ast');

class ParseError extends Error {
  constructor(token, message) {
    super(message);
    this.token = token;
  }
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
  }

  parse() {
    const statements = [];
    while (!this.isAtEnd()) {
      statements.push(this.declaration());
    }
    return statements;
  }

  declaration() {
    try {
      if (this.match(TokenType.FUNCTION)) return this.functionDeclaration();
      if (this.match(TokenType.VAR)) return this.varDeclaration();
      return this.statement();
    } catch (error) {
      this.synchronize();
      throw error;
    }
  }

  functionDeclaration() {
    const name = this.consume(TokenType.IDENTIFIER, "Expected function name.");
    return this.functionBody(name);
  }

  functionExpression() {
    return this.functionBody(null);
  }

  functionBody(name) {
    this.consume(TokenType.LEFT_PAREN, "Expected '(' after function name.");
    const parameters = this.parseParameters();
    this.consume(TokenType.RIGHT_PAREN, "Expected ')' after parameters.");

    this.consume(TokenType.LEFT_BRACE, "Expected '{' before function body.");
    const body = this.block();
    return new FunctionStmt(name, parameters, body);
  }

  parseParameters() {
    const parameters = [];
    if (!this.check(TokenType.RIGHT_PAREN)) {
      do {
        if (parameters.length >= 255) {
          this.error(this.peek(), "Can't have more than 255 parameters.");
        }
        parameters.push(this.consume(TokenType.IDENTIFIER, "Expected parameter name."));
      } while (this.match(TokenType.COMMA));
    }
    return parameters;
  }

  varDeclaration() {
    const name = this.consume(TokenType.IDENTIFIER, "Expected variable name.");

    let initializer = null;
    if (this.match(TokenType.ASSIGN)) {
      initializer = this.expression();
    }

    this.consume(TokenType.SEMICOLON, "Expected ';' after variable declaration.");
    return new VarStmt(name, initializer);
  }

  statement() {
    if (this.match(TokenType.IF)) return this.ifStatement();
    if (this.match(TokenType.WHILE)) return this.whileStatement();
    if (this.match(TokenType.FOR)) return this.forStatement();
    if (this.match(TokenType.RETURN)) return this.returnStatement();
    if (this.match(TokenType.BREAK)) return this.breakStatement();
    if (this.match(TokenType.CONTINUE)) return this.continueStatement();
    if (this.match(TokenType.TRY)) return this.tryStatement();
    if (this.match(TokenType.THROW)) return this.throwStatement();
    if (this.match(TokenType.LEFT_BRACE)) return new BlockStmt(this.block());

    return this.expressionStatement();
  }

  ifStatement() {
    this.consume(TokenType.LEFT_PAREN, "Expected '(' after 'if'.");
    const condition = this.expression();
    this.consume(TokenType.RIGHT_PAREN, "Expected ')' after if condition.");

    const thenBranch = this.statement();
    let elseBranch = null;
    if (this.match(TokenType.ELSE)) {
      elseBranch = this.statement();
    }

    return new IfStmt(condition, thenBranch, elseBranch);
  }

  whileStatement() {
    this.consume(TokenType.LEFT_PAREN, "Expected '(' after 'while'.");
    const condition = this.expression();
    this.consume(TokenType.RIGHT_PAREN, "Expected ')' after condition.");
    const body = this.statement();

    return new WhileStmt(condition, body);
  }

  forStatement() {
    this.consume(TokenType.LEFT_PAREN, "Expected '(' after 'for'.");

    // Check for for-in loop
    if (this.check(TokenType.VAR)) {
      const checkpoint = this.current;
      this.advance(); // consume 'var'
      
      if (this.check(TokenType.IDENTIFIER)) {
        const varName = this.advance();
        if (this.match(TokenType.IN)) {
          // This is a for-in loop
          const iterable = this.expression();
          this.consume(TokenType.RIGHT_PAREN, "Expected ')' after for-in expression.");
          const body = this.statement();
          return new ForInStmt(varName, iterable, body);
        }
      }
      
      // Not a for-in loop, backtrack
      this.current = checkpoint;
    } else if (this.check(TokenType.IDENTIFIER)) {
      const checkpoint = this.current;
      const varName = this.advance();
      if (this.match(TokenType.IN)) {
        // This is a for-in loop without var declaration
        const iterable = this.expression();
        this.consume(TokenType.RIGHT_PAREN, "Expected ')' after for-in expression.");
        const body = this.statement();
        return new ForInStmt(varName, iterable, body);
      }
      
      // Not a for-in loop, backtrack
      this.current = checkpoint;
    }

    // Traditional for loop
    let initializer;
    if (this.match(TokenType.SEMICOLON)) {
      initializer = null;
    } else if (this.match(TokenType.VAR)) {
      initializer = this.varDeclaration();
    } else {
      initializer = this.expressionStatement();
    }

    let condition = null;
    if (!this.check(TokenType.SEMICOLON)) {
      condition = this.expression();
    }
    this.consume(TokenType.SEMICOLON, "Expected ';' after loop condition.");

    let increment = null;
    if (!this.check(TokenType.RIGHT_PAREN)) {
      increment = this.expression();
    }
    this.consume(TokenType.RIGHT_PAREN, "Expected ')' after for clauses.");

    const body = this.statement();

    return new ForStmt(initializer, condition, increment, body);
  }

  tryStatement() {
    this.consume(TokenType.LEFT_BRACE, "Expected '{' after 'try'.");
    const tryBlock = this.block();

    let catchClause = null;
    if (this.match(TokenType.CATCH)) {
      this.consume(TokenType.LEFT_PAREN, "Expected '(' after 'catch'.");
      const param = this.consume(TokenType.IDENTIFIER, "Expected catch parameter name.");
      this.consume(TokenType.RIGHT_PAREN, "Expected ')' after catch parameter.");
      this.consume(TokenType.LEFT_BRACE, "Expected '{' before catch body.");
      const catchBody = this.block();
      catchClause = new CatchClause(param, catchBody);
    }

    let finallyBlock = null;
    if (this.match(TokenType.FINALLY)) {
      this.consume(TokenType.LEFT_BRACE, "Expected '{' after 'finally'.");
      finallyBlock = this.block();
    }

    if (catchClause === null && finallyBlock === null) {
      throw this.error(this.previous(), "Missing catch or finally after try.");
    }

    return new TryStmt(tryBlock, catchClause, finallyBlock);
  }

  throwStatement() {
    const keyword = this.previous();
    const value = this.expression();
    this.consume(TokenType.SEMICOLON, "Expected ';' after throw value.");
    return new ThrowStmt(keyword, value);
  }

  returnStatement() {
    const keyword = this.previous();
    let value = null;
    if (!this.check(TokenType.SEMICOLON)) {
      value = this.expression();
    }

    this.consume(TokenType.SEMICOLON, "Expected ';' after return value.");
    return new ReturnStmt(keyword, value);
  }

  breakStatement() {
    const keyword = this.previous();
    this.consume(TokenType.SEMICOLON, "Expected ';' after 'break'.");
    return new BreakStmt(keyword);
  }

  continueStatement() {
    const keyword = this.previous();
    this.consume(TokenType.SEMICOLON, "Expected ';' after 'continue'.");
    return new ContinueStmt(keyword);
  }

  block() {
    const statements = [];

    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      statements.push(this.declaration());
    }

    this.consume(TokenType.RIGHT_BRACE, "Expected '}' after block.");
    return statements;
  }

  expressionStatement() {
    const expr = this.expression();
    this.consume(TokenType.SEMICOLON, "Expected ';' after expression.");
    return new ExpressionStmt(expr);
  }

  expression() {
    return this.assignment();
  }

  assignment() {
    let expr = this.ternary();

    if (this.match(TokenType.ASSIGN)) {
      const equals = this.previous();
      const value = this.assignment();

      if (expr instanceof VariableExpr) {
        const name = expr.name;
        return new AssignExpr(name, value);
      } else if (expr instanceof GetExpr) {
        return new SetExpr(expr.object, expr.name, value);
      } else if (expr instanceof IndexExpr) {
        return new IndexSetExpr(expr.object, expr.index, value);
      }

      this.error(equals, "Invalid assignment target.");
    }

    return expr;
  }

  ternary() {
    let expr = this.logicalOr();

    if (this.match(TokenType.QUESTION)) {
      const thenExpr = this.expression();
      this.consume(TokenType.COLON, "Expected ':' after then expression in ternary.");
      const elseExpr = this.ternary();
      expr = new TernaryExpr(expr, thenExpr, elseExpr);
    }

    return expr;
  }

  logicalOr() {
    let expr = this.logicalAnd();

    while (this.match(TokenType.OR)) {
      const operator = this.previous();
      const right = this.logicalAnd();
      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  logicalAnd() {
    let expr = this.equality();

    while (this.match(TokenType.AND)) {
      const operator = this.previous();
      const right = this.equality();
      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  equality() {
    let expr = this.comparison();

    while (this.match(TokenType.NOT_EQUAL, TokenType.EQUAL)) {
      const operator = this.previous();
      const right = this.comparison();
      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  comparison() {
    let expr = this.term();

    while (this.match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
      const operator = this.previous();
      const right = this.term();
      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  term() {
    let expr = this.factor();

    while (this.match(TokenType.MINUS, TokenType.PLUS)) {
      const operator = this.previous();
      const right = this.factor();
      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  factor() {
    let expr = this.unary();

    while (this.match(TokenType.DIVIDE, TokenType.MULTIPLY, TokenType.MODULO)) {
      const operator = this.previous();
      const right = this.unary();
      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  unary() {
    if (this.match(TokenType.NOT, TokenType.MINUS)) {
      const operator = this.previous();
      const right = this.unary();
      return new UnaryExpr(operator, right);
    }

    return this.call();
  }

  call() {
    let expr = this.primary();

    while (true) {
      if (this.match(TokenType.LEFT_PAREN)) {
        expr = this.finishCall(expr);
      } else if (this.match(TokenType.DOT)) {
        const name = this.consume(TokenType.IDENTIFIER, "Expected property name after '.'.");
        expr = new GetExpr(expr, name);
      } else if (this.match(TokenType.LEFT_BRACKET)) {
        const index = this.expression();
        this.consume(TokenType.RIGHT_BRACKET, "Expected ']' after array index.");
        expr = new IndexExpr(expr, index);
      } else {
        break;
      }
    }

    return expr;
  }

  finishCall(callee) {
    const args = [];
    if (!this.check(TokenType.RIGHT_PAREN)) {
      do {
        if (args.length >= 255) {
          this.error(this.peek(), "Can't have more than 255 arguments.");
        }
        args.push(this.expression());
      } while (this.match(TokenType.COMMA));
    }

    const paren = this.consume(TokenType.RIGHT_PAREN, "Expected ')' after arguments.");
    return new CallExpr(callee, paren, args);
  }

  primary() {
    if (this.match(TokenType.TRUE)) return new LiteralExpr(true);
    if (this.match(TokenType.FALSE)) return new LiteralExpr(false);
    if (this.match(TokenType.NULL)) return new LiteralExpr(null);

    if (this.match(TokenType.NUMBER, TokenType.STRING)) {
      return new LiteralExpr(this.previous().literal);
    }

    if (this.match(TokenType.IDENTIFIER)) {
      const identifier = this.previous();
      
      // Check for arrow function: identifier => expression
      if (this.match(TokenType.ARROW)) {
        const body = this.assignment();
        return new ArrowFunctionExpr([identifier], body);
      }
      
      return new VariableExpr(identifier);
    }

    if (this.match(TokenType.FUNCTION)) {
      return this.functionExpression();
    }

    if (this.match(TokenType.LEFT_PAREN)) {
      const checkpoint = this.current;
      
      try {
        // Try to parse as arrow function parameters
        const params = this.parseArrowParams();
        if (this.match(TokenType.ARROW)) {
          const body = this.assignment();
          return new ArrowFunctionExpr(params, body);
        }
      } catch (e) {
        // Not arrow function parameters, backtrack
        this.current = checkpoint;
      }
      
      // Parse as grouped expression
      this.advance(); // consume '('
      const expr = this.expression();
      this.consume(TokenType.RIGHT_PAREN, "Expected ')' after expression.");
      return expr;
    }

    if (this.match(TokenType.LEFT_BRACKET)) {
      return this.arrayLiteral();
    }

    if (this.match(TokenType.LEFT_BRACE)) {
      return this.objectLiteral();
    }

    throw this.error(this.peek(), "Expected expression.");
  }

  parseArrowParams() {
    const params = [];
    
    if (!this.check(TokenType.RIGHT_PAREN)) {
      do {
        params.push(this.consume(TokenType.IDENTIFIER, "Expected parameter name."));
      } while (this.match(TokenType.COMMA));
    }
    
    this.consume(TokenType.RIGHT_PAREN, "Expected ')' after parameters.");
    return params;
  }

  arrayLiteral() {
    const elements = [];
    
    if (!this.check(TokenType.RIGHT_BRACKET)) {
      do {
        elements.push(this.expression());
      } while (this.match(TokenType.COMMA));
    }

    this.consume(TokenType.RIGHT_BRACKET, "Expected ']' after array elements.");
    return new ArrayExpr(elements);
  }

  objectLiteral() {
    const properties = [];

    if (!this.check(TokenType.RIGHT_BRACE)) {
      do {
        let key;
        if (this.check(TokenType.IDENTIFIER)) {
          key = this.advance().lexeme;
        } else if (this.check(TokenType.STRING)) {
          key = this.advance().literal;
        } else {
          throw this.error(this.peek(), "Expected property name.");
        }

        this.consume(TokenType.COLON, "Expected ':' after property name.");
        const value = this.expression();
        properties.push({ key, value });
      } while (this.match(TokenType.COMMA));
    }

    this.consume(TokenType.RIGHT_BRACE, "Expected '}' after object properties.");
    return new ObjectExpr(properties);
  }

  match(...types) {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  consume(type, message) {
    if (this.check(type)) return this.advance();
    throw this.error(this.peek(), message);
  }

  check(type) {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  advance() {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  isAtEnd() {
    return this.peek().type === TokenType.EOF;
  }

  peek() {
    return this.tokens[this.current];
  }

  previous() {
    return this.tokens[this.current - 1];
  }

  error(token, message) {
    if (token.type === TokenType.EOF) {
      throw new ParseError(token, `at end: ${message}`);
    } else {
      throw new ParseError(token, `at '${token.lexeme}': ${message}`);
    }
  }

  synchronize() {
    this.advance();

    while (!this.isAtEnd()) {
      if (this.previous().type === TokenType.SEMICOLON) return;

      switch (this.peek().type) {
        case TokenType.FUNCTION:
        case TokenType.VAR:
        case TokenType.FOR:
        case TokenType.IF:
        case TokenType.WHILE:
        case TokenType.RETURN:
        case TokenType.BREAK:
        case TokenType.CONTINUE:
        case TokenType.TRY:
        case TokenType.THROW:
          return;
      }

      this.advance();
    }
  }
}

module.exports = { Parser, ParseError };