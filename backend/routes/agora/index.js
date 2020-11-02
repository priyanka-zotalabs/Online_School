const express = require('express');
const router = express.Router();
const middleware = require('../../lib/middleware');
const { role } = require('../../config/index');
const teacherTokenCtrl = require('../../controllers/agora/teacherToken')
const studentTokenCtrl = require('../../controllers/agora/studentToken')
const scheduleCtrl = require('../../controllers/agora/schedule');
const teacherScheduleCtrl = require('../../controllers/agora/teacherSchedule')
const studentScheduleCtrl = require('../../controllers/agora/studentSchedule')


router.get('/teacherToken',
    // middleware.isAuthenticated([role.STUDENT]),
    (req, res) => {
        teacherTokenCtrl.generateRtcToken(req)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });

router.get('/studentToken',
    // middleware.isAuthenticated([role.STUDENT]),
    (req, res) => {
        studentTokenCtrl.generateRtcToken(req)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });

router.post('/schedule',
    middleware.isAuthenticated([role.TEACHER]),
    (req, res) => {
        scheduleCtrl.agoraSchedule(req)
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
        teacherScheduleCtrl.teacherAgoraSchedule(req)
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
        studentScheduleCtrl.studentAgoraSchedule(req)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });




module.exports = router;