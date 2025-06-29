// Abstract Syntax Tree node definitions for Inertz Script

class ASTNode {
  accept(visitor) {
    throw new Error('accept method must be implemented by subclasses');
  }
}

// Expressions
class BinaryExpr extends ASTNode {
  constructor(left, operator, right) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  accept(visitor) {
    return visitor.visitBinaryExpr(this);
  }
}

class UnaryExpr extends ASTNode {
  constructor(operator, right) {
    super();
    this.operator = operator;
    this.right = right;
  }

  accept(visitor) {
    return visitor.visitUnaryExpr(this);
  }
}

class TernaryExpr extends ASTNode {
  constructor(condition, thenExpr, elseExpr) {
    super();
    this.condition = condition;
    this.thenExpr = thenExpr;
    this.elseExpr = elseExpr;
  }

  accept(visitor) {
    return visitor.visitTernaryExpr(this);
  }
}

class LiteralExpr extends ASTNode {
  constructor(value) {
    super();
    this.value = value;
  }

  accept(visitor) {
    return visitor.visitLiteralExpr(this);
  }
}

class VariableExpr extends ASTNode {
  constructor(name) {
    super();
    this.name = name;
  }

  accept(visitor) {
    return visitor.visitVariableExpr(this);
  }
}

class AssignExpr extends ASTNode {
  constructor(name, value) {
    super();
    this.name = name;
    this.value = value;
  }

  accept(visitor) {
    return visitor.visitAssignExpr(this);
  }
}

class CallExpr extends ASTNode {
  constructor(callee, paren, args) {
    super();
    this.callee = callee;
    this.paren = paren;
    this.args = args;
  }

  accept(visitor) {
    return visitor.visitCallExpr(this);
  }
}

// Statements
class ExpressionStmt extends ASTNode {
  constructor(expression) {
    super();
    this.expression = expression;
  }

  accept(visitor) {
    return visitor.visitExpressionStmt(this);
  }
}

class VarStmt extends ASTNode {
  constructor(name, initializer) {
    super();
    this.name = name;
    this.initializer = initializer;
  }

  accept(visitor) {
    return visitor.visitVarStmt(this);
  }
}

class BlockStmt extends ASTNode {
  constructor(statements) {
    super();
    this.statements = statements;
  }

  accept(visitor) {
    return visitor.visitBlockStmt(this);
  }
}

class IfStmt extends ASTNode {
  constructor(condition, thenBranch, elseBranch) {
    super();
    this.condition = condition;
    this.thenBranch = thenBranch;
    this.elseBranch = elseBranch;
  }

  accept(visitor) {
    return visitor.visitIfStmt(this);
  }
}

class WhileStmt extends ASTNode {
  constructor(condition, body) {
    super();
    this.condition = condition;
    this.body = body;
  }

  accept(visitor) {
    return visitor.visitWhileStmt(this);
  }
}

class FunctionStmt extends ASTNode {
  constructor(name, params, body) {
    super();
    this.name = name;
    this.params = params;
    this.body = body;
  }

  accept(visitor) {
    return visitor.visitFunctionStmt(this);
  }
}

class ReturnStmt extends ASTNode {
  constructor(keyword, value) {
    super();
    this.keyword = keyword;
    this.value = value;
  }

  accept(visitor) {
    return visitor.visitReturnStmt(this);
  }
}

module.exports = {
  ASTNode,
  BinaryExpr,
  UnaryExpr,
  TernaryExpr,
  LiteralExpr,
  VariableExpr,
  AssignExpr,
  CallExpr,
  ExpressionStmt,
  VarStmt,
  BlockStmt,
  IfStmt,
  WhileStmt,
  FunctionStmt,
  ReturnStmt
};