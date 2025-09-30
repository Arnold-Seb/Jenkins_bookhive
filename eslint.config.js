export default [
  {
    files: ["src/**/*.js", "tests/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        process: "readonly",
        __dirname: "readonly",
        console: "readonly",
        require: "readonly",
        module: "readonly",
        describe: "readonly", // Jest globals
        test: "readonly",
        expect: "readonly",
      },
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": ["warn"],
      "no-undef": "error",
      "no-console": "off",
      "prefer-const": "warn",
      eqeqeq: ["error", "always"],
    },
  },
];
