import { gql } from 'apollo-server-express'

export const typeDefs = gql`
scalar Time
scalar DateTime
scalar LocalEndTime

  type Personal {
    uid: ID!
    name: String
    surname: String
    identityCard: String
    typeCard: String
    phone: String
    address: String
    workArea: String
    job: String
  }
  type Hour {
    id: Int
    startTime: LocalEndTime
    endTime: LocalEndTime
    hours: Time
    day: Day
    personal: Personal!
  }

  type Day {
    id: Int
    date: DateTime
    dayHours: Time
    hours: [Hour]
    personal: Personal!
  }

  type Query {
    allHours: [Hour]!
  }
  type Mutation {
    addHour( date: DateTime!, startTime: String!, endTime: String!,uid: ID!): Hour
    updateHour( id: Int, date: DateTime!, startTime: String!, endTime: String!, uid: ID!): Hour
  }
  type Subscription {
    hourAdded: Hour!
  }
`
