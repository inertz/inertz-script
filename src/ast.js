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

class ArrayExpr extends ASTNode {
  constructor(elements) {
    super();
    this.elements = elements;
  }

  accept(visitor) {
    return visitor.visitArrayExpr(this);
  }
}

class ObjectExpr extends ASTNode {
  constructor(properties) {
    super();
    this.properties = properties; // Array of {key, value} pairs
  }

  accept(visitor) {
    return visitor.visitObjectExpr(this);
  }
}

class GetExpr extends ASTNode {
  constructor(object, name) {
    super();
    this.object = object;
    this.name = name;
  }

  accept(visitor) {
    return visitor.visitGetExpr(this);
  }
}

class SetExpr extends ASTNode {
  constructor(object, name, value) {
    super();
    this.object = object;
    this.name = name;
    this.value = value;
  }

  accept(visitor) {
    return visitor.visitSetExpr(this);
  }
}

class IndexExpr extends ASTNode {
  constructor(object, index) {
    super();
    this.object = object;
    this.index = index;
  }

  accept(visitor) {
    return visitor.visitIndexExpr(this);
  }
}

class IndexSetExpr extends ASTNode {
  constructor(object, index, value) {
    super();
    this.object = object;
    this.index = index;
    this.value = value;
  }

  accept(visitor) {
    return visitor.visitIndexSetExpr(this);
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

class ArrowFunctionExpr extends ASTNode {
  constructor(params, body) {
    super();
    this.params = params;
    this.body = body;
  }

  accept(visitor) {
    return visitor.visitArrowFunctionExpr(this);
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

class ForStmt extends ASTNode {
  constructor(initializer, condition, increment, body) {
    super();
    this.initializer = initializer;
    this.condition = condition;
    this.increment = increment;
    this.body = body;
  }

  accept(visitor) {
    return visitor.visitForStmt(this);
  }
}

class ForInStmt extends ASTNode {
  constructor(variable, iterable, body) {
    super();
    this.variable = variable;
    this.iterable = iterable;
    this.body = body;
  }

  accept(visitor) {
    return visitor.visitForInStmt(this);
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

class BreakStmt extends ASTNode {
  constructor(keyword) {
    super();
    this.keyword = keyword;
  }

  accept(visitor) {
    return visitor.visitBreakStmt(this);
  }
}

class ContinueStmt extends ASTNode {
  constructor(keyword) {
    super();
    this.keyword = keyword;
  }

  accept(visitor) {
    return visitor.visitContinueStmt(this);
  }
}

class TryStmt extends ASTNode {
  constructor(tryBlock, catchClause, finallyBlock) {
    super();
    this.tryBlock = tryBlock;
    this.catchClause = catchClause;
    this.finallyBlock = finallyBlock;
  }

  accept(visitor) {
    return visitor.visitTryStmt(this);
  }
}

class CatchClause extends ASTNode {
  constructor(param, body) {
    super();
    this.param = param;
    this.body = body;
  }

  accept(visitor) {
    return visitor.visitCatchClause(this);
  }
}

class ThrowStmt extends ASTNode {
  constructor(keyword, value) {
    super();
    this.keyword = keyword;
    this.value = value;
  }

  accept(visitor) {
    return visitor.visitThrowStmt(this);
  }
}

module.exports = {
  ASTNode,
  BinaryExpr,
  UnaryExpr,
  TernaryExpr,
  LiteralExpr,
  ArrayExpr,
  ObjectExpr,
  GetExpr,
  SetExpr,
  IndexExpr,
  IndexSetExpr,
  VariableExpr,
  AssignExpr,
  CallExpr,
  ArrowFunctionExpr,
  ExpressionStmt,
  VarStmt,
  BlockStmt,
  IfStmt,
  WhileStmt,
  ForStmt,
  ForInStmt,
  FunctionStmt,
  ReturnStmt,
  BreakStmt,
  ContinueStmt,
  TryStmt,
  CatchClause,
  ThrowStmt
};