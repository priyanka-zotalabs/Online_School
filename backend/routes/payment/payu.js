const express = require("express");
const router = express.Router();
const middleware = require("../../lib/middleware");
const { role, space } = require("../../config/index");
const payUController = require("../../controllers/payment/payu");

/**
 * generateHash for PayU payment
 */
router.post(
  "/payment/generateHash",
  middleware.isAuthenticated([role.STUDENT]),
  (req, res, next) => {
    payUController
      .payuHash(req.body)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);



module.exports = router;
