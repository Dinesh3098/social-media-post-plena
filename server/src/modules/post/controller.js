const moment = require("moment");
const Post = require("../../models/post/services");
const User = require("../../models/user/services");
const { messages } = require("../../utils/message");
const { imageUploader } = require("../../libs/s3/uploader");

//Create Post
exports.createPost = async (postInput, user) => {
    try {
        if (user) {
            const { title, description } = postInput
            if (title.length < 3 || title.length > 20) {
                throw new Error("Title length must be min 3 and max 20")
            }
            if (description.length < 10 || description.length > 3000) {
                throw new Error("Description length must be min 10 and max 3000")
            }

            const data = { ...postInput, createdBy: user._id };
            const post = await Post.create(data);
            return post;

        }

    } catch (error) {
        throw error;
    }
};

//Get All Post
exports.getAllPost = async (user) => {
    try {
        if (user) {
            const userRes = await User.getById(user.id)
            const posts = await Post.getAll({ createdBy: user.id, isDeleted: false });

            let postResults = await Promise.all(
                posts.map(async (postItem) => ({
                    id: postItem.id,
                    title: postItem.title,
                    image: postItem.image,
                    description: postItem.description,
                    tag: postItem.tag,
                    userName: userRes.name,
                    createdAt: moment(postItem.createdAt).format("YYYY-MM-DDTHH:mm:ss"),
                }))
            );

            return postResults;
        }

    } catch (error) {
        throw error;
    }
};

// Delete Post
exports.deletePost = async (id, user) => {
    try {
        if (user) {
            const getPost = await Post.getById(id);
            if (getPost.createdBy.toString() !== user.id.toString()) {
                throw new Error("You have no permission to delete this post.")
            }
            const updateData = { isDeleted: true, updatedBy: user.id };
            const post = await Post.update(id, updateData);
            if (post) {
                return {
                    status: "success",
                    message: messages.post.delete_success,
                };
            } else {
                return {
                    status: "failed",
                    message: messages.post.delete_error,
                };
            }
        }
    } catch (error) {
        throw error;
    }
};

//Update Post
exports.updatePost = async (id, postUpdate, user) => {
    try {
        if (user) {
            const getPost = await Post.getById(id);
            if (getPost.createdBy.toString() !== user.id.toString()) {
                throw new Error("You have no permission to update this post.")
            }
            const updateData = { ...postUpdate, updatedBy: user.id };
            const post = await Post.update(id, updateData);
            if (post) {
                return {
                    status: "success",
                    message: messages.post.update,
                };
            } else {
                return {
                    status: "failed",
                    message: messages.post.update_error,
                };
            }
        }
    } catch (error) {
        throw error;
    }
};

//Search Post by title
exports.searchByTitle = async (title, user) => {
    try {

        if (user) {
            let getAllPost
            if (title) {
                const posts = await Post.getAllBySearch(title);
                getAllPost = posts
            }
            const userRes = await User.getById(user.id)

            let postResults = await Promise.all(
                getAllPost.map(async (postItem) => ({
                    id: postItem.id,
                    title: postItem.title,
                    image: postItem.image,
                    description: postItem.description,
                    tag: postItem.tag,
                    userName: userRes.name,
                    createdAt: moment(postItem.createdAt).format("YYYY-MM-DDTHH:mm:ss"),
                }))
            );

            return postResults;
        }
    } catch (error) {
        throw error;
    }
};

//Search Post By tags
exports.searchByTags = async (tag, user) => {
    try {

        if (user) {
            let getAllPost
            if (tag) {
                const posts = await Post.getAllBySearch(tag);
                getAllPost = posts
            }
            const userRes = await User.getById(user.id)

            let postResults = await Promise.all(
                getAllPost.map(async (postItem) => ({
                    id: postItem.id,
                    title: postItem.title,
                    image: postItem.image,
                    description: postItem.description,
                    tag: postItem.tag,
                    userName: userRes.name,
                    createdAt: moment(postItem.createdAt).format("YYYY-MM-DDTHH:mm:ss"),
                }))
            );

            return postResults;
        }
    } catch (error) {
        throw error;
    }
};

//Search Post By dates
exports.searchByDates = async (fromDate, toDate, user) => {
    try {
        if (user) {
            let startDate = moment(fromDate).toISOString(true);
            let endDate = moment(toDate).toISOString(true)
            
            const userRes = await User.getById(user.id)
            const posts = await Post.getAll({ createdAt: { $gte: startDate, $lt: endDate }, isDeleted: false });
        
            let postResults = await Promise.all(
                posts.map(async (postItem) => ({
                    id: postItem.id,
                    title: postItem.title,
                    image: postItem.image,
                    description: postItem.description,
                    tag: postItem.tag,
                    userName: userRes.name,
                    createdAt: moment(postItem.createdAt).format("YYYY-MM-DDTHH:mm:ss"),
                }))
            );

            return postResults;


        }

    } catch (error) {
        throw error;
    }
};


//To upload Single post images to AWS S3
exports.uploadPostImage = async (files) => {
    try {
        const { createReadStream, filename, mimetype, encoding } = await files.file;
        const { Location, key } = await imageUploader.upload(
            createReadStream(),
            {
                filename,
                mimetype,
            }
        );

        return {
            filename,
            mimetype,
            encoding,
            uri: Location,
        };
    } catch (error) {
        throw error;
    }
};