const Post = require(".");

exports.getAll = async (data) => {
    try {
        const post = await Post.find(data).populate("createdBy").sort({ createdAt: -1 });
        return post;
    } catch (error) {
        throw error;
    }
};

exports.create = async (data) => {
    try {
        const post = await Post.create(data);
        return post;
    } catch (error) {
        throw error;
    }
};

exports.update = async (id, updateValues) => {
    try {
        const post = await Post.findByIdAndUpdate(
            id,
            { $set: updateValues },
            { new: true }
        );
        return post;
    } catch (error) {
        throw error;
    }
};

exports.getById = async (id) => {
    try {
        const post = await Post.findById(id);
        return post;
    } catch (error) {
        throw error;
    }
};

exports.getAllBySearch = async (searchString) => {
    try {
        const post = await Post.find({
            $text: { $search: searchString },
            isDeleted: false
        }).populate("createdBy");
        return post;
    } catch (error) {
        throw error;
    }
};