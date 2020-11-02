const express = require("express");
const middleware = require("../../lib/middleware");
const { role } = require("../../config/index");
const studentCtrl = require("../../controllers/student/index");
const adminSignupCtrl = require('../../controllers/admin/signUp');
const instituteCtrl = require('../../controllers/admin/institute');
const updateInstituteCtrl = require('../../controllers/admin/updateInstitute');
const getTeacherCtrl = require('../../controllers/admin/teachers')
const instituteCoursesCtrl = require('../../controllers/admin/instituteCourses')
const instituteScheduleCtrl = require('../../controllers/liveClass/schedule')



const router = express.Router();

/* Handle get student */
router.get("/",
  middleware.isAuthenticated([role.ADMIN]),
  (req, res, next) => {
    res.status(200).json(req.user);
  });


/* Handle signup POST */
router.post('/signup', (req, res, next) => {
  // res.status(200).json(req.user);

  adminSignupCtrl.adminSignUp(req.body)
    .then(result => res.status(result.status).json(result))
    .catch(error => res.status(error.status).json(error))
});

/* Handle get Institute Profile */
router.get(
  "/instituteProfile",
  middleware.isAuthenticated([role.ADMIN]),
  (req, res, next) => {
    instituteCtrl
      .getinstitutes(req.user)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/* Handle get Institute Profile */
router.put(
  "/updateInstituteProfile",
  middleware.isAuthenticated([role.ADMIN]),
  (req, res, next) => {
    updateInstituteCtrl
      .updateInstituteProfile(req.body, req.user)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

// /* Handle get all Students */
// router.get(
//   "/instituteProfile",
//   middleware.isAuthenticated([role.ADMIN]),
//   (req, res, next) => {
//     instituteCtrl
//     .getinstitutes()
//     // studentCtrl
//     //   .getAllStudents()
//       .then((result) => {
//         res.status(result.status).json(result);
//       })
//       .catch((error) => {
//         res.status(error.status).json(error);
//       });
//   }
// );

/* Handle get all Students */
router.get(
  "/student",
  middleware.isAuthenticated([role.ADMIN]),
  (req, res, next) => {
    studentCtrl
      .getAllStudents()
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/* Handle get all course registered Students */
router.get(
  "/registeredStudents",
  middleware.isAuthenticated([role.ADMIN]),
  (req, res, next) => {
    studentCtrl
      .getRegisteredStudents()
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/* Handle  get All teacher whose status is COMPLETED */
router.get(
  "/instituteTeachers",
  middleware.isAuthenticated([role.ADMIN]),
  (req, res, next) => {
    getTeacherCtrl
      .instituteTeachers(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/* Handle  get All courses for Institute */
router.get(
  "/instituteCourses",
  middleware.isAuthenticated([role.ADMIN]),
  (req, res, next) => {
    instituteCoursesCtrl
      .getInstituteCourses(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/* Handle  get All Schedule for Institute */
router.get(
  "/instituteSchedule",
  middleware.isAuthenticated([role.ADMIN]),
  (req, res, next) => {
    instituteScheduleCtrl
      .instituteSchedule(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

module.exports = router;
