// const zotalabs = require("../../lib/firebase-properties");
// const userModel = require("../../models/database/user");
// const logger = require("../../lib/logger");
// const { statusCode, internalError } = require("../../lib/constant");

// const sendNotification = (message) =>
//   new Promise((resolve, reject) => {
//     try {
//       zotalabs.eumetry
//         .messaging()
//         .sendMulticast(message)
//         .then((response) => {
//           if (response.failureCount > 0) {
//             const failedTokens = [];
//             response.responses.forEach((resp, idx) => {
//               if (!resp.success) {
//                 failedTokens.push(registrationTokens[idx]);
//               }
//             });

//             deleteFirebaseToken(failedTokens);
//             const result = {
//               status: statusCode.Success,
//               message: "Tokens deleted successfully",
//             };
//             resolve(result);
//           } else {
//             const result = {
//               status: statusCode.Success,
//               message: "Message sent successfully",
//               successCount: response.successCount,
//             };
//             resolve(result);
//           }
//         })
//         .catch((error) => {
//           logger.error(
//             ` sendNotification - Error sending message:' - error:${JSON.stringify(
//               error,
//               null,
//               2
//             )}`
//           );
//           reject(internalErrorObj);
//         });
//     } catch (err) {
//       logger.error(`sendNotification -- Error while sending notifications ${err}`);
//       next(err);
//     }
//   });

// const deleteFirebaseToken = (data) =>
//   new Promise((resolve, reject) => {
//     userModel
//       .deleteToken(data)
//       .then((result) => {
//         logger.info(`storeFirebaseToken  - Token stored successfully`);
//         const response = {
//           status: statusCode.Success,
//           message: "Tokens deleted successfully",
//         };
//         resolve(response);
//       })
//       .catch((deleteError) => {
//         logger.error(
//           `storeFirebaseToken  - error:${JSON.stringify(deleteError, null, 2)}`
//         );
//         reject(internalErrorObj);
//       });
//   });

// const validateBody = (body) => {
//   if (!body.tokenId) {
//     throw new Error("token not found");
//   }
//   return true;
// };

// const storeFirebaseToken = (req) =>
//   new Promise((resolve, reject) => {
//     try {
//       validateBody(req.body);
//       const token = req.body.tokenId;
//       const id = req.user._id;
//       const tokenDetails = {
//         firebaseTokenId: token,
//       };
//       if (req.session.firebaseToken == token) {
//         reject({
//           status: statusCode.InvalidData,
//           message: "Token already saved",
//         });
//       } else {
//         userModel
//           .addToken({ _id: id }, tokenDetails)
//           .then((result) => {
//             logger.info(`storeFirebaseToken  - Token stored successfully`);
//             const response = {
//               status: statusCode.Success,
//               message: "Token stored successfully",
//             };
//             req.session.firebaseToken = token;
//             subscribeTopic(token);
//             resolve(response);
//           })
//           .catch((registerError) => {
//             logger.error(
//               `storeFirebaseToken  - error:${JSON.stringify(
//                 registerError,
//                 null,
//                 2
//               )}`
//             );
//             reject(internalErrorObj);
//           });
//       }
//     } catch (e) {
//       logger.error(`storeFirebaseToken  - error while parsing the body ${e}`);
//       const errObj = {
//         status: statusCode.InvalidData,
//         message: e.message,
//       };
//       reject(errObj);
//     }
//   });

// const deleteTokenLogout = (req) =>
//   new Promise((resolve, reject) => {
//     const id = req.user._id;
//     const tokenDetails = req.session.firebaseToken;
//     userModel
//       .deleteLogoutToken({ _id: id }, tokenDetails)
//       .then((result) => {
//         logger.info(`deleteTokenLogout  - Token deleted successfully`);
//         const response = {
//           status: statusCode.Success,
//           message: "Tokens deleted successfully",
//         };
//         unsubscribeTopic(tokenDetails);
//         resolve(response);
//       })
//       .catch((deleteError) => {
//         logger.error(
//           `deleteTokenLogout  - error:${JSON.stringify(deleteError, null, 2)}`
//         );
//         reject(internalErrorObj);
//       });
//   });

