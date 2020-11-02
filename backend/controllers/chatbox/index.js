const _ = require("lodash");
const logger = require("../../lib/logger");
const chatboxModel = require("../../models/database/chatbox");
const userModel = require("../../models/database/user");
const { statusCode, internalError } = require("../../lib/constant");
const notificationController = require("../firebase");

/**
 * This fn is to validate the body received
 * @param {Object} body
 */
const validateBody = (req) => {
  const { body } = req;
  if (!body.senderId) {
    throw new Error("senderId not found");
  }
  if (!body.receiverId) {
    throw new Error("receiverId not found");
  }
  if (!body.message) {
    throw new Error("message not found");
  }
  return true;
};

/**
 * This functionis to get firebase id of user
 * @param {Object} userId
 */
const getUserFirebaseId = (userId) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({ _id: userId })
      .then((result) => {
        logger.info(`getUserFirebaseId - Fetching user firebase id.`);
        resolve(result.firebaseTokenId);
      })
      .catch((error) => {
        logger.error(
          `getUserFirebaseId - Error while fetching user firebase id.`
        );
        reject(error);
      });
  });

/**
 * This fn is to add chat into db
 * @param {Object} req
 */
const addChat = (req) =>
  new Promise((resolve, reject) => {
    const { body } = req;
    try {
      validateBody(req);

      let isMessageFromTutor = true;
      if (req.user.roleId.displayName === "Student") {
        isMessageFromTutor = false;
      }

      let chatboxObj1 = {
        senderId: body.senderId,
        receiverId: body.receiverId,
        messages: {
          message: body.message,
          name: req.user.userMetaData.name,
          isMessageFromTutor: isMessageFromTutor,
        },
      };

      let chatboxObj2 = {
        senderId: body.receiverId,
        receiverId: body.senderId,
        messages: {
          message: body.message,
          name: req.user.userMetaData.name,
          isMessageFromTutor: isMessageFromTutor,
        },
      };

      let process = [
        chatboxModel.addMultiple(chatboxObj1),
        chatboxModel.addMultiple(chatboxObj2),
      ];

      Promise.all(process)
        .then((result) => {
          logger.info(`addCourse - course addition successful`);
          let title = "";
          if (isMessageFromTutor) {
            title += "Message sent from Tutor";
          } else {
            title += "Message sent from Student";
          }
          getUserFirebaseId(body.receiverId)
            .then((firebaseTokens) => {
              if (firebaseTokens.length > 0) {
                let firebaseObj = {
                  data: {
                    title: title,
                    senderId: body.senderId,
                    senderType: req.user.roleId.displayName,
                    messageType: "CHAT",
                  },
                  notification: {
                    title: "Message from " + req.user.userMetaData.name,
                    body: body.message,
                  },
                  tokens: firebaseTokens,
                };

                notificationController
                  .sendNotification(firebaseObj)
                  .then((result) => {
                    resolve({
                      status: statusCode.Success,
                      message:
                        "Successfully added chat and push notification sent.",
                    });
                  })
                  .catch((notificationError) => {
                    logger.error(
                      `addChat -- Error while sending push notification ${notificationError}`
                    );
                    const errObj = {
                      status: statusCode.InvalidData,
                      message: notificationError.message,
                    };
                    reject(errObj);
                  });
              } else {
                resolve({
                  status: statusCode.Success,
                  message:
                    "Successfully added chat but push notification not sent.",
                });
              }
            })
            .catch((getTokenError) => {
              logger.error(
                `addChat -- Error while getting firebase token ${getTokenError}`
              );
              const errObj = {
                status: statusCode.InvalidData,
                message: getTokenError.message,
              };
              reject(errObj);
            });
        })
        .catch((error) => {
          logger.error(`addCourse - error while parsing the body ${error}`);
          const errObj = {
            status: statusCode.InvalidData,
            message: error.message,
          };
          reject(errObj);
        });
    } catch (e) {
      logger.error(`addCourse - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

/**
 * This fn is to add chat specific to student and teacher id into specific document in db
 * @param {Object} req
 */
const updateChat = (req) =>
  new Promise((resolve, reject) => {
    const { body } = req;
    try {
      validateBody(req);
      let isMessageFromTutor = true;
      if (req.user.roleId.displayName === "Student") {
        isMessageFromTutor = false;
      }

      let message = {
        message: body.message,
        name: req.user.userMetaData.name,
        isMessageFromTutor: isMessageFromTutor,
      };

      let process = [
        chatboxModel.updateMessage(
          { senderId: body.senderId, receiverId: body.receiverId },
          message
        ),
        chatboxModel.updateMessage(
          { senderId: body.receiverId, receiverId: body.senderId },
          message
        ),
      ];

      Promise.all(process)
        .then((result) => {
          logger.info(`updateChat - message addition successful`);
          let title = "";
          if (isMessageFromTutor) {
            title += "Message sent from Tutor";
          } else {
            title += "Message sent from Student";
          }
          getUserFirebaseId(body.receiverId)
            .then((firebaseTokens) => {
              if (firebaseTokens.length > 0) {
                let firebaseObj = {
                  data: {
                    title: title,
                    senderId: body.senderId,
                    senderType: req.user.roleId.displayName,
                    messageType: "CHAT",
                  },
                  notification: {
                    title: "Message from " + req.user.userMetaData.name,
                    body: body.message,
                  },
                  tokens: firebaseTokens,
                };

                notificationController
                  .sendNotification(firebaseObj)
                  .then((result) => {
                    resolve({
                      status: statusCode.Success,
                      message:
                        "Successfully added chat and push notification sent.",
                    });
                  })
                  .catch((notificationError) => {
                    logger.error(
                      `addChat -- Error while sending push notification ${notificationError}`
                    );
                    const errObj = {
                      status: statusCode.InvalidData,
                      message: notificationError.message,
                    };
                    reject(errObj);
                  });
              } else {
                resolve({
                  status: statusCode.Success,
                  message:
                    "Successfully added chat but push notification not sent.",
                });
              }
            })
            .catch((getTokenError) => {
              logger.error(
                `updateChat -- Error while getting firebase token ${getTokenError}`
              );
              reject(notificationError);
            });
        })
        .catch((error) => {
          logger.error(`updateChat - error while adding message ${error}`);
          const errObj = {
            status: statusCode.InvalidData,
            message: error.message,
          };
          reject(errObj);
        });
    } catch (e) {
      logger.error(`updateChat - error while parsing the body ${e}`);
      const errObj = {
        status: statusCode.InvalidData,
        message: e.message,
      };
      reject(errObj);
    }
  });

/**
 * This fn is to get all chat messages from db
 */
const getAllChats = (req) =>
  new Promise((resolve, reject) => {
    let { senderId, receiverId } = req.query;
    chatboxModel
      .find({ senderId: senderId, receiverId: receiverId })
      .then((results) => {
        logger.info(`getAllChats - retriving all the chats.`);
        resolve({
          status: statusCode.Success,
          message: "Successfully retrived all the chats",
          data: results,
        });
      })
      .catch((chatError) => {
        logger.error(
          `getAllChats - Error while retriving the chats ${chatError}`
        );
        const errObj = {
          status: statusCode.InvalidData,
          message: e.message,
        };
        reject(errObj);
      });
  });

module.exports = {
  addChat,
  getAllChats,
  updateChat,
};
