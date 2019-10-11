var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req)
  res.status(200).json({Token: '2333'});
});

module.exports = router;
