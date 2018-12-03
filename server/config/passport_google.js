const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
opts.clientID = keys.googleClientId;
opts.clientSecret = keys.googleClientSecret;
opts.callbackURL = keys.googleCallbackURL;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

module.exports = passportGoogle => {
  passport.use(
    new GoogleStrategy(opts, (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value }).then(user => {
        if (user) return done(null, user);
        else {
          const name = profile.displayName;
          const email = profile.emails[0].value;
          const avatar = profile.photos[0].value;
          const password = keys.defaultGooglePassword;

          const newUser = new User({
            name,
            email,
            avatar,
            password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  if (user) return done(null, user);
                })
                .catch(err => {
                  return done(null, false);
                });
            });
          });
        }
      });
    })
  );
};
