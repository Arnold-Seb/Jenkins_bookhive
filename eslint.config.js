export default [
  {
    files: ["src/**/*.js", "tests/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    env: {
      node: true,
      es2021: true,
      jest: true,   // enables Jest globals like describe/test
    },
    rules: {
      semi: ["error", "always"],          // enforce semicolons
      quotes: ["error", "double"],        // enforce double quotes
      "no-unused-vars": ["warn"],         // warn for unused variables
      "no-undef": "error",                // error for undefined variables
      "no-console": "off",                // allow console.log (useful in dev)
      "prefer-const": "warn",             // suggest const where possible
      eqeqeq: ["error", "always"],        // require === instead of ==
    },
  },
];
