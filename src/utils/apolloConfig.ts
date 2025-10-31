import { defaultDataIdFromObject } from "@apollo/client";
import { InMemoryCache } from "@apollo/client-integration-nextjs";

export const createApolloCache = () =>
  new InMemoryCache({
    dataIdFromObject(responseObject) {
      if ("nodeId" in responseObject && responseObject.nodeId) {
        return `${responseObject.nodeId}`;
      }

      return defaultDataIdFromObject(responseObject);
    },
    possibleTypes: { Node: [] },
    typePolicies: {
      Query: {
        fields: {
          node: {
            read(_, { args, toReference }) {
              const ref = toReference({
                nodeId: args?.nodeId
              });
              return ref;
            }
          }
          // Add pagination for your collections here
          // Example: todosCollection: relayStylePagination(),
        }
      }
    }
  });

export const getGraphQLEndpoint = () => {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`;
  }

  return "http://localhost:54321/graphql/v1";
};
