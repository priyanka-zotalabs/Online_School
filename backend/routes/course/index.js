// const express = require("express");
// const router = express.Router();
// var multer = require("multer");
// const { statusCode } = require("../../lib/constant");
// const randomstring = require("randomstring");
// const courseImagePath = "liveLearningClasses/course/images";
// const middleware = require("../../lib/middleware");
// const { role, space } = require("../../config/index");
// const addCtrl = require("../../controllers/course/add");
// const ackCtrl = require("../../controllers/course/acknowledge");
// const adminCtrl = require("../../controllers/course/admin");
// const studentCtrl = require("../../controllers/course/student");
// const teacherCtrl = require("../../controllers/course/teacher");
// const registerCtrl = require("../../controllers/course/register");
// const courseCtrl = require("../../controllers/course/course");
// const aws = require("aws-sdk");
// const multerS3 = require("multer-s3");

// const courseImagePrefix = randomstring.generate({
//   length: 12,
//   charset: "alphabetic",
// });

// const spacesEndpoint = new aws.Endpoint(space.endPoint);

// const s3 = new aws.S3({
//   accessKeyId: space.apiKey,
//   secretAccessKey: space.secretKey,
//   endpoint: spacesEndpoint,
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: space.bucket,
//     acl: "public-read",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function (request, file, cb) {
//       if (file.fieldname == "courseImage") {
//         cb(
//           null,
//           `${courseImagePath}/${courseImagePrefix}-${file.originalname}`
//         );
//       }
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   },
// }).fields([{ name: "courseImage", maxCount: 1 }]);

// /* Handle post to add course*/
// router.post(
//   "/",
//   middleware.isAuthenticated([role.TEACHER]),
//   (req, res, next) => {
//     addCtrl
//       .addCourse(req)
//       .then((result) => res.status(result.status).json(result))
//       .catch((error) => res.status(error.status).json(error));
//   }
// );

// /* Handle get courses for all courses
// (filter: PENDING,APPROVED,REJECTED,APPROVED/REJECTED, if nothing then all) 
// */
// router.get("/", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
//   adminCtrl
//     .getCourses(req.query)
//     .then((result) => {
//       res.status(result.status).json(result);
//     })
//     .catch((error) => {
//       res.status(error.status).json(error);
//     });
// });

// /* Handle get course for logged in teacher
// (filter: PENDING,APPROVED,REJECTED,APPROVED/REJECTED, if nothing then all) 
// */
// router.get(
//   "/teacher/courses",
//   middleware.isAuthenticated([role.TEACHER]),
//   (req, res) => {
//     teacherCtrl
//       .getTeacherCourses(req)
//       .then((result) => {
//         res.status(result.status).json(result);
//       })
//       .catch((error) => {
//         res.status(error.status).json(error);
//       });
//   }
// );

// /* Handle put for course approval */
// router.put(
//   "/approve",
//   middleware.isAuthenticated([role.ADMIN]),
//   upload,
//   (req, res, next) => {
//     try {
//       const file = req.files;
//       if (!file) {
//         res.status(400).send({
//           status: statusCode.InvalidData,
//           message: "No file is selected or Wrong file is selected.",
//         });
//       } else {
//         const courseCoverImage = {
//           basePath: file.courseImage[0].key,
//           fileName: file.courseImage[0].key.split("/")[
//             file.courseImage[0].key.split("/").length - 1
//           ],
//           url: file.courseImage[0].location,
//         };
//         ackCtrl
//           .approveCourse(req.body, courseCoverImage)
//           .then((result) => {
//             res.status(result.status).json(result);
//           })
//           .catch((error) => {
//             res.status(error.status).json(error);
//           });
//       }
//     } catch (error) {
//       res.status(400).send({
//         status: statusCode.InvalidData,
//         message: "Wrong file is selected.",
//       });
//     }
//   }
// );

// /* Handle put for course rejection */
// router.put("/reject", middleware.isAuthenticated([role.ADMIN]), (req, res) => {
//   ackCtrl
//     .rejectCourse(req.body)
//     .then((result) => {
//       res.status(result.status).json(result);
//     })
//     .catch((error) => {
//       res.status(error.status).json(error);
//     });
// });

// /* Handle get for upcoming courses
// if student is logged in then he will get the registered course flag as well
// */
// router.get("/upcomingCourse", (req, res) => {
//   studentCtrl
//     .upcomingCourses(req)
//     .then((result) => {
//       res.status(result.status).json(result);
//     })
//     .catch((error) => {
//       res.status(error.status).json(error);
//     });
// });

// /* Handle put for course registration */
// router.put(
//   "/registerCourse",
//   middleware.isAuthenticated([role.STUDENT]),
//   (req, res) => {
//     registerCtrl
//       .registerCourse(req)
//       .then((result) => {
//         res.status(result.status).json(result);
//       })
//       .catch((error) => {
//         res.status(error.status).json(error);
//       });
//   }
// );

// /* Handle get for registered courses for student */
// router.get(
//   "/registeredCourse",
//   middleware.isAuthenticated([role.STUDENT]),
//   (req, res) => {
//     registerCtrl
//       .getRegisteredCourses(req)
//       .then((result) => {
//         res.status(result.status).json(result);
//       })
//       .catch((error) => {
//         res.status(error.status).json(error);
//       });
//   }
// );

// /* Handle get for specific course for guest */
// router.get("/getSpecificCourse", (req, res) => {
//   courseCtrl
//     .getCourse(req.query)
//     .then((result) => {
//       res.status(result.status).json(result);
//     })
//     .catch((error) => {
//       res.status(error.status).json(error);
//     });
// });

// module.exports = router;
