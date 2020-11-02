const express = require("express");
const router = express.Router();
const middleware = require("../../lib/middleware");
const { role, space } = require("../../config/index");
const paypalController = require("../../controllers/payment/paypal");

/**
 * Create order in PayPal payment
 */
router.post(
  "/payment/createOrder",
  middleware.isAuthenticated([role.STUDENT]),
  (req, res, next) => {
    paypalController
      .createPayPalOrder(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/**
 * Capture order in PayPal payment
 */
router.post(
  "/payment/captureOrder",
  middleware.isAuthenticated([role.STUDENT]),
  (req, res, next) => {
    paypalController
      .capturePayPalOrder(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/**
 * GET all payment details
 */
router.get(
  "/payment",
  middleware.isAuthenticated([role.STUDENT, role.ADMIN, role.TEACHER]),
  (req, res, next) => {
    paypalController
      .getAllPaymentDetails()
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);


/**
 * GET getPaypalSTC
 */
router.get(
  "/getPaypalSTC",
  middleware.isAuthenticated([role.STUDENT, role.ADMIN, role.TEACHER]),
  (req, res, next) => {
    paypalController
      .getPaypalSTC(req.query.orderId)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);


module.exports = router;
