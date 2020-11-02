// const utils = require("../../lib/utils");
// const logger = require("../../lib/logger");
// const { internalError, statusCode } = require("../../lib/constant");
// const config = require("../../config/index");
// const courseController = require("../../controllers/course/register");

// var stripe = require("stripe")(config.stripe_key);
// //stripe.setTimeout(config.sessionTimeoutTime);

// /**
//  * This function to generate payment token if card is valid
//  * * @param {OBJECT} req
//  */
// const getToken = (req) =>
//   new Promise((resolve, reject) => {
//     logger.info(`getToken - Stripe token generation started`);
//     let card_details = req.body;
//     let card = {
//       number: card_details.number,
//       exp_month: card_details.exp_month,
//       exp_year: card_details.exp_year,
//       cvc: card_details.cvc,
//       name: card_details.name,
//     };
//     stripe.tokens.create({ card: card }, function (err, token) {
//       if (err) {
//         logger.error(`getToken - Stripe token generation failed ${err}`);
//         reject({
//           status: statusCode.InvalidData,
//           code: err.code,
//           decline_code: err.decline_code,
//           message: err.message,
//         });
//       } else {
//         logger.info(`getToken - Stripe token generation successfull`);
//         req.body.stripeToken = token.id;
//         resolve(req);
//         /* resolve({
//           status: statusCode.Success,
//           message: "Token Generated Successfully.",
//           tokenId: token.id,
//         }); */
//       }
//     });
//   });

// /**
//  * This function is to charge the buyer using the token generated while verifying the card
//  * @param {OBJECT} req
//  */
// const chargePayment = (req) =>
//   new Promise((resolve, reject) => {
//     logger.info(`chargePayment - Stripe payment procedure started.`);

//     let payment_details = req.body;

//     stripe.customers.create(
//       {
//         email: payment_details.stripeEmail,
//         source: payment_details.stripeToken,
//         name: payment_details.name,
//         address: {
//           line1: payment_details.line1,
//           postal_code: payment_details.postal_code,
//           city: payment_details.city,
//           country: payment_details.country,
//         },
//       },
//       (err, customer) => {
//         if (err) {
//           logger.error(`chargePayment - Error in customer generation. ${err}`);
//           reject({
//             status: statusCode.InvalidData,
//             code: err.code,
//             decline_code: err.decline_code,
//             message: err.message,
//           });
//         } else {
//           stripe.charges.create(
//             {
//               amount: Math.round(parseFloat(100 * payment_details.amount)),
//               description: payment_details.description,
//               currency: "EUR",
//               customer: customer.id,
//             },
//             (err, charge) => {
//               if (err) {
//                 logger.error(`chargePayment - Error in payment. ${err}`);
//                 reject({
//                   status: statusCode.InvalidData,
//                   code: err.code,
//                   decline_code: err.decline_code,
//                   message: err.message,
//                 });
//               } else {
//                 let courseObj = {
//                   courseId: payment_details.courseId,
//                   amount: Math.round(parseFloat(payment_details.amount)),
//                   paymentMethod: charge.calculated_statement_descriptor,
//                   transaction_id: charge.id,
//                   name: payment_details.name,
//                   contactNumber: payment_details.contactNumber,
//                 };

//                 req.body = courseObj;
//                 courseController
//                   .registerCourse(req)
//                   .then((courseRegisterResult) => {
//                     logger.info(
//                       `chargePayment - Student successfully registered for course.`
//                     );
//                     resolve({
//                       status: statusCode.Success,
//                       message:
//                         "Successfully paid and registered for the  course",
//                     });
//                   })
//                   .catch((courseRegisterError) => {
//                     logger.error(
//                       `chargePayment - Course registration failed for student. ${courseRegisterError}`
//                     );
//                     reject({
//                       status: statusCode.Failure,
//                       message: "Failed to register for course.",
//                     });
//                   });
//               }
//             }
//           );
//         }
//       }
//     );
//   });

// /**
//  * This function to genearate token, charge payment and register student for course
//  * @param {OBJECT} req
//  */
// const stripeChargePayment = (req) =>
//   new Promise((resolve, reject) => {
//     getToken(req)
//       .then(chargePayment)
//       .then((result) => {
//         resolve({
//           status: statusCode.Success,
//           message: "Successfully paid and registered for the  course",
//         });
//       })
//       .catch((error) => {
//         reject({
//           status: statusCode.Failure,
//           message: "Failed to register for course.",
//         });
//       });
//   });

// module.exports = {
//   getToken,
//   chargePayment,
//   stripeChargePayment,
// };
