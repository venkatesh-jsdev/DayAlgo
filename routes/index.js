var express = require('express');
var router = express.Router();
const upstox = require('../controllers/upstox');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.route('/api')
.get(upstox.upstoxGET);