var express = require('express');
var router = express.Router();
const { appUrl } = require('../config/index')
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { layout: 'default', appUrl });
});

module.exports = router;
