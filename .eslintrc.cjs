module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
      "parser": "@typescript-eslint/parser",
  },
  extends: [
    'plugin:vue/vue3-recommended', 
    '@vue/typescript/recommended',
    'google', 
    'prettier'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue','@typescript-eslint'],
  rules: {
    'no-confusing-arrow': ['error', { allowParens: true, onlyOneSimpleParam: false }],
    'semi': [2, "never"],
    'vue/multiline-html-element-content-newline': [
      0,
      {
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
        allowEmptyLines: false,
      },
    ],
    "vue/attribute-hyphenation": ["error", "always", {
      "ignore": []
    }],
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/attributes-order': 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'vue/no-static-inline-styles': [
      'warn',
      {
        allowBinding: false,
      },
    ],
    "vue/component-name-in-template-casing": ["error", "kebab-case", {
      "registeredComponentsOnly": true,
      "ignores": ["Datepicker"]
    }],
    "@typescript-eslint/no-explicit-any": "warn",
    "vue/first-attribute-linebreak": ["error", {
      "singleline": "ignore",
      "multiline": "ignore"
    }]
  },
}
