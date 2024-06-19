import globals from "globals";


export default [
  {
    languageOptions: { globals: globals.browser },
    files: ["**/*.js"],
    rules: {
      "no-console": "error",
      "no-debugger": "error",
      "no-unused-vars": "warn",
      "no-undef": "off",
    }
  },
];