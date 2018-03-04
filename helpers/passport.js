const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("./../models/model");

module.exports = appExpress => {
  appExpress.use(passport.initialize());
  appExpress.use(passport.session());

  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({
        where: {
          username: username
        }
      })
        .then(user => {
          if (user === null) {
            return done(null, false, { message: "Incorrect credentials." });
          }
          let hashedPassword = bcrypt.hashSync(password, user.salt);
          if (user.password === hashedPassword) {
            return done(null, user);
          }
          return done(null, false, { message: "Incorrect credentials." });
        })
        .catch(err => {
          return done(err, null, { err });
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: {
        id
      }
    }).then(user => {
      if (user === null) {
        done(new Error("Wrong user id."));
      }

      done(null, user);
    });
  });
};
