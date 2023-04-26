"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
scalar Time
scalar DateTime
scalar LocalEndTime

type Period {
    id: ID
    type: String
    startDate: DateTime
    endDate: DateTime
    period: String
}

type Payroll {
    id: ID
    period: Period
    collection: Collection
}


type Collection {
    cid: ID
    workHours: String
    workedHours: String
    ordinarys: String
    overtimes: String
    missingTime: String
    auxiliayTime: String
    status: Boolean
    period: Period
    personal: Personal
}

  type Personal {
    pid: ID!
    name: String
    surname: String
    identityCard: String
    typeCard: String
    phone: String
    address: String
    workArea: String
    job: String
    days: [Day]
  }

  type Day {
    did: ID!
    date: DateTime
    dayHours: Time
    hours: [Hour]
  }

  type Hour {
    hid: ID!
    startTime: LocalEndTime
    endTime: LocalEndTime
    hours: Time
  }

  type Query {
    allPersonal: [Personal]!
  }
  type Mutation {
    addHour( date: DateTime!, startTime: String!, endTime: String!,uid: ID!): Hour
    updateHour( id: Int, date: DateTime!, startTime: String!, endTime: String!, uid: ID!): Hour
  }
  type Subscription {
    hourAdded: Hour!
  }
`;
