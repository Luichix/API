import { prisma } from '../prisma/client'
import { PubSub } from 'graphql-subscriptions'

export const pubsub = new PubSub()

const SUBSCRIPTION_EVENTS = {
  MESSAGE_ADDED: 'MESSAGE_ADDED'
}

export const resolvers = {
  Query: {
    allMessages: () =>
      prisma.message.findMany({
        include: {
          user: true
        }
      })
  },
  Mutation: {
    addMessage: async (_parent: any, { text, uid }: any) => {
      const user = await prisma.user.findUnique({ where: { uid } })

      const content = await prisma.message.create({
        data: {
          text: text,
          user: {
            connect: {
              uid: uid
            }
          }
        }
      })
      const message = { ...content, user }
      pubsub.publish(SUBSCRIPTION_EVENTS.MESSAGE_ADDED, {
        messageAdded: message
      }).catch(err => console.log(err))
      return message
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(SUBSCRIPTION_EVENTS.MESSAGE_ADDED)
    }
  }
}
