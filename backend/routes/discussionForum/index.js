const express = require("express");
const router = express.Router();
const middleware = require("../../lib/middleware");
const { role, space } = require("../../config/index");
const discussionForumController = require("../../controllers/discussionForum/index");

/**
 * Add discussions to db
 */
router.post(
  "/",
  middleware.isAuthenticated([role.STUDENT, role.TEACHER]),
  (req, res, next) => {
    discussionForumController
      .addDiscussion(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/**
 * get all discussions from db
 */
router.get(
  "/",
  middleware.isAuthenticated([role.STUDENT, role.TEACHER]),
  (req, res, next) => {
    discussionForumController
      .getAllDiscussions(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/**
 * Update message in discussion
 */
router.put(
  "/",
  middleware.isAuthenticated([role.STUDENT, role.TEACHER]),
  (req, res, next) => {
    discussionForumController
      .updateDiscussion(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

module.exports = router;
