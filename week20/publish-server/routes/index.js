var express = require('express');
var fs = require('fs')
var router = express.Router();
var querystring = require('querystring')

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log('req')
  // let body = []
  // req.on('data', chunk => {
  //   body.push(chunk)
  // }).on('end', () => {
  //   body = Buffer.concat(body).toString()
  // })
  fs.writeFileSync(`../server/public/${req.query.filename}`, req.body.msg)
  res.end('jiehsule')
  // res.render('index', { title: 'Express' });
});

module.exports = router;
