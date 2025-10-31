import type { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";

const config: CodegenConfig = {
  schema: "http://localhost:54321/graphql/v1", // Using the local endpoint, update if needed
  documents: [
    "app/**/*.{ts,tsx}",
    "src/**/*.{ts,tsx}",
    "contexts/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "supabase/**/*.{ts,tsx}",
    "!gql/**",
    "!node_modules/**",
  ],
  overwrite: true,
  ignoreNoDocuments: true,
  config: {
    namingConvention: {
      enumValues: "change-case#camelCase",
      transformUnderscore: true,
    },
  },
  generates: {
    "gql/": {
      preset: "client",
      documentTransforms: [addTypenameSelectionDocumentTransform],
      plugins: [],
      config: {
        scalars: {
          UUID: "string",
          Date: "string",
          Time: "string",
          Datetime: "string",
          JSON: "string",
          BigInt: "string",
          BigFloat: "string",
          Opaque: "any",
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["yarn prettier"], // optional
  },
};

export default config;
