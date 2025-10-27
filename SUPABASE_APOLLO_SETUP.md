# Apollo + Supabase GraphQL Setup

This project is configured to use Apollo Client with Supabase's GraphQL API (pg_graphql).

## Environment Variables

Create a `.env.local` file (or add to your existing `.env` file) with the following variables:

```bash
# Supabase Configuration
# For local development with `supabase start`:
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# For production/staging, get these values from your Supabase project settings:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-project-settings
```

## Files Created

1. **`src/utils/supabase.ts`** - Supabase client instance
2. **`src/utils/supabaseApolloClient.ts`** - Apollo Client configured for Supabase with authentication
3. **`codegen.ts`** - GraphQL Code Generator configuration

## How It Works

### Apollo Client Configuration

The Apollo Client (`src/utils/supabaseApolloClient.ts`) is configured with:

- **Authentication**: Automatically includes the user's JWT token from Supabase Auth
- **Cache**: InMemoryCache with `nodeId` support for Relay-style pagination
- **Endpoint**: Points to Supabase's GraphQL endpoint (`/graphql/v1`)

### Usage in _app.tsx

The `ApolloProvider` wraps your entire app, making the Apollo Client available to all components:

```tsx
import { ApolloProvider } from '@apollo/client';
import supabaseApolloClient from '@src/utils/supabaseApolloClient';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={supabaseApolloClient}>
      {/* Your app components */}
    </ApolloProvider>
  );
}
```

## GraphQL Code Generator

Run code generation to create TypeScript types from your GraphQL operations:

```bash
yarn generate
```

This will:
1. Introspect your Supabase GraphQL schema
2. Generate TypeScript types for your queries and mutations
3. Output generated files to `src/gql/`

## Example Query

Here's how to write a GraphQL query with type-safety:

```tsx
import { useQuery } from '@apollo/client';
import { graphql } from './gql';

const allItemsQueryDocument = graphql(/* GraphQL */ `
  query AllItems($cursor: Cursor) {
    itemsCollection(first: 10, after: $cursor) {
      edges {
        node {
          nodeId
          id
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

function ItemList() {
  const { data, fetchMore } = useQuery(allItemsQueryDocument);
  
  return (
    <div>
      {data?.itemsCollection?.edges.map(({ node }) => (
        <div key={node.nodeId}>{node.name}</div>
      ))}
      {data?.itemsCollection?.pageInfo.hasNextPage && (
        <button
          onClick={() => {
            fetchMore({
              variables: {
                cursor: data?.itemsCollection?.pageInfo.endCursor,
              },
            });
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}
```

## Starting Local Development

1. Start Supabase:
   ```bash
   yarn start  # or: supabase start
   ```

2. Generate GraphQL types:
   ```bash
   yarn generate
   ```

3. Start Next.js dev server:
   ```bash
   yarn dev
   ```

## Resources

- [Supabase GraphQL Documentation](https://supabase.com/docs/guides/graphql)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [GraphQL Code Generator Documentation](https://the-guild.dev/graphql/codegen)

