const express = require('express');
const router = express.Router();
const middleware = require('../../lib/middleware');
const { role } = require('../../config/index');

const  teacherRoleCtrl = require('../../controllers/role/teacher');


/* Handle get role */
router.get('/:code?', (req, res, next) => {
    roleCtrl.getRole(req.params)
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

router.put('/add/teacherRole',
 middleware.isAuthenticated([role.ADMIN]),
  (req, res) => {
    teacherRoleCtrl.addTeacherRole(req)
    // roleCtrl.getRole(req.params)

        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

module.exports = router;