import React from 'react';
import App from './App'
import { InMemoryCache, ApolloClient,createHttpLink,ApolloProvider, }from '@apollo/client'
import {setContext} from "@apollo/client/link/context";

const httplink = createHttpLink({
    uri:'http://localhost:5000'
})

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')
    return{
        headers:{
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link:authLink.concat(httplink),
    cache: new InMemoryCache(),
    assumeImmutableResults: true,
})


const ApolloProviders = () => {
  return(
      <ApolloProvider client={client}>
          <App/>
      </ApolloProvider>)
}

export default ApolloProviders;