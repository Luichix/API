"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLTime = void 0;
const graphql_1 = require("graphql");
const TIME_REGEX = /^([0-9]{2,3}):([0-5][0-9])(:[0-5][0-9])?$/;
const validateTime = (time) => {
    if (typeof time !== 'string') {
        throw new graphql_1.GraphQLError('Time cannot represent a non-string value');
    }
    if (!TIME_REGEX.test(time)) {
        throw new graphql_1.GraphQLError(`Time cannot represent value: ${time}`);
    }
    return time;
};
exports.GraphQLTime = 
/* #__PURE__ */ new graphql_1.GraphQLScalarType({
    name: 'LocalTime',
    description: 'A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.',
    serialize(value) {
        // value sent to client as string
        return validateTime(value);
    },
    parseValue(value) {
        // value from client as json
        return validateTime(value);
    },
    parseLiteral(ast) {
        // value from client in ast
        if (ast.kind !== graphql_1.Kind.STRING) {
            throw new graphql_1.GraphQLError(`Can only validate strings as local times but got a: ${ast.kind}`);
        }
        return validateTime(ast.value);
    },
    extensions: {
        codegenScalarType: 'string'
    }
});
