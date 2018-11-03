import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import Cookies from 'js-cookie'
import fetch from 'node-fetch'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = createHttpLink({
  fetch,
  uri: process.env.API_URL,
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

const wsLink = process.browser
  ? new WebSocketLink({
      uri: process.env.SUBSCRIPTION_URL,
      options: {
        reconnect: true,
      },
    })
  : null

const link = process.browser
  ? split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      authLink.concat(httpLink)
    )
  : httpLink

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
