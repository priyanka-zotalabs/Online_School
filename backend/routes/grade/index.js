const express = require('express');
const router = express.Router();
const gradeCtrl = require('../../controllers/grade/index');

/* Handle get grade */
router.get('/', (req, res) => {
    gradeCtrl.getGrades()
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

module.exports = router;