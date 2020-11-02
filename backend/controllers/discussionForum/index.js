const _ = require("lodash");
const logger = require("../../lib/logger");
const discussionForumModel = require("../../models/database/discussionForum");
const userModel = require("../../models/database/user");
const { statusCode, internalError } = require("../../lib/constant");
const notificationController = require("../firebase");

// /**
//  * This fn is to validate the body received
//  * @param {Object} body
//  */
// const validateBody = (req) => {
//   const { body } = req;
//   if (!body.courseId) {
//     throw new Error("courseId not found");
//   }
//   if (!body.batchId) {
//     throw new Error("batchId not found");
//   }
//   if (!body.moduleId) {
//     throw new Error("moduleId not found");
//   }
//   if (!body.chapterId) {
//     throw new Error("chapterId not found");
//   }
//   if (!body.contentId) {
//     throw new Error("contentId not found");
//   }
//   if (!body.message) {
//     throw new Error("message not found");
//   }
//   if (!body.role) {
//     throw new Error("role not found");
//   }
//   return true;
// };
// /**
//  * This function is to get firebase tokens of users i.e receivers
//  * @param {Object} receiverIds
//  */
// const getUserFirebaseTokens = (receiverIds) =>
//   new Promise((resolve, reject) => {
//     userModel
//       .findOne({ _id: userId })
//       .then((result) => {
//         logger.info(`getUserFirebaseId - Fetching user firebase id.`);
//         resolve(result.firebaseTokenId);
//       })
//       .catch((error) => {
//         logger.error(
//           `getUserFirebaseId - Error while fetching user firebase id.`
//         );
//         reject(error);
//       });
//   });

// /**
//  * This fn is to add discussion into db
//  * @param {Object} req
//  */
// const addDiscussion = (req) =>
//   new Promise((resolve, reject) => {
//     try {
//       const { body } = req;
//       body.senderId = req.user._id;
//       validateBody(req);
//       let isMessageFromTutor = false;
//       if (body.role === "Student") {
//         body.imageUrl = req.user.userMetaData.Student.imageUrl;
//         body.name = req.user.userMetaData.Student.name;
//       }
//       else if (body.role === "Teacher") {
//         body.imageUrl = req.user.userMetaData.Teacher.imageUrl;
//         body.name = req.user.userMetaData.Teacher.name;
//         isMessageFromTutor = true;
//       }

//       let discussionForumObj = {
//         // courseId: body.courseId,
//         batchId: body.batchId,
//         contentId: body.contentId,
//         senderId: body.senderId,
//         messages:{
//           message: body.message,
//         }.  
//         imageUrl: body.imageUrl,


//         // messages: {
//         //   message: body.message,
//         //   senderDetails: {
//         //     senderId: body.senderId,
//         //     imageUrl: body.imageUrl,
//         //     name: body.name,
//         //     type: body.role,
//         //   },
//         },
//       };

//       discussionForumModel
//         .update(
//           {
//             courseId: body.courseId,
//             batchId: body.batchId,
//             moduleId: body.moduleId,
//             chapterId: body.chapterId,
//             contentId: body.contentId,
//           },
//           discussionForumObj
//         )
//         .then((result) => {
//           logger.info(`addDiscussion - POSTED discussion successful`);
//           let title = "";
//           if (isMessageFromTutor) {
//             title += "Message sent from Tutor";
//           } else {
//             title += "Message sent from Student";
//           }
//           var topic = body.courseId + body.batchId;
//           let firebaseObj = {
//             data: {
//               title: title,
//               senderId: req.user._id,
//               senderName: body.name,
//               senderType: body.role,
//               messageType: "DISCUSSIONS",
//               courseId: body.courseId,
//               moduleId: body.moduleId,
//               batchId: body.batchId,
//               chapterId: body.chapterId,
//               contentId: body.contentId,
//             },
//             notification: {
//               title: "Message from " + body.name,
//               body: body.message,
//             },
//             topic: topic
//           };

//           notificationController
//             .sendToTopic(firebaseObj, topic)
//             .then((results) => {
//               resolve({
//                 status: statusCode.Success,
//                 message:
//                   "Successfully added discussion and notifications sent.",
//               });
//             })
//             .catch((sendNotificationError) => {
//               const errObj = {
//                 status: statusCode.InvalidData,
//                 message: sendNotificationError.message,
//               };
//               reject(errObj);
//             });
//         })
//         .catch((error) => {
//           logger.error(`addDiscussion - error while parsing the body ${error}`);
//           const errObj = {
//             status: statusCode.InvalidData,
//             message: error.message,
//           };
//           reject(errObj);
//         });
//     } catch (e) {
//       logger.error(`addDiscussion - error while parsing the body ${e}`);
//       const errObj = {
//         status: statusCode.InvalidData,
//         message: e.message,
//       };
//       reject(errObj);
//     }
//   });

