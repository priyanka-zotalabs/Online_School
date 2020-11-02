
const express = require('express');
const router = express.Router();

const middleware = require('../../lib/middleware');
const { role } = require('../../config/index')
const studentCtrl = require('../../controllers/student/index');
const studentCourseCtrl = require('../../controllers/student/myCourses');
const studentAllBatchesTeachersCtrl = require('../../controllers/student/batchTeachers');



/* Handle get profile */
router.get('/profile',
    middleware.isAuthenticated([role.STUDENT]),
    (req, res) => {
        studentCtrl.getProfile(req.user)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });


/* Handle Edit Student Profile */
router.put('/profile',
    middleware.isAuthenticated([role.STUDENT]),
    (req, res, next) => {
        studentCtrl.updateProfile(req.body, req.user)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });


/* Handle Edit Student Profile */
router.get('/myCourses',
    middleware.isAuthenticated([role.STUDENT]),
    (req, res, next) => {
        studentCourseCtrl.getStudentCourses(req)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });
/* Handle get profile */
router.get('/searchProfile',
    middleware.isAuthenticated([role.TEACHER, role.ADMIN]),
    (req, res) => {
        studentCtrl.searchProfile(req)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });

    /* Handle get studentBatchwiseTeachers */
router.get('/studentBatchWiseTeachers',
middleware.isAuthenticated([role.STUDENT]),
(req, res) => {
    studentAllBatchesTeachersCtrl.getStudentAllBatchesTeachers(req)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

module.exports = router;