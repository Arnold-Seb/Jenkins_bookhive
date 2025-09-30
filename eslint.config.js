export default [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      semi: "error",                   // require semicolons
      quotes: ["error", "double"],     // enforce double quotes
      "no-unused-vars": "warn",        // warn on unused variables
      "no-console": "off"              // allow console.log
    },
  },
];
