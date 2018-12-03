const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { ObjectId } = require("mongodb");

/* LOAD MODELS (POST AND USER) */
const Post = require("../../models/Post");
const User = require("../../models/User");

/* LOAD INPUT VALIDATION */
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");

/*
    @route      GET api/posts/test
    @desc       Tests posts route
    @access     Public
*/
router.get("/test", (req, res) => {
  res.json({ msg: "Posts Works!" });
});

/*
    @route      GET api/posts
    @desc       Gets an array of posts
    @access     Private
*/
router.get("/", (req, res) => {
  const errors = {};
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      errors.serverError = "Internal server error.";
      res.status(500).json(errors);
    });
});

/*
    @route      GET api/posts/:user_id
    @desc       Gets a list of posts by user id
    @access     Private
*/
router.get(
  "/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Post.find({ user: req.params.user_id })
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

/*
    @route      GET api/posts/:post_id
    @desc       Gets a post by id
    @access     Private
*/
router.get(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          errors.noFound = "Post was not found";
          res.status(404).json(errors);
        }
        res.json(post);
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

/*
    @route      DELETE api/posts/:post_id
    @desc       Delets a post by id
    @access     Private
*/
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          errors.notFound = "Post was not found";
          return res.status(404).json(errors);
        }

        if (
          ObjectId(post.user).toString() !== ObjectId(req.user.id).toString()
        ) {
          errors.authorization = "Not Authorized.";
          return res.status(403).json(errors);
        }

        Post.findByIdAndDelete(req.params.post_id).then(post => {
          if (!post) {
            errors.noFound = "Post was not found";
            return res.status(404).json(errors);
          }
          res.json(post);
        });
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

/*
    @route      Post api/posts
    @desc       Adds a new post
    @access     Private
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* VALIDATE INPUTS */
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

/*
    @route      Post api/posts/post_id
    @desc       Edits an exesting post
    @access     Private
*/
router.post(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* VALIDATE INPUTS */
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const updatedPost = new Post({
      text: req.body.text
    });

    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          errors.notFound = "Post was not found";
          return res.status(404).json(errors);
        }

        if (
          ObjectId(post.user).toString() !== ObjectId(req.user.id).toString()
        ) {
          errors.authorization = "Not Authorized.";
          return res.status(403).json(errors);
        }

        Post.findByIdAndUpdate(req.params.post_id, {
          $set: { text: updatedPost.text }
        }).then(post => {
          post.text = updatedPost.text;
          res.json(post);
        });
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

/*
    @route      Post api/posts/like/:post_id
    @desc       Addes a like to a post
    @access     Private
*/
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          errors.notFound = "Post not found";
          return res.status(404).json(errors);
        }
        // verify if the user did like the post previously
        const likedBefore = post.likes.filter(like => {
          return (like.user = req.user.id);
        });

        if (likedBefore.length > 0) {
          errors.likedBefore = "Current user already liked this post.";
          return res.status(400).json(errors);
        }

        // add the user id to the likes array
        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

/*
    @route      Post api/posts/unlike/:post_id
    @desc       removes a like to a post
    @access     Private
*/
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          errors.notFound = "Post not found";
          return res.status(404).json(errors);
        }
        // verify if the user did like the post previously
        const likedBefore = post.likes.filter(like => {
          return (like.user = req.user.id);
        });

        if (likedBefore.length < 1) {
          errors.alreadyLiked = "Current user didn't liked this post.";
          return res.status(400).json(errors);
        }

        // remove the user id from the likes array
        post.likes = post.likes.filter(post => {
          return ObjectId(post.user).toString() !== req.user.id;
        });
        post.save().then(post => res.json(post));
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

/*
    @route      Post api/posts/comment/:post_id
    @desc       Addes a comment to a post
    @access     Private
*/
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* VALIDATE INPUTS */
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          errors.notFound = "Post not found";
          return res.status(404).json(errors);
        }
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

/*
    @route      DELETE api/posts/comment/:post_id/:comment_id
    @desc       removes a comment from a post
    @access     Private
*/
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          errors.notFound = "Post not found";
          return res.status(404).json(errors);
        }

        let commentToRemove = post.comments.filter(
          comment => ObjectId(comment.id).toString() === req.params.comment_id
        );

        if (commentToRemove.length < 1) {
          errors.notFound = "Comment not found";
          return res.status(404).json(errors);
        }

        // verify if the user did like the post previously
        commentToRemove = commentToRemove[0];
        if (ObjectId(commentToRemove.user).toString() !== req.user.id) {
          errors.authorization = "Not Authorized.";
          console.log(commentToRemove);
          console.log(ObjectId(commentToRemove.user).toString(), req.user.id);
          return res.status(403).json(errors);
        }
        post.comments = post.comments.filter(
          comment =>
            ObjectId(comment.id).toString() !==
            ObjectId(commentToRemove.id).toString()
        );
        post.save().then(post => res.json(post));
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        console.log(err);
        res.status(500).json(errors);
      });
  }
);

module.exports = router;
