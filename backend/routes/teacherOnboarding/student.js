const express = require('express');
const router = express.Router();
const onboardingstudentCtrl = require('../../controllers/teacherOnboarding/student');
const changePasswordCtrl = require('../../controllers/teacherOnboarding/teacherChangePassword');
const getstudentCtrl =require('../../controllers/admin/students')

const middleware = require('../../lib/middleware');
const { role } = require('../../config/index');

/* Handle Add students */
router.post('/',
    middleware.isAuthenticated([role.ADMIN,role.TEACHER]), 
    (req, res) => {
        console.log(req.user)
        onboardingstudentCtrl.studentOnboarding(req.body, req.user)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });

/* Handle firstLoginChangePassword */
router.post('/firstLoginChangePassword',
    middleware.isAuthenticated([role.STUDENT]), 
    (req, res) => {
        console.log(req.user)
        changePasswordCtrl.firstLoginChangePassword(req.body, req.user)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });

/* Handle Get All Onborded students */
router.get('/', 
middleware.isAuthenticated([role.ADMIN,role.TEACHER]), 
 (req, res) => {
    getstudentCtrl.getstudent(req)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

module.exports = router;