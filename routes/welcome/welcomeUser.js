var express = require('express');
var router = express.Router();


/* GET home page. */
router.get ('/', function async(req, res, next) {
  res.render('index', { title: 'User' });
});

module.exports = router;
