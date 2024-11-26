const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blog_name: String,
  blog_disc: String,
  image: String,
});

const blogDB = mongoose.model("blogTbl", blogSchema);

module.exports = blogDB;
