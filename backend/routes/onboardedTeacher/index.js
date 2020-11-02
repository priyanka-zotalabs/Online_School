const express = require('express');
const router = express.Router();
const onboardedTeacherCtrl = require('../../controllers/onboardedTeacher/index');
const middleware = require('../../lib/middleware');
const { role } = require('../../config/index');

/* Handle Add Teachers */
router.post('/addTeacher', 
// middleware.isAuthenticated([role.ADMIN]), 
 (req, res) => {
    onboardedTeacherCtrl.addTeacher(req.body,req.user)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

/* Handle Get All Onborded Teachers */
router.get('/getOnbordedTeacher', 
// middleware.isAuthenticated([role.ADMIN]), 
 (req, res) => {
    onboardedTeacherCtrl.getAllOnbordedTeacher(req.user)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

module.exports = router;