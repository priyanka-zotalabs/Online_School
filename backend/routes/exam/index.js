const express = require('express');
const router = express.Router();
const examCtrl = require('../../controllers/exam/index');

/* Handle get exam */
router.get('/', (req, res, next) => {
    examCtrl.getExams()
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

module.exports = router;