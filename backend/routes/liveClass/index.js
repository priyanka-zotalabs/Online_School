const express = require('express');
const router = express.Router();
const middleware = require('../../lib/middleware');
const { role } = require('../../config/index');
const liveClassStudentCtrl = require('../../controllers/liveClass/student')
const liveClassTeacherCtrl = require('../../controllers/liveClass/teacher')
const liveClassGuestCtrl = require('../../controllers/liveClass/guest')
const scheduleCtrl = require('../../controllers/liveClass/schedule')

router.get('/student/join',
    middleware.isAuthenticated([role.STUDENT]),
    (req, res) => {
        liveClassStudentCtrl.joinClass(req)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });

router.get('/teacher/create', middleware.isAuthenticated([role.TEACHER]), (req, res) => {
    liveClassTeacherCtrl.createTeacherClass(req)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

router.post('/guest/join', (req, res) => {
    liveClassGuestCtrl.joinGuestClass(req.body)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

router.get('/allDBSchedule', 
// middleware.isAuthenticated([role.TEACHER]),
 (req, res) => {
    scheduleCtrl.getAllSchedule(req)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

router.get('/teacherSchedule', 
middleware.isAuthenticated([role.TEACHER]),
 (req, res) => {
    scheduleCtrl.teacherSchedule(req)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});


router.get('/studentSchedule', 
middleware.isAuthenticated([role.STUDENT]),
 (req, res) => {
    scheduleCtrl.studentSchedule(req)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});


module.exports = router;