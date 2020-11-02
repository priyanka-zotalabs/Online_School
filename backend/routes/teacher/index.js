const express = require('express');
const router = express.Router();
const teacherCtrl = require('../../controllers/teacher/index');
const middleware = require('../../lib/middleware');
const { role } = require('../../config/index');
const batchStudentCtrl = require('../../controllers/teacher/batchStudent');


/* Handle get profile */
router.get('/profile', middleware.isAuthenticated([role.TEACHER]),  (req, res) => {
    teacherCtrl.getProfile(req.user)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

/* Handle create Profile */
router.put('/profile', middleware.isAuthenticated([role.TEACHER]),  (req, res) => {
    teacherCtrl.updateProfile(req.body,req.user)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

/* Handle get getTeachersBatchWiseStudent */
router.get('/batchWiseStudent', middleware.isAuthenticated([role.TEACHER]),  (req, res) => {
    batchStudentCtrl.getTeachersBatchWiseStudent(req)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});


module.exports = router;