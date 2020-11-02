const express = require("express");
const router = express.Router();
const { statusCode } = require("../../lib/constant");
const middleware = require("../../lib/middleware");
const { role, space } = require("../../config/index");
const chatboxController = require("../../controllers/chatbox/index");

/**
 * Add chat to db
 */
router.post(
  "/",
  middleware.isAuthenticated([role.STUDENT, role.TEACHER]),
  (req, res) => {
    chatboxController
      .addChat(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/**
 * get chat from db
 */
router.get(
  "/",
  middleware.isAuthenticated([role.STUDENT, role.TEACHER]),
  (req, res, next) => {
    chatboxController
      .getAllChats(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/**
 * get chat from db
 */
router.put(
  "/",
  middleware.isAuthenticated([role.STUDENT, role.TEACHER]),
  (req, res, next) => {
    chatboxController
      .updateChat(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

module.exports = router;
