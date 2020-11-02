const express = require('express');
const router = express.Router();
const boardCtrl = require('../../controllers/board/index');

/* Handle get board */
router.get('/', (req, res, next) => {
    boardCtrl.getBoards()
        .then(result => {
            res.status(result.status).json(result);
        })
        .catch(error => {
            res.status(error.status).json(error);
        })
});

module.exports = router;