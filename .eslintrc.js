module.exports = {
  "env": {
    "mocha": true,
    "node": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "rules": {
    // Possible Errors
    "no-console": ["error", { "allow": ["warn", "error", "debug"]}],
    "valid-jsdoc": "error",
    // Stylistic Issues
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true,
      },
    }],
    "semi": "error",
  }
};
