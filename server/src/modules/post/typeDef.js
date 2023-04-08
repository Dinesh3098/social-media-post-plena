const { Post } = require("./contract");

const typeDef = `
${Post}

input PostInput{
    title: String
    image: String
    description: String
    tag: [String]
}

type File {
    filename: String
    mimetype: String
    encoding: String
    uri: String
    key: String
}

type DeleteMessage {
    status: String
    message: String
}

type Query {
    getPost(id: ID!): Post
    getAllPost: [Post]
    searchByTitle(title: String): [Post]
    searchByTags(tag: String): [Post]
    searchByDates(fromDate: String, toDate: String): [Post]
}

type Mutation {
    createPost(postInput : PostInput): Post
    updatePost(id: ID!, postUpdate: PostInput): DeleteMessage
    deletePost(id: ID!): DeleteMessage
    uploadPostImage(files: Upload!): File!

}`;

module.exports = typeDef;
