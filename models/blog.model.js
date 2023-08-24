const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    likes: { type: Number, required: true },
    comments: { type: Object, required: true },
  },
  { versionKey: false }
);

const blogModel = mongoose.model("blogs", blogSchema);

module.exports = { blogModel };
