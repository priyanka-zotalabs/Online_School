const express = require('express');
const router = express.Router();
const onboardingstudentCtrl = require('../../controllers/studentOnboarding/student');
const changePasswordCtrl = require('../../controllers/studentOnboarding/studentChangePassword');
const getstudentCtrl = require('../../controllers/admin/students')
const bulkOnBoardingstudentCtrl = require('../../controllers/studentOnboarding/bulkOnBoarding');
const { statusCode, internalError } = require('../../lib/constant');
const middleware = require('../../lib/middleware');
const { role } = require('../../config/index');
const path = require('path')
const multer = require('multer')
const upload = multer()

/* Handle Add students */
router.post('/',
    middleware.isAuthenticated([role.ADMIN, role.TEACHER]),
    (req, res) => {
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
    middleware.isAuthenticated([role.ADMIN, role.TEACHER]),
    (req, res) => {
        getstudentCtrl.getStudents(req)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });

/* Handle Get All Onborded students */
router.get('/pagination',
    middleware.isAuthenticated([role.ADMIN, role.TEACHER]),
    (req, res) => {
        getstudentCtrl.getStudentPagination(req)
            .then(result => {
                res.status(result.status).json(result);
            })
            .catch(error => {
                res.status(error.status).json(error);
            })
    });

router.post('/bulkUpload', middleware.isAuthenticated([role.ADMIN]), upload.single('bulkFile'), (request, response) => {
    const file = request.file;

    if (!file) {
        response.status(400).send({
            status: statusCode.InvalidData,
            message: 'No file is selected.'
        });
    } else {
        const fileExtension = path.extname(file.originalname);

        if (['.csv', '.xlsx', '.xls'].includes(fileExtension)) {
            bulkOnBoardingstudentCtrl.bulkOnboarding(file, request).then(result => {
                response.status(result.status).json(result);
            }).catch(error => {
                response.status(error.status).json(error);
            })
        } else {
            response.status(400).send({
                status: statusCode.InvalidData,
                message: 'Wrong file is selected. Please select the .csv or .xlsx extension file.'
            });
        }
    }
});


module.exports = router;