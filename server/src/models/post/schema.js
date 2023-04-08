const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { MONGOOSE_MODEL } = require("../constant");

const postSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: MONGOOSE_MODEL.USER },
        description: {
            type: String,
            maxLength: 3000,
            minLength: 10,
            required: true
        },
        tag: [{ type: String }],
        title: { type: String, minLength: 3, maxLength: 20, required: true },
        image: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: MONGOOSE_MODEL.USER },
        updatedBy: { type: Schema.Types.ObjectId, ref: MONGOOSE_MODEL.USER },
        isDeleted: { type: Boolean, default: false },

    },
    { timestamps: true }
);

postSchema.index({ "$**": 'text' });

module.exports = postSchema;
