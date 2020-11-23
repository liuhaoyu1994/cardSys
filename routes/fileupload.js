var express = require('express');
var router = express.Router();
var db = require('../db.js');
var http = require('http');
var mv = require('mv');
var formidable = require('formidable');

router.post('/', function(req, res) {
    
	var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.file.path;
        var student = fields.userid;
        var newFileName = student + '_avatar.' + files.file.name.split(".")[1];
        var newpath = '..\\Cardsys\\public\\images\\' + newFileName;
        mv(oldpath, newpath, function (err) {
            if (err) {
                res.status(400).json({'err': err});
                console.log(err)
            } else {
                res.write('File uploaded');
                res.end();
            }
            // var query = 'update images set path values = $1 where studentid = $2;';
            // var params = [newFileName, student];
            // console.log(params);
            // db.query(query, params,(err, result) => {
            //     if (err) {
            //         res.status(400).json({'err': err});
            //         console.log(err)
            //     } else {
            //         res.status(200);
            //     }
            // })
        });
        if (err) {
            console.log(err)
        }
    });
});

module.exports = router;
