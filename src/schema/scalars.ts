import { GraphQLScalarType, GraphQLError, Kind } from 'graphql'

const TIME_REGEX = /^([0-9]{2,3}):([0-5][0-9])(:[0-5][0-9])?$/

const validateTime = (time: any): string => {
  if (typeof time !== 'string') {
    throw new GraphQLError('Time cannot represent a non-string value')
  }
  if (!TIME_REGEX.test(time)) {
    throw new GraphQLError(`Time cannot represent value: ${time}`)
  }
  return time
}

export const GraphQLTime =
/* #__PURE__ */ new GraphQLScalarType({
    name: 'LocalTime',
    description: 'A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.',
    serialize (value) {
      // value sent to client as string
      return validateTime(value)
    },
    parseValue (value) {
      // value from client as json
      return validateTime(value)
    },
    parseLiteral (ast) {
      // value from client in ast
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(`Can only validate strings as local times but got a: ${ast.kind}`)
      }
      return validateTime(ast.value)
    },
    extensions: {
      codegenScalarType: 'string'
    }
  })
