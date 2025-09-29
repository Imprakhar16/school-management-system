export default {
  semi: false, // No semicolons
  singleQuote: false, // Use double quotes (you can switch to true if you prefer single)
  trailingComma: "es5", // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  printWidth: 100, // Line wrap at 100 characters
  tabWidth: 2, // Indent with 2 spaces
  useTabs: false, // Use spaces instead of tabs
  bracketSpacing: true, // Add space between brackets in object literals: { foo: bar }
  arrowParens: "always", // Always include parens in arrow functions: (x) => x
  endOfLine: "lf", // Use system-specific EOL (helps avoid git diff issues)
  jsxSingleQuote: false, // Use double quotes in JSX
  jsxBracketSameLine: false, // Put closing `>` of JSX elements on a new line (React-style)
  quoteProps: "as-needed", // Only quote object properties when required
  embeddedLanguageFormatting: "auto", // Format embedded code (e.g., inside markdown/code blocks)
}