// /**
//  * This fn is to update discussion db
//  * @param {Object} req
//  */
// const updateDiscussion = (req) =>
//   new Promise((resolve, reject) => {
//     try {
//       const { body } = req;
//       body.senderId = req.user._id;
//       validateBody(req);
//       let isMessageFromTutor = false;
//       if (body.role === "Student") {
//         if (req.user.userMetaData.Student.imageUrl) {
//           body.imageUrl = req.user.userMetaData.Student.imageUrl;
//         }
//         else {
//           body.imageUrl = ""
//         }
//         body.name = req.user.userMetaData.Student.name;
//       }
//       else if (body.role === "Teacher") {
//         if (req.user.userMetaData.Teacher.imageUrl) {
//           body.imageUrl = req.user.userMetaData.Teacher.imageUrl;
//         }
//         else { body.imageUrl = "" }
//         body.name = req.user.userMetaData.Teacher.name;
//         isMessageFromTutor = true;
//       }

//       let message = {
//         messages: {
//           message: body.message,
//           senderDetails: {
//             senderId: body.senderId,
//             imageUrl: body.imageUrl,
//             name: body.name,
//             type: body.role,
//           },
//         },
//       };

//       discussionForumModel
//         .updateMessage(
//           {
//             courseId: body.courseId,
//             moduleId: body.moduleId,
//             chapterId: body.chapterId,
//             contentId: body.contentId,
//             batchId: body.batchId
//           },
//           message
//         )
//         .then((result) => {
//           logger.info(`updateDiscussion - message updation successful`);
//           let title = "";
//           if (isMessageFromTutor) {
//             title += "Message sent from Tutor";
//           } else {
//             title += "Message sent from Student";
//           }
//           var topic = body.courseId + body.batchId;
//           let firebaseObj = {
//             data: {
//               title: title,
//               senderId: req.user._id,
//               senderName: body.name,
//               senderType: body.type,
//               messageType: "DISCUSSIONS",
//               courseId: body.courseId,
//               moduleId: body.moduleId,
//               chapterId: body.chapterId,
//               contentId: body.contentId,
//             },
//             notification: {
//               title: "Message from " + req.user.userMetaData.name,
//               body: body.message,
//             },
//             topic: topic
//           };
//           notificationController
//             .sendToTopic(firebaseObj, topic)
//             .then((results) => {
//               resolve({
//                 status: statusCode.Success,
//                 message:
//                   "Successfully updated discussion and notification sent.",
//               });
//             })
//             .catch((sendNotificationError) => {
//               const errObj = {
//                 status: statusCode.InvalidData,
//                 message: sendNotificationError.message,
//               };
//               reject(errObj);
//             });
//         })
//         .catch((error) => {
//           logger.error(
//             `updateDiscussion - error while updating discussion ${error}`
//           );
//           const errObj = {
//             status: statusCode.InvalidData,
//             message: error.message,
//           };
//           reject(errObj);
//         });
//     } catch (e) {
//       logger.error(`updateDiscussion - error while parsing the body ${e}`);
//       const errObj = {
//         status: statusCode.InvalidData,
//         message: e.message,
//       };
//       reject(errObj);
//     }
//   });

/**
 * This fn is to get all the discussion messages from db
 */
const getAllDiscussions = (req) =>
  new Promise((resolve, reject) => {
    let { courseId, contentId, batchId } = req.query;
    discussionForumModel
      .findOne({
        courseId: courseId,
        contentId: contentId,
        batchId: batchId
      })
      .then((results) => {
        logger.info(`getAllDiscussions - retriving all the discussions.`);
        resolve({
          status: statusCode.Success,
          message: "Successfully retrived all the discussions",
          data: results,
        });
      })
      .catch((chatError) => {
        logger.error(
          `getAllDiscussions - Error while retriving the discussions ${chatError}`
        );
        const errObj = {
          status: statusCode.InvalidData,
          message: e.message,
        };
        reject(errObj);
      });
  });

module.exports = {
  // addDiscussion,
  getAllDiscussions
  // updateDiscussion,
};
