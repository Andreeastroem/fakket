var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var cors = require("micro-cors")(); // highlight-line
var _a = require("apollo-server-micro"), ApolloServer = _a.ApolloServer, gql = _a.gql;
var send = require("micro").send;
var typeDefs = gql(__makeTemplateObject(["\n  type Query {\n    sayHello: String\n  }\n"], ["\n  type Query {\n    sayHello: String\n  }\n"]));
var resolvers = {
    Query: {
        sayHello: function () {
            return "Hello World!";
        }
    }
};
var apolloServer = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
module.exports = apolloServer.start().then(function () {
    var handler = apolloServer.createHandler();
    return cors(function (req, res) {
        return req.method === "OPTIONS" ? send(res, 200, "ok") : handler(req, res);
    });
});
