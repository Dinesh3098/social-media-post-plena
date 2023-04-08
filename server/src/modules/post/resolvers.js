const PostController = require("./controller");

const resolvers = {
    Query: {
        getAllPost: async (_parent, { }, { user }, _info) =>
            await PostController.getAllPost(user),
        searchByTitle: async (_parent, { title }, { user }, _info) =>
            await PostController.searchByTitle(title, user),
        searchByTags: async (_parent, { tag }, { user }, _info) =>
            await PostController.searchByTags(tag, user),
        searchByDates: async (_parent, { fromDate, toDate }, { user }, _info) =>
            await PostController.searchByDates(fromDate, toDate, user),
    },
    Mutation: {
        createPost: async (_parent, { postInput }, { user }, _info) =>
            await PostController.createPost(postInput, user),
        deletePost: async (_parent, { id }, { user }, _info) =>
            await PostController.deletePost(id, user),
        updatePost: async (_parent, { id, postUpdate }, { user }, _info) =>
            await PostController.updatePost(id, postUpdate, user),
        uploadPostImage: async (_parent, { files }, _context, _info) =>
            await PostController.uploadPostImage(files),
    },
};

module.exports = resolvers;
