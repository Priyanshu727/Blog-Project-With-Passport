const user = require("../models/user.schema");

const LocalStrategy = require("passport-local").Strategy;

const userAuth = (req, res, next) => {
  const { username, email, password, phone } = req.body;

  if (username && email && password && phone) {
    next();
  } else {
    res.send("invalid data");
  }
};

const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.redirect("/login");
  }
};

const localAuth = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      let User = await user.findOne({ username: username });

      try {
        if (!User) {
          return done(null, false);
        }
        if (User.password != password) {
          return done(null, false);
        }
        return done(null, User);
      } catch (err) {
        return done(err, false);
      }
    })
  );

  passport.serializeUser((User, done) => {
    return done(null, User.id);
  });

  passport.deserializeUser(async (id, done) => {
    let User = await user.findById(id);
    return done(null, User);
  });
};

module.exports = { userAuth, isAuth, localAuth };
