const mongoose = require("mongoose");

const db = async () => {
  await mongoose.connect(
    "mongodb+srv://priyanshumishra7272:j1rBApw0CLrW9tEF@cluster0.tc304.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Data base is connected");
};

module.exports = db;
