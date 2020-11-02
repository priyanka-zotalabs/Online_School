const express = require('express');
const router = express.Router();
const onboardingTeacherCtrl = require('../../controllers/teacherOnboarding/teacher');
const teacherChangePasswordCtrl = require('../../controllers/teacherOnboarding/teacherChangePassword');
const getTeacherCtrl = require('../../controllers/admin/teachers')

const middleware = require('../../lib/middleware');
const { role } = require('../../config/index');

/* Handle Add Teachers */
router.post('/',
    middleware.isAuthenticated([role.ADMIN]),
    (req, res) => {
        onboardingTeacherCtrl.teacherOnboarding(req.body, req.user)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });

/* Handle firstLoginChangePassword */
router.post('/firstLoginChangePassword',
    middleware.isAuthenticated([role.TEACHER]),
    (req, res) => {
        console.log(req.user)
        teacherChangePasswordCtrl.firstLoginChangePassword(req.body, req.user)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });

/* Handle Get All Onborded Teachers */
router.get('/',
    middleware.isAuthenticated([role.ADMIN]),
    (req, res) => {
        getTeacherCtrl.getTeachers(req)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });

module.exports = router;