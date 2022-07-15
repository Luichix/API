import { prisma } from './prisma/client'
import { PubSub } from 'graphql-subscriptions'
import { GraphQLDateTime, GraphQLLocalEndTime } from 'graphql-scalars'
import { GraphQLTime } from './scalars'
// import { diffTimes } from '../__test__/scripts'

export const pubsub = new PubSub()

const SUBSCRIPTION_EVENTS = {
  HOUR_ADDED: 'HOUR_ADDED'
}

export const resolvers = {
  Query: {
    allPersonal: () =>
      prisma.personal.findMany({
        include: {
          days: {
            include: {
              hours: true
            }
          }
        }
      })
  },
  Mutation: {
    // addHour: async (_parent: any, { date, startTime, endTime, uid }: any) => {
    //   const personal = await prisma.personal.findUnique({ where: { uid } })

    //   const content = await prisma.hour.create({
    //     data: {
    //       date: date,
    //       startTime: startTime,
    //       endTime: endTime,
    //       hours: diffTimes(startTime, endTime),
    //       dayHours: '00:00:00',
    //       personal: {
    //         connect: {
    //           uid: uid
    //         }
    //       }
    //     }
    //   })
    //   const hour = { ...content, personal }
    //   pubsub.publish(SUBSCRIPTION_EVENTS.HOUR_ADDED, {
    //     hourAdded: hour
    //   }).catch(err => console.log(err))
    //   return hour
    // },
    // updateHour: async (_parent: any, { id, date, startTime, endTime, uid }: any) => {
    //   const personal = await prisma.personal.findUnique({ where: { uid } })

    //   const content = await prisma.hour.update({
    //     where: { id },
    //     data: {
    //       date: date,
    //       startTime: startTime,
    //       endTime: endTime,
    //       hours: diffTimes(startTime, endTime),
    //       personal: {
    //         connect: {
    //           uid: uid
    //         }
    //       }
    //     }
    //   })
    //   const hour = { ...content, personal }
    //   return hour
    // }
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
