import reactPlugin from "eslint-plugin-react";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import simpleSort from "eslint-plugin-simple-import-sort";
import prettierPlugin from "eslint-plugin-prettier";
import js from "@eslint/js";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    ignores: [".netlify/**", ".next/**", "node_modules/**", "dist/**", "build/**", "coverage/**"],
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "simple-import-sort": simpleSort,
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      "react-hooks": reactHooksPlugin,
      react: reactPlugin
    },
    rules: {
      // TypeScript ESLint recommended rules
      ...tsPlugin.configs.recommended.rules,
      // React recommended rules (manually configured to avoid circular reference)
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      "react/no-deprecated": "warn",
      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      // Prettier
      "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
      // TypeScript ESLint overrides
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-function": [
        "warn",
        { allow: ["arrowFunctions", "functions", "methods"] }
      ],
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true
        }
      ],
      "eol-last": "error",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      radix: "error",
      eqeqeq: ["error", "always"],
      "no-undef": "off",
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^\\u0000"],
            ["^@?\\w"],
            ["^[^.]"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
          ]
        }
      ],
      "simple-import-sort/exports": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }]
    }
  }
];
