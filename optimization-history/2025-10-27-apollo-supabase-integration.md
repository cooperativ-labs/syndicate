# Apollo + Supabase GraphQL Integration

**Date:** October 27, 2025  
**Author:** AI Assistant  
**Status:** Completed

## Summary

Configured Apollo Client to work with Supabase's GraphQL API (pg_graphql) following the official Supabase tutorial. This replaces or supplements the existing DGraph setup with a modern, type-safe GraphQL integration.

## Changes Made

### 1. Dependencies Added

- `@supabase/supabase-js` (^2.76.1) - Supabase client library
- `@graphql-codegen/client-preset` (^5.1.1) - GraphQL Code Generator preset for client-side code generation
- Updated `@apollo/client` to latest version

### 2. New Files Created

#### `src/utils/supabase.ts`
- Created Supabase client instance
- Configured for local development (localhost:54321) with fallback to production URL
- Exports default anon key for local development
- Supports environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### `src/utils/supabaseApolloClient.ts`
- Configured Apollo Client specifically for Supabase GraphQL
- Implements authentication via auth link that:
  - Retrieves JWT from Supabase Auth session
  - Automatically includes token in Authorization header
  - Includes apikey header required by Supabase
- Configured InMemoryCache with:
  - `nodeId` support for Relay-style pagination
  - Type policies for GraphQL node interface
  - SSR support
- Endpoint configuration supports local and production environments

#### `SUPABASE_APOLLO_SETUP.md`
- Comprehensive setup documentation
- Environment variable configuration guide
- Example queries with TypeScript types
- Local development instructions
- Resource links

#### `optimization-history/2025-10-27-apollo-supabase-integration.md`
- This report

### 3. Files Modified

#### `pages/_app.tsx`
**Before:**
- Had broken ReactDOM.createRoot() calls inside the component
- Created ApolloClient incorrectly with wrong endpoint
- Attempted to render outside React lifecycle

**After:**
- Clean implementation using `ApolloProvider` from `@apollo/client`
- Imports `supabaseApolloClient` from utils
- Properly returns JSX with correct provider hierarchy:
  - ApolloProvider (outermost)
  - WagmiConfig
  - SessionProvider
  - StateProvider
  - Application content
- Removed broken ReactDOM code

#### `src/SetAppContext.tsx`
**Before:**
- Had syntax errors (missing closing braces)
- Attempted to use ReactDOM.createRoot incorrectly
- Non-functional component

**After:**
- Simplified to pass-through component
- Properly typed with TypeScript
- Returns children without side effects

#### `codegen.ts`
**Before:**
- Used `npm run prettier`
- Used double quotes

**After:**
- Changed to `yarn prettier` (consistent with project)
- Updated all quotes to single quotes (project standard)
- Removed trailing commas (project standard)
- Configured for Supabase GraphQL endpoint (localhost:54321/graphql/v1)

#### `package.json`
**Changes:**
- Added `prettier` script: `"prettier": "prettier --write ."`
- Updated prettier configuration to match project standards:
  - `printWidth`: 100
  - `singleQuote`: true
  - `trailingComma`: "none"
  - `tabWidth`: 2
  - `semi`: true
  - `jsxSingleQuote`: false
  - `bracketSpacing`: true
  - `arrowParens`: "avoid"
  - `endOfLine`: "lf"

## Technical Details

### Apollo Client Configuration

The Apollo Client is configured with:

1. **HTTP Link**: Points to Supabase GraphQL endpoint
   - Local: `http://localhost:54321/graphql/v1`
   - Production: `${NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`

2. **Auth Link**: Middleware that:
   - Gets current session from Supabase Auth
   - Extracts access token
   - Adds to Authorization header as Bearer token
   - Includes anon key in apikey header

3. **Cache Configuration**:
   - Uses `nodeId` as primary cache key (Relay standard)
   - Fallback to default data ID
   - Configured type policies for node interface
   - Supports pagination patterns

4. **SSR Support**: Detects server-side rendering and configures appropriately

### GraphQL Code Generator

Configured to:
- Introspect schema from local Supabase instance
- Generate TypeScript types for all queries/mutations
- Add `__typename` to all selections automatically
- Output to `src/gql/` directory
- Support custom scalar types:
  - UUID → string
  - Date → string
  - Time → string
  - Datetime → string
  - JSON → string
  - BigInt → string
  - BigFloat → string
  - Opaque → any

## Environment Variables

Required environment variables (add to `.env.local`):

```bash
# Local Development (default values)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# Production/Staging (get from Supabase dashboard)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Usage Example

```tsx
import { useQuery } from '@apollo/client';
import { graphql } from './gql';

// Define query with full type-safety
const myQuery = graphql(/* GraphQL */ `
  query GetItems {
    itemsCollection(first: 10) {
      edges {
        node {
          nodeId
          id
          name
        }
      }
    }
  }
`);

function MyComponent() {
  const { data, loading, error } = useQuery(myQuery);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.itemsCollection?.edges.map(({ node }) => (
        <div key={node.nodeId}>{node.name}</div>
      ))}
    </div>
  );
}
```

## Next Steps

1. **Generate GraphQL Types**:
   ```bash
   yarn generate
   ```

2. **Start Local Supabase**:
   ```bash
   yarn start
   ```

3. **Start Development Server**:
   ```bash
   yarn dev
   ```

4. **Create Your First Query**:
   - Write GraphQL queries in your components
   - Run codegen to generate types
   - Use generated hooks with full type-safety

## Benefits

✅ **Type Safety**: Full TypeScript support for all GraphQL operations  
✅ **Authentication**: Automatic JWT token management  
✅ **Caching**: Intelligent caching with Apollo InMemoryCache  
✅ **SSR Support**: Works with Next.js server-side rendering  
✅ **Developer Experience**: Auto-generated hooks and types  
✅ **Production Ready**: Environment-based configuration  
✅ **Standards Based**: Uses Relay cursor pagination standard  

## References

- [Supabase GraphQL Documentation](https://supabase.com/docs/guides/graphql)
- [Apollo Client with Supabase Tutorial](https://supabase.com/docs/guides/graphql/with-apollo)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)

## Notes

- The existing DGraph Apollo client (`src/utils/apolloClient.ts`) has been preserved
- You can use both clients simultaneously if needed during migration
- The Supabase client is now the default in `_app.tsx`
- To switch back to DGraph, import and use the old client instead

