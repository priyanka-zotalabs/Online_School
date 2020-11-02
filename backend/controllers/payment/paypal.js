const logger = require("../../lib/logger");
const { internalError, statusCode } = require("../../lib/constant");
var randomstring = require("randomstring");
const paymentDetailsModel = require("../../models/database/paymentDetails");
const paypal = require("@paypal/checkout-server-sdk");
const axios = require('axios');

// Creating an environment
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET_KEY;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = "";
if (process.env.PAYPAL_ENVIRONMENT_LIVE == "false") {
  environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
} else {
  environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
}
let client = new paypal.core.PayPalHttpClient(environment);


/**
 * This function is for create STC API call
 * @param {*} bodyData 
 * @param {*} orderID 
 * @param {*} studentId 
 * @param {*} senderCreateDate 
 */
const paypal_stc = (bodyData, orderID, studentId, senderCreateDate) => new Promise((resolve, reject) => {

  const merchant_id = process.env.PAYPAL_MERCHANT_ID
  const tracking_id = orderID
  logger.info(`paypal_stc - access_token  generation started`);

  axios({
    url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en_US',
      'content-type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
    params: {
      grant_type: 'client_credentials',
    },
  })
    .then(result => {
      const accessToken = result.data.access_token
      const authorization = 'Bearer ' + accessToken
      logger.info(`paypal_stc - STC API  call started`);

      const stcHeaders = {
        'Content-Type': 'application/json',
        'Authorization': authorization
      };

      const stcBody = {
        'tracking_id': tracking_id,
        'additional_data': [
          {
            'key': 'sender_account_id',
            'value': studentId
          },
          {
            'key': 'sender_first_name',
            'value': bodyData.buyer_name
          },
          {
            'key': 'sender_last_name',
            'value': bodyData.buyer_surname
          },
          {
            'key': 'sender_email',
            'value': bodyData.email_address
          },
          {
            'key': 'sender_phone',
            'value': bodyData.mobile_number,
          },
          {
            'key': 'sender_create_date',
            'value': senderCreateDate
          }
        ]
      }

      const url = 'https://api-m.sandbox.paypal.com/v1/risk/transaction-contexts/' + merchant_id + '/' + tracking_id;

      axios({
        url: url,
        method: 'put',
        headers: stcHeaders,
        data: stcBody
      })
        .then(stcResult => {
          resolve(stcResult.data);
        })
        .catch(err => {
          logger.error(`paypal_stc - error getting stc call ${JSON.stringify(err, null, 2)}`);
          reject(internalError)
        })
    })
    .catch((error) => {
      logger.error(
        `paypal_stc - error getting stc call. ${error}`
      );
      reject({
        status: statusCode.Failure,
        message: error.message,
      });
    });
});


/**
 * This function to CREATE PayPal order
 * * @param {OBJECT} req
 */
const createPayPalOrder = (req) =>
  new Promise((resolve, reject) => {
    logger.info(`createPayPalOrder - PayPal order generation started`);
    let { body } = req;
    let studentId = req.user.userMetaData.Student._id;
    let senderCreateDate = req.user.userMetaData.Student.createdAt;

    let request = new paypal.orders.OrdersCreateRequest();
    body.invoiceId = "INVOICE-" + randomstring.generate();

    let requestBody = {
      intent: "CAPTURE",
      payer: {
        name: {
          given_name: body.buyer_name,
          surname: body.buyer_surname,
        },
        phone: {
          phone_type: "MOBILE",
          phone_number: {
            national_number: body.mobile_number,
          },
        },
        email_address: body.email_address,
      },
      application_context: {
        brand_name: "ZOTALABS",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        payment_method: {
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
        },
        return_url: process.env.PAYPAL_RETURN_URL,
        cancel_url: process.env.PAYPAL_CANCEL_URL,
      },
      purchase_units: [
        {
          description: `Payment for ${body.course_name}`,
          invoice_id: body.invoiceId,
          soft_descriptor: "ZOTALABS",
          amount: {
            currency_code: process.env.PAYPAL_CURRENCY_CODE,
            value: body.amount,
            breakdown: {
              item_total: {
                currency_code: process.env.PAYPAL_CURRENCY_CODE,
                value: body.amount,
              },
            },
          },
          items: [
            {
              name: body.course_name,
              unit_amount: {
                currency_code: process.env.PAYPAL_CURRENCY_CODE,
                value: body.amount,
              },
              quantity: "1",
              description: body.course_name,
              sku: "SKU_1",
              category: "DIGITAL_GOODS",
            },
          ],
        },
      ],
    };

    request.requestBody(requestBody);

    logger.info(
      `createPayPalOrder - PayPal order generation request -- ${JSON.stringify(
        requestBody
      )}`
    );
    client
      .execute(request)
      .then((response) => {
        logger.info(
          `createPayPalOrder - PayPal order generation successfully.`
        );

        const orderID = response.result.id;
        const redirectLink = response.result.links;

        paypal_stc(body, orderID, studentId, senderCreateDate)
          .then(result => {

            resolve({
              status: statusCode.Success,
              message: "PayPal order created successfully",
              orderID: orderID,
              redirectLink: redirectLink,
            });
          })
      })
      .catch((error) => {
        logger.error(
          `createPayPalOrder - PayPal order creation failed. ${error}`
        );
        reject({
          status: statusCode.Failure,
          message: error.message,
        });
      });
  });

