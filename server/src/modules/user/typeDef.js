const { User } = require("./contract");

const typeDef = `
scalar Upload
${User}

type AuthData {
    token: String
    name: String
    userId: ID
}

type SignupUser {
    token: String
    userId: ID
}

type Query {
    getUser(id: ID!): User
}

type Mutation {
    signupUser(name: String, email: String!, password: String!): SignupUser
    login(email: String!, password: String!): AuthData

}`;

module.exports = typeDef;
