const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,   
    required: true, 
  },
  writer: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
});
postSchema.set('timestamps',true);

module.exports = mongoose.model("Posts", postSchema);