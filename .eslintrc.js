module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
  },
  "parser": "babel-eslint",
  "rules": {
    "linebreak-style": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "no-underscore-dangle": 0,
    "no-use-before-define": 0,
    "arrow-body-style": 0,
    "object-curly-newline": ["error", { "multiline": true }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "max-len": [
      0
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1
      }
    ],
  }
};