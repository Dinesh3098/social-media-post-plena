const { isAuthenticated } = require("../../middleware/permission");

const permissions = {
    Query: {
        getAllPost: isAuthenticated
    },
    Mutation: {
        createPost: isAuthenticated,
        updatePost: isAuthenticated,
        deletePost: isAuthenticated,
    },
};

module.exports = permissions;
