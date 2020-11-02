// const express = require("express");
// const router = express.Router();
// const { statusCode } = require("../../lib/constant");
// var multer = require("multer");
// const randomstring = require("randomstring");
// const applyTeacherCtrl = require('../../controllers/teacher/teacherInterview');
// const updateTeacherInterviewCtrl = require('../../controllers/teacher/teacherInterview');
// const resumePath = "liveLearningClasses/teacherResume"
// const internetSpeedScreenshotPath = "liveLearningClasses/internetSpeedScreenshot"
// const middleware = require('../../lib/middleware');
// const { role,space } = require('../../config/index')
// const aws = require('aws-sdk');
// const multerS3 = require('multer-s3');

// const resumePrefix = randomstring.generate({
//     length: 12,
//     charset: "alphabetic",
// });
// const speedScreenshotPrefix = randomstring.generate({
//     length: 12,
//     charset: "alphabetic",
// });
// const spacesEndpoint = new aws.Endpoint(space.endPoint);

// const s3 = new aws.S3({
//     accessKeyId: space.apiKey,
//     secretAccessKey: space.secretKey,
//     endpoint: spacesEndpoint
// });
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: space.bucket,
//         acl: 'public-read',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         key: function (request, file, cb) {
//             if (file.fieldname == "resume") {
//                 cb(null, `${resumePath}/${resumePrefix}-${file.originalname}`);
//             }
//             if (file.fieldname == "speedScreenshot") {
//                 cb(null, `${internetSpeedScreenshotPath}/${speedScreenshotPrefix}-${file.originalname}`);
//             }
//         }
//     })
// }).fields([
//     { name: "resume", maxCount: 1 },
//     { name: "speedScreenshot", maxCount: 1 },
// ])

// /* Handle POST  Apply teachers */
// router.post(
//     "/apply",
//     upload,
//     (req, res, next) => {
//         try {
//             const files = req.files;
//             if (!files || !files.speedScreenshot) {
//                 res.status(400).send({
//                     status: statusCode.InvalidData,
//                     message: "No file is selected or Wrong file is selected.",
//                 });
//             } else {
//                 const resume = files.resume ? {
//                     basePath: files.resume[0].key, fileName:
//                         files.resume[0].key.split('/')[files.resume[0].key.split('/').length - 1],
//                         url:files.resume[0].location
//                 } : {};
//                 const internetSpeedScreenshot = {
//                     basePath: files.speedScreenshot[0].key, fileName:
//                         files.speedScreenshot[0].key.split('/')[files.speedScreenshot[0].key.split('/').length - 1],
//                         url:files.speedScreenshot[0].location
//                 };
//                 applyTeacherCtrl.applyTeacher(req, resume, internetSpeedScreenshot)
//                     .then((result) => {
//                         res.status(result.status).json(result);
//                     })
//                     .catch((error) => {
//                         res.status(error.status).json(error);
//                     });
//             }
//         } catch (error) {
//             res.status(400).send({
//                 status: statusCode.InvalidData,
//                 message:
//                     "Wrong file is selected.",
//             });
//         }
//     }
// );

// /* Handle get All Apply teachers */
// router.get('/apply', middleware.isAuthenticated([role.ADMIN]), (req, res, next) => {
//     applyTeacherCtrl.getApplyTeacher(req.query)
//         .then(result => res.status(result.status).json(result))
//         .catch(error => res.status(error.status).json(error))
// });


// /* Handle get logged in teachers apply now form*/
// router.get('/myStatus', middleware.isAuthenticated([role.TEACHER]), (req, res, next) => {
//     applyTeacherCtrl.getApplyTeacher(req.user)
//         .then(result => res.status(result.status).json(result))
//         .catch(error => res.status(error.status).json(error))
// });

// /* Handle approve teacher Interview */
// router.put('/approve', middleware.isAuthenticated([role.ADMIN]), (req, res, next) => {
//     status = "APPROVED"
//     updateTeacherInterviewCtrl.updateTeacherInterview(req.body, status)
//         .then(result => {
//             res.status(result.status).json(result);
//         })
//         .catch(error => {
//             res.status(error.status).json(error);
//         })
// });

// /* Handle reject teacher Interview */
// router.put('/reject', middleware.isAuthenticated([role.ADMIN]), (req, res, next) => {
//     status = "REJECTED"
//     updateTeacherInterviewCtrl.updateTeacherInterview(req.body, status)
//         .then(result => {
//             res.status(result.status).json(result);
//         })
//         .catch(error => {
//             res.status(error.status).json(error);
//         })
// });
// module.exports = router;