var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('daozhele')
  // res.render('test');
  res.end('hellolo')
});

module.exports = router;
