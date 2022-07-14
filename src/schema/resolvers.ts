import { prisma } from './prisma/client'
import { PubSub } from 'graphql-subscriptions'
import { GraphQLDateTime, GraphQLLocalEndTime } from 'graphql-scalars'
import { GraphQLTime } from './scalars'

export const pubsub = new PubSub()

const SUBSCRIPTION_EVENTS = {
  HOUR_ADDED: 'HOUR_ADDED'
}

export const resolvers = {
  Query: {
    allHours: () =>
      prisma.hour.findMany({
        include: {
          personal: true
        }
      })
  },
  Mutation: {
    addHour: async (_parent: any, { date, startTime, endTime, uid }: any) => {
      const personal = await prisma.personal.findUnique({ where: { uid } })

      const content = await prisma.hour.create({
        data: {
          date: date,
          startTime: startTime,
          endTime: endTime,
          hours: '00:00:00',
          dayHours: '00:00:00',
          personal: {
            connect: {
              uid: uid
            }
          }
        }
      })
      const hour = { ...content, personal }
      pubsub.publish(SUBSCRIPTION_EVENTS.HOUR_ADDED, {
        hourAdded: hour
      }).catch(err => console.log(err))
      return hour
    }
  },
  Subscription: {
    hourAdded: {
      subscribe: () => pubsub.asyncIterator(SUBSCRIPTION_EVENTS.HOUR_ADDED)
    }
  },
  Time: GraphQLTime,
  LocalEndTime: GraphQLLocalEndTime,
  DateTime: GraphQLDateTime
}
