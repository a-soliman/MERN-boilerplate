const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User");
const keys = require("../../config/keys");

/* LOAD INPUT VALIDATION */
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

/*
    @route      GET api/users/test
    @desc       Tests users route
    @access     Public
*/
router.get("/test", (req, res) => {
  res.json({ msg: "Users Works" });
});

/*
    @route      GET api/users/register
    @desc       Register user
    @access     Public
*/
router.post("/register", (req, res) => {
  /* VALIDATE INPUTS */
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;

  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = "Email already exists.";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name,
        email,
        password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json({ user }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/*
    @route      POST api/users/login
    @desc       Login user / Returns JWT Token
    @input      Email, Password
    @access     Public
*/
router.post("/login", (req, res) => {
  /* VALIDATE INPUTS */
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.user = "User not found.";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        errors.password = "Invalid password.";
        return res.status(401).json(errors);
      }

      const payload = { id: user.id, name: user.name, avatar: user.avatar };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          errors.serverError = "Internal server error.";
          return res.status(500).json(errors);
        }
        return res
          .status(200)
          .json({ success: true, token: `Bearer ${token}` });
      });
    });
  });
});

/*
    @route      GET api/users/google
    @desc       Startes Google Authentication
    @access     Public
*/
router.get(
  "/google",
  passport.authenticate("google", { scope: ['email', 'profile'] })
);

/*
    @route      GET api/users/google/redirect
    @desc       Redirects to home after an authentication process
    @access     Public
*/
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  let user = req.user;
  const payload = { id: user.id, name: user.name, avatar: user.avatar };
  jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
    if (err) {
      errors.serverError = "Internal server error.";
      return res.status(500).json(errors);
    }
    res.redirect('/' + `?token=Bearer ${token}`)
  });
});

/*
    @route      GET api/users/current
    @desc       Return current user
    @input      JWT Token
    @access     Private
*/
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userFildsExcludingPassword = {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar
    };

    res.json(userFildsExcludingPassword);
  }
);
module.exports = router;
