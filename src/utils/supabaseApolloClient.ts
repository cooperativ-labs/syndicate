import {
  ApolloClient,
  createHttpLink,
  defaultDataIdFromObject,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import { createClient } from "../../supabase/utils/client";

const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    if ("nodeId" in responseObject) {
      return `${responseObject.nodeId}`;
    }
    return defaultDataIdFromObject(responseObject);
  },
  possibleTypes: { Node: [] }, // Add your types here as you define them
  typePolicies: {
    Query: {
      fields: {
        // Add pagination for your collections here
        // Example: todosCollection: relayStylePagination(),
        node: {
          read(_, { args, toReference }) {
            const ref = toReference({
              nodeId: args?.nodeId,
            });
            return ref;
          },
        },
      },
    },
  },
});

const getGraphQLEndpoint = () => {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`;
  }
  return "http://localhost:54321/graphql/v1";
};

const supabase = createClient();

const httpLink = createHttpLink({
  uri: getGraphQLEndpoint(),
});

const authLink = setContext(async (_, { headers }) => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    },
  };
});

const supabaseApolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  ssrMode: typeof window === "undefined",
});

export default supabaseApolloClient;
