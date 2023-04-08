const mongoose = require("mongoose");
const postSchema = require("./schema");

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
