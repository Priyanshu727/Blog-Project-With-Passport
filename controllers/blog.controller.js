const multer = require("multer");
const blog = require("../models/blog.schema");
const user = require("../models/user.schema");
const fs = require("fs");

let blogId;

const home = async (req, res) => {
  try {
    const data = await blog.find();
    console.log(data);
    return res.render("HomePage", { blogsData: data });
  } catch (error) {
    console.log(error);
  }
};

const addblog = async (req, res) => {
  let image = req.file.path;
  try {
    let data = await blog.create({ ...req.body, image });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const add_blog = async (req, res) => {
  return res.render("Addblog");
}; //redirecting to add blogs page

const edit_blog = async (req, res) => {
  let { id } = req.query;
  blogId = id;
  try {
    const data = await blog.findById(id);
    return res.render("Editblog", { data });
  } catch (error) {
    console.log(error);
  }
};

// const updateblog = async (req, res) => {
//   let image = req.file.path;
//   try {
//     let data = await blog
//       .findOneAndUpdate(blogId, { ...req.body, image })
//       .then((singleRecode) => {
//         fs.unlinkSync(singleRecode.image);
//         return res.redirect("/");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     return res.redirect("/");
//   } catch (error) {
//     console.log(error);
//   }
// };
const updateblog = async (req, res) => {
  if (req.file) {
    blog
      .findById(blogId)
      .then((singleRecode) => {
        fs.unlinkSync(singleRecode.image);
      })
      .catch((err) => {
        console.log(err);
      });
    let image = req.file.path;
    try {
      let data = await blog.findByIdAndUpdate(blogId, { ...req.body, image });
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let data = await blog.findByIdAndUpdate(blogId, req.body);
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
};

const deleteblog = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await blog
      .findOneAndDelete(id)
      .then((singleRecode) => {
        fs.unlinkSync(singleRecode.image);
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const signup = async (req, res) => {
  let data = await user.create(req.body);
  return res.redirect("/login");
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let User = await user.findOne({ email: email });

  if (User) {
    if (User.password === password) {
      return res.cookie("user", User.id).redirect("/");
    }
    console.log("Wrong password....");
    return res.redirect("login");
  } else {
    console.log("Wrong email....");
    return res.redirect("login");
  }
};

const loginPage = (req, res) => {
  return res.render("authentication-login");
};

const signupPage = (req, res) => {
  return res.render("authentication-register");
};

const logout = (req,res)=>{
  req.logOut((err)=>{
      if(err){
          console.log(err);
          return false;
      }
      res.redirect('/login');
  })
}

const profile = (req,res)=>{
  res.send(req.user);
}

module.exports = {
  home,
  addblog,
  updateblog,
  deleteblog,
  add_blog,
  edit_blog,
  login,
  signup,
  loginPage,
  signupPage,
  logout,
  profile
};
