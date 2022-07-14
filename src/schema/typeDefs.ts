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
    id: ID!
    date: DateTime!
    startTime: LocalEndTime
    endTime: Time
    personal: Personal!
  }
  type Query {
    allHours: [Hour]!
  }
  type Mutation {
    addHour( date: DateTime!, startTime: String!, endTime: String!,uid: ID!): Hour
  }
  type Subscription {
    hourAdded: Hour!
  }
`
