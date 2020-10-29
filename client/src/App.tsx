import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { useApollo } from './apollo';
import './App.css';
import UserPosts from './view/UserPosts';

function App() {
  const apollo = useApollo();
  return (
    <ApolloProvider client={apollo}>
      <ApolloHooksProvider client={apollo}>
        <UserPosts />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default App;