/**
 * This function to CAPTURE PayPal order
 * * @param {OBJECT} req
 */
const capturePayPalOrder = (req) =>
  new Promise((resolve, reject) => {
    logger.info(`capturePayPalOrder - PayPal order capture started`);
    let request = new paypal.orders.OrdersCaptureRequest(
      req.body.approvedPayPalOrderId
    );
    request.requestBody({});
    request.headers["PayPal-Client-Metadata-Id"] = req.body.approvedPayPalOrderId;
    request.headers["PayPal-Request-Id"] = randomstring.generate();

    client
      .execute(request)
      .then((response) => {
        let paymentDetailss = {
          userId: req.user._id,
          batchId: req.body.batchId,
          installmentId: req.body.installmentId,
          amount:
            response.result.purchase_units[0].payments.captures[0].amount.value,
          currency_code:
            response.result.purchase_units[0].payments.captures[0].amount
              .currency_code,
          paymentMethod: req.body.paymentMethod,

          orderId: response.result.id,
          captureId: response.result.purchase_units[0].payments.captures[0].id,
        };
        if (
          response.result.purchase_units[0].payments.captures[0].status ===
          "COMPLETED"
        ) {
          logger.info(
            `capturePayPalOrder - PayPal order captured successfully.`
          );

          paymentDetailss.status =
            response.result.purchase_units[0].payments.captures[0].status;

          paymentDetailsModel
            .addMultiple(paymentDetailss)
            .then((result) => {
              resolve({
                status: statusCode.Success,
                message:
                  "PayPal order captured and payment details saved successfully ",
                data: response
              });
            })
            .catch((error) => {
              logger.error(
                `capturePayPalOrder - Adding payment details failed. ${error}`
              );
              reject({
                status: statusCode.Failure,
                message: error.message,
              });
            });
        } else if (
          response.result.purchase_units[0].payments.captures[0].status ===
          "PENDING"
        ) {
          paymentDetailss.status =
            response.result.purchase_units[0].payments.captures[0].status;

          paymentDetailsModel
            .addMultiple(paymentDetailss)
            .then((result) => {
              resolve({
                status: statusCode.Success,
                message: "PayPal order captured but is in PENDING state.",
                data: response
              });
            })
            .catch((error) => {
              logger.error(
                `capturePayPalOrder - Adding payment details failed. ${error}`
              );
              reject({
                status: statusCode.Failure,
                message: error.message,
              });
            });
        } else if (
          response.result.purchase_units[0].payments.captures[0].status ===
          "DECLINED"
        ) {
          paymentDetailss.status =
            response.result.purchase_units[0].payments.captures[0].status;

          paymentDetailsModel
            .addMultiple(paymentDetailss)
            .then((result) => {
              resolve({
                status: statusCode.Failure,
                message: "PayPal order capture DECLINED. ",
                data: response
              });
            })
            .catch((error) => {
              logger.error(
                `capturePayPalOrder - Adding payment details failed. ${error}`
              );
              reject({
                status: statusCode.Failure,
                message: error.message,
              });
            });
        } else {
          logger.info(`capturePayPalOrder - PayPal order captured failed.`);
          resolve({
            status: statusCode.Failure,
            message: "PayPal orderID capture Failed",
          });
        }
      })
      .catch((error) => {
        logger.error(
          `capturePayPalOrder - PayPal order capture failed. ${error}`
        );
        reject({
          status: statusCode.Failure,
          message: error.message,
        });
      });
  });

/**
 * This function to get all payment done.
 */
const getAllPaymentDetails = () =>
  new Promise((resolve, reject) => {
    logger.info(`getAllPaymentDetails - Payment details retrival started`);
    paymentDetailsModel
      .find({})
      .then((result) => {
        resolve({
          status: statusCode.Success,
          message: "Payment details retrived successfully.",
          data: result,
        });
      })
      .catch((error) => {
        logger.error(
          `getAllPaymentDetails - Get all payment details failed. ${error}`
        );
        reject({
          status: statusCode.Failure,
          message: error.message,
        });
      });
  });

const getPaypalSTC = (orderId) => new Promise((resolve, reject) => {

  const merchant_id = process.env.PAYPAL_MERCHANT_ID
  const tracking_id = orderId

  axios({
    url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en_US',
      'content-type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
    params: {
      grant_type: 'client_credentials',
    },
  })
    .then(result => {
      const accessToken = result.data.access_token
      const authorization = 'Bearer ' + accessToken

      const stcHeaders = {
        'Content-Type': 'application/json',
        'Authorization': authorization
      };

      const url = 'https://api-m.sandbox.paypal.com/v1/risk/transaction-contexts/' + merchant_id + '/' + tracking_id;
      axios({
        url: url,
        method: 'get',
        headers: stcHeaders,
      })
        .then(stcResult => {
          resolve({
            status: statusCode.Success,
            message: "Payment details retrived successfully.",
            data: stcResult.data,
          });
        })
        .catch(err => {
          logger.error(`getPaypalSTC - error getting getPaypalSTC call ${JSON.stringify(err, null, 2)}`);
          reject(internalError)
        })
    })
    .catch((error) => {
      logger.error(
        `getPaypalSTC - error getting getPaypalSTC call. ${error}`
      );
      reject({
        status: statusCode.internalError,
        message: error.message,
      });
    });


});



module.exports = {
  createPayPalOrder,
  capturePayPalOrder,
  getAllPaymentDetails,
  getPaypalSTC
};
