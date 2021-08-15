import React, {Component} from 'react';
import App from './App'
import { InMemoryCache, ApolloClient,createHttpLink,ApolloProvider }from '@apollo/client'

const httplink = createHttpLink({
    uri:'http://localhost:5000'
})

const client = new ApolloClient({
    link:httplink,
    cache: new InMemoryCache()
})

const ApolloProviders = () => {
  return(
      <ApolloProvider client={client}>
          <App/>
      </ApolloProvider>)
}

export default ApolloProviders;