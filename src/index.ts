import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
import app from './app'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { typeDefs } from './schema/typeDefs'
import { resolvers } from './schema/resolvers'
import config from './utils/config'
import logger from './utils/logger'

const startApolloServer = async (): Promise<any> => {
  const httpServer = createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
  })

  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart () {
          return {
            async drainServer () {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  server.applyMiddleware({ app, path: '/graphql', cors: true })
  await new Promise<void>((resolve: any) =>
    httpServer.listen({ port: config.PORT }, resolve)
  )
  if (config.PORT != null) {
    logger.info(`🚀 Server running on port ${config.PORT}`)
  }
  return { server, app }
}

startApolloServer().catch(err => logger.error(err))
