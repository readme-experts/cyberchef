module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    /*'plugin:prettier/recommended',*/
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": [
      "error",
      "single",
      {
        "allowTemplateLiterals": true
      }
    ],
    "semi": ["error", "always"],
    "no-loop-func": ["error"],
    "block-spacing": ["error", "always"],
    "camelcase": [
      "error",
      { "allow": ["user_id", "recipe_id", "category_id", "image_link", "user1_id", "user2_id"] }
    ],
    "eqeqeq": ["error", "always"],
    "strict": ["error", "global"],
    "brace-style": [
      "error",
      "1tbs",
      {
        "allowSingleLine": true
      }
    ],
    "comma-style": ["error", "last"],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "eol-last": ["error"],
    "func-call-spacing": ["error", "never"],
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true,
        "mode": "minimum"
      }
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true,
        "after": true,
        "overrides": {
          "function": {
            "after": false
          }
        }
      }
    ],
    "max-len": [
      "error",
      {
        "code": 100,
        "ignoreUrls": true
      }
    ],
    "max-nested-callbacks": [
      "error",
      {
        "max": 7
      }
    ],
    "new-cap": [
      "error",
      {
        "newIsCap": true,
        "capIsNew": false,
        "properties": true
      }
    ],
    "new-parens": ["error"],
    "no-lonely-if": ["error"],
    "no-trailing-spaces": ["error"],
    "no-unneeded-ternary": ["error"],
    "no-whitespace-before-property": ["error"],
    "object-curly-spacing": ["error", "always"],
    "operator-assignment": ["error", "always"],
    "operator-linebreak": ["error", "after"],
    "semi-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": ["error"],
    "space-unary-ops": [
      "error",
      {
        "words": true,
        "nonwords": false,
        "overrides": {
          "typeof": false
        }
      }
    ],
    "no-unreachable": ["error"],
    "no-global-assign": ["error"],
    "no-self-compare": ["error"],
    "no-unmodified-loop-condition": ["error"],
    "no-constant-condition": [
      "error",
      {
        "checkLoops": false
      }
    ],
    "no-console": ["off"],
    "no-useless-concat": ["error"],
    "no-useless-escape": ["error"],
    "no-shadow-restricted-names": ["error"],
    "no-use-before-define": [
      "error",
      {
        "functions": false
      }
    ],
    "arrow-parens": ["error", "as-needed"],
    "arrow-body-style": ["error", "as-needed"],
    "arrow-spacing": ["error"],
    "no-confusing-arrow": [
      "error",
      {
        "allowParens": true
      }
    ],
    "no-useless-computed-key": ["error"],
    "no-useless-rename": ["error"],
    "no-var": ["error"],
    "object-shorthand": ["error", "always"],
    "prefer-arrow-callback": ["error"],
    "prefer-const": ["error"],
    "prefer-numeric-literals": ["error"],
    "prefer-rest-params": ["error"],
    "prefer-spread": ["error"],
    "rest-spread-spacing": ["error", "never"],
    "template-curly-spacing": ["error", "never"]
  },
};
