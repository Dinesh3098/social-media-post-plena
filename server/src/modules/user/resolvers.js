const UserController = require("./controller");

const resolvers = {
    Query: {
    },
    Mutation: {
        signupUser: async (_parent, { name, email, password }, _context, _info) =>
            await UserController.signupUser(name, email, password),
        login: async (_parent, { email, password }, _context, _info) =>
            await UserController.login(email, password),


    },
};

module.exports = resolvers;
