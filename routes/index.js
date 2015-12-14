var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
	title: 'Helsinki loves Refugees & Cosmopolitanism', 
	description: 'Self-organized and self-sufficient collective to help refugees of Helsinki'
  });
});

module.exports = router;
