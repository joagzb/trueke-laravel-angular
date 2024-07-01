// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "no-unused-vars": "off",
      "no-invalid-this": "off",
      "no-duplicate-imports": "error",
      "dot-notation": "error",
      "eqeqeq": "error",
      "no-alert": "error",
      "no-global-assign": "error",
      "spaced-comment": [ "error", "always" ],
      "prefer-template": "error",
      "prefer-const": "error",
      "array-bracket-newline": [ "error", { "minItems": 5 } ],
      "array-element-newline": [ "error", { "minItems": 5 } ],
      "multiline-ternary": 0,
      "no-multi-spaces": "error",
      "newline-per-chained-call": [ "error", { "ignoreChainWithDepth": 3 } ],
      "no-useless-escape": 0,
      "brace-style": "error",
      "no-multiple-empty-lines": "error",
      "operator-linebreak": [ "error", "none" ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
