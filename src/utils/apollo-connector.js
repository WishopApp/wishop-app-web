import { ApolloClient } from 'apollo-client'
// import { split } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'
import Cookies from 'js-cookie'
import fetch from 'node-fetch'
// import ws from 'ws'

const httpLink = createHttpLink({
  fetch,
  uri: `${process.env.API_URL}`,
})

// const wsLink = new WebSocketLink({
//   uri: `${process.env.SUBSCRIPTION_URL}`,
//   options: {
//     reconnect: true,
//   },
// })

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get(process.env.AUTH_TOKEN_NAME)
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === 'OperationDefinition' && operation === 'subscription'
//   },
//   wsLink,
//   authLink.concat(httpLink)
// )

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
