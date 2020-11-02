const express = require('express');

const router = express.Router();
const swaggerSpec = require('../../lib/swagger');

router.get('/', (req, res) => {
    res.render('swagger/index', { title: 'Swagger', layout: 'default' });
 });

router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

module.exports = router;
