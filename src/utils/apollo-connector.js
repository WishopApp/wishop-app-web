import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import Cookies from 'js-cookie'
import fetch from 'node-fetch'

const httpLink = createHttpLink({
  fetch,
  uri: `${process.env.API_URL}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get(process.env.AUTH_TOKEN_NAME)
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
