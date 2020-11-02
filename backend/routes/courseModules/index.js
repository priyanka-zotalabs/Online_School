const express = require("express");
const router = express.Router();
const { statusCode } = require("../../lib/constant");
const middleware = require("../../lib/middleware");
const { role, space } = require("../../config/index");
const createCtrl = require("../../controllers/courseModules/create");
const updateCtrl = require("../../controllers/courseModules/update");
const teacherCtrl = require("../../controllers/courseModules/teacher");
const registerCtrl = require("../../controllers/courseModules/register");
const scheduleCtrl = require("../../controllers/courseModules/schedule");
const courseCtrl = require("../../controllers/courseModules/course");
const deleteCtrl = require("../../controllers/courseModules/delete");
const bbbScheduleCtrl = require("../../controllers/courseModules/bbbSchedule");

/**
 * Handle create Course
 */
router.post(
  "/",
  middleware.isAuthenticated([role.TEACHER]),
  (req, res, next) => {
    createCtrl
      .createCourse(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);
/**
 * Handle Update Course
 */
router.put(
  "/",
  middleware.isAuthenticated([role.TEACHER]),
  (req, res, next) => {
    updateCtrl
      .updateCourse(req.body)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/**
 * Handle Delete Course
 */
router.delete(
  "/",
  middleware.isAuthenticated([role.TEACHER]),
  (req, res, next) => {
    deleteCtrl
      .deleteCourse(req.query)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

router.post(
  "/scheduleMeeting",
  middleware.isAuthenticated([role.TEACHER]),
  (req, res, next) => {
    scheduleCtrl
      .create(req.body)
      .then((result) => res.status(result.status).json(result))
      .catch((error) => res.status(error.status).json(error));
  }
);

router.post(
  "/addToken",
  middleware.isAuthenticated([role.TEACHER]),
  (req, res, next) => {
    scheduleCtrl
      .addFirstToken(req.body)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

router.post(
  "/scheduleMeeting",
  middleware.isAuthenticated([role.TEACHER]),
  (req, res, next) => {
    scheduleCtrl
      .create(req.body)
      .then((result) => res.status(result.status).json(result))
      .catch((error) => res.status(error.status).json(error));
  }
);

/* Handle get course for logged in teacher
 */
router.get(
  "/teacher/courses",
  middleware.isAuthenticated([role.TEACHER]),
  (req, res) => {
    teacherCtrl
      .getTeacherCourses(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/* Handle get All courses
 */
router.get("/getAllDBCourses", (req, res) => {
  courseCtrl
    .getAllCourse(req)
    .then((result) => {
      res.status(result.status).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
});

/* Handle put for course registration */
router.put(
  "/registerCourse",
  middleware.isAuthenticated([role.STUDENT]),
  (req, res) => {
    registerCtrl
      .registerCourse(req)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/* Handle get for registered courses for student */
router.get(
  "/registeredCourse",
  middleware.isAuthenticated([role.STUDENT]),
  (req, res) => {
    registerCtrl
      .getRegisteredCourses(req)
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
  middleware.isAuthenticated([role.TEACHER]),
  (req, res, next) => {
    teacherCtrl
      .getRegisteredStudents()
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

/* Handle get create bbbSchedule
 */
router.post(
  "/teacher/bbbSchedule",
  middleware.isAuthenticated([role.TEACHER]),
  (req, res) => {
    bbbScheduleCtrl
      .bbbSchedule(req.body, req.user)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  }
);

module.exports = router;
