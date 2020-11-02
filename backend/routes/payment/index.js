const express = require("express");
const router = express.Router();
const coupon = require("../../config/coupon");
const { statusCode } = require("../../lib/constant");
const middleware = require("../../lib/middleware");
const { role, space } = require("../../config/index");
const paymentController = require("../../controllers/payment/index");

/**
 * Payment for course using STRIPE
 */
router.post(
  "/stripe/coursePayment",
  middleware.isAuthenticated([role.STUDENT]),
  (req, res, next) => {
    paymentController
      .stripeChargePayment(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/**
 * Apply discount coupon code on course amount
 */
router.post("/coupon", (req, res, next) => {
  let { amount, couponCode } = req.body;

  let discountPct = coupon[couponCode.trim()];
  let finalAmount = amount - (amount * discountPct) / 100;

  if (finalAmount == 0) {
    finalAmount = 8;
  }

  if (discountPct) {
    res.status(200).send({
      status: statusCode.Success,
      message: "Valid coupon code.",
      amount: finalAmount,
    });
  } else {
    res.status(400).send({
      status: statusCode.InvalidData,
      message: "Invalid coupon code.",
    });
  }
});

/**
 * Payment for course using STRIPE
 */
router.post(
  "/coursePayment",
  middleware.isAuthenticated([role.STUDENT]),
  (req, res, next) => {
    paymentController
      .chargePayment(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/**
 * get token for STRIPE
 */
router.get("/stripeToken", (req, res, next) => {
  let cardDetails = req.body;

  paymentController
    .getToken(cardDetails)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

module.exports = router;