// const subscribeTopic = (data) =>
//   new Promise((resolve, reject) => {
//     try {
//       const registrationTokens = [data];
//       const topic = "BRYAN";

//       zotalabs.eumetry
//         .messaging()
//         .subscribeToTopic(registrationTokens, topic)
//         .then((response) => {
//           if (response.failureCount > 0) {
//             logger.error(`Error subscribing to topic ${topic}`);
//           } else {
//             logger.info(`Successfully subscribed to topic ${topic}`);
//             const result = {
//               status: statusCode.Success,
//               message: "Tokens subscribed successfully",
//             };
//             resolve(result);
//           }
//         })
//         .catch((error) => {
//           logger.error(`Error subscribing to topic ${topic} - ${error}`);
//           reject(error);
//         });
//     } catch (e) {
//       logger.error(`subscribeTopic  - error while parsing the body ${e}`);
//       const errObj = {
//         status: statusCode.InvalidData,
//         message: e.message,
//       };
//       reject(errObj);
//     }
//   });

// /**
//  * send notifications to users subscribed in a particular topic
//  * @param {Object} payload
//  * @param {Object} topic
//  */
// const sendToTopic = (payload, topic) =>
//   new Promise((resolve, reject) => {
//     try {
//       /* var payload = {
//         notification: {
//           title: "NASDAQ News",
//           body: "The NASDAQ climbs for the second day. Closes up 0.60%.",
//         },
//       };

//       var topic = "Brian"; */

//       zotalabs.eumetry
//         .messaging()
//         .sendToTopic(topic, payload)
//         .then((response) => {
//           logger.info(`Successfully sent message -- ${response}`);
//           const result = {
//             status: statusCode.Success,
//             message: "Message sent successfully",
//             successCount: response.successCount,
//           };
//           resolve(result);
//         })
//         .catch((error) => {
//           logger.info(`Error sending message --  ${error}`);
//           const result = {
//             status: statusCode.Success,
//             message: error.message,
//           };
//           resolve(result);
//         });
//     } catch (e) {
//       logger.error(`sendToTopic  - error while parsing the body ${e}`);
//       const errObj = {
//         status: statusCode.InvalidData,
//         message: e.message,
//       };
//       reject(errObj);
//     }
//     // var topic = 'finance';

//     // var message = {
//     //     data: {
//     //         score: '850',
//     //         time: '2:45'
//     //     },
//     //     topic: topic
//     // };

//     // // Send a message to devices subscribed to the provided topic.
//     // zotalabs.eumetry.messaging().send(message)
//     //     .then((response) => {
//     //         // Response is a message ID string.
//     //         console.log('Successfully sent message:', response);
//     //     })
//     //     .catch((error) => {
//     //         console.log('Error sending message:', error);
//     //     });
//   });

// const unsubscribeTopic = (data) =>
//   new Promise((resolve, reject) => {
//     try {
//       var registrationTokens = [data];
//       var topic = "Brian";

//       zotalabs.eumetry
//         .messaging()
//         .unsubscribeFromTopic(registrationTokens, topic)
//         .then((response) => {
//           logger.info(`Successfully unsubscribed to topic - ${response}`);
//           const result = {
//             status: statusCode.Success,
//             message: "Tokens unsubscribed successfully",
//           };
//           resolve(result);
//         })
//         .catch((error) => {
//           logger.error(`Error unsubscribing to topic -- ${error}`);
//           reject(error);
//         });
//     } catch (e) {
//       logger.error(`unsubscribeTopic  - error while parsing the body ${e}`);
//       const errObj = {
//         status: statusCode.InvalidData,
//         message: e.message,
//       };
//       reject(errObj);
//     }
//   });

// module.exports = {
//   sendNotification,
//   storeFirebaseToken,
//   deleteFirebaseToken,
//   deleteTokenLogout,
//   subscribeTopic,
//   sendToTopic,
//   unsubscribeTopic,
// };
