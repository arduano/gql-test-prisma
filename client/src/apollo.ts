import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { useMemo } from 'react';
import introspectionQueryResultData from './.gql/graphql-client';

const baseUrl = 'http://localhost:8080';

function createApolloClient() {
  const gqlUri = baseUrl + '/graphql';

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  });

  const cache = new InMemoryCache({ fragmentMatcher }).restore({});

  const errorLink = onError(({ graphQLErrors, networkError, response }) => {
    if (networkError) {
      console.error('A network error has occured');
    } else if (graphQLErrors) {
      graphQLErrors.forEach(error => {
        console.error(error.message);
      });
    }
  });

  const uploadLink = createUploadLink({
    uri: gqlUri,
    // credentials: 'include',
    fetch,
  });

  return new ApolloClient({
    ssrMode: false,
    link: ApolloLink.from([errorLink, uploadLink]),
    cache,
    defaultOptions: {
      mutate: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  });
}

export function useApollo() {
  const store = useMemo(() => createApolloClient(), []);
  return store;
}
