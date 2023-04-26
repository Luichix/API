"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.pubsub = void 0;
const client_1 = require("./prisma/client");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const graphql_scalars_1 = require("graphql-scalars");
const scalars_1 = require("./scalars");
// import { diffTimes } from '../__test__/scripts'
exports.pubsub = new graphql_subscriptions_1.PubSub();
const SUBSCRIPTION_EVENTS = {
    HOUR_ADDED: 'HOUR_ADDED'
};
exports.resolvers = {
    Query: {
        allPersonal: () => client_1.prisma.personal.findMany({
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
            subscribe: () => exports.pubsub.asyncIterator(SUBSCRIPTION_EVENTS.HOUR_ADDED)
        }
    },
    Time: scalars_1.GraphQLTime,
    LocalEndTime: graphql_scalars_1.GraphQLLocalEndTime,
    DateTime: graphql_scalars_1.GraphQLDateTime
};
