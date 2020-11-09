var express = require('express');
var router = express.Router();
var db = require('../db.js');

router.post('/', function(req, res, next) {
	var email = req.body.email;
    var password = req.body.password;
    var query = 'select * from Student where email = ? AND password = ?';
    var params = [email, password];
    console.log(email,' ',password)
    if (email && password) {
        db.run(query, params,(err, result) => {
            if (err) {
                res.status(400).json({'err': err});
            } else {
                res.redirect('/students');
            }
        })
    }
});

module.exports = router;
