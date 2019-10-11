var express = require('express');
var router = express.Router();
var crypto = require('crypto');
/* GET home page. */
router.get('/', function(req, res, next) {
  const signature = req.query.signature;
  const timestamp = req.query.timestamp;
  const nonce = req.query.nonce;
  const token = '2333';
  const reply = req.query.echostr;

  var arr = [timestamp,nonce,token]
  arr.sort();

  var tempStr = arr.join('');
  const hashCode = crypto.createHash('sha1');
  var result = hashCode.update(tempStr,'utf8').digest('hex');
  if(result === signature){
    res.send(reply);
  } else {
    res.send('not Match')
  }
  res.status(200).json({Token: '2333',Req:req.body});
});

module.exports = router;
