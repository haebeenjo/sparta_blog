const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    postId: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});
commentSchema.set('timestamps',true);

module.exports = mongoose.model("Comment", commentSchema);