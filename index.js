const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./config/database");
const { router } = require("./routers/blog.router");
const cookies = require("cookie-parser");
const passport = require("passport");
const session = require('express-session');
const { localAuth } = require("./middleware/blog.auth");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads/img", express.static(path.join(__dirname, "/uploads/img")));

app.use(express.static("public"));

app.use(cookies());

app.use(session({ secret: "private-key" }));

localAuth(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(router);
app.listen(8000, (err) => {
  db();
  err
    ? console.log("Some thing went wrong")
    : console.log("sever started on http://localhost:8000");
});
