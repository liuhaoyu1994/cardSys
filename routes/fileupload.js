var express = require('express');
var router = express.Router();
var db = require('../db.js');
var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

router.post('/', function(req, res, next) {
	var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.file.path;
        var student = fields.userid;
        var newFileName = student + '_avatar.' + files.file.name.split(".")[1];
        var newpath = '..\\Cardsys\\public\\images\\' + newFileName;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            var query = 'insert into images (studentid, path) values ($1,$2);';
            var params = [student, newFileName];
            console.log(query);
            db.query(query, params,(err, result) => {
                if (err) {
                    res.status(400).json({'err': err});
                    console.log(err)
                } else {
                    res.status(200);
                }
            })
        });
    });
});

module.exports = router;
