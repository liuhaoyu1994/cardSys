var express = require('express');
var router = express.Router();
var db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var query = 'select * from Student';
    db.all(query, (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).send({data: result});
        }
    }) 
});

router.get('/:id', function(req, res, next) {
    var query = 'select * from Student where id = ?';
    db.get(query,[req.params.id], (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).send({data: result});
        }
    })
    
});

router.post('/add', function(req, res, next) {
    var query = 'insert into Student (name, points, wechat, phone) values (?,?,?,?)';
    var params = [req.body.name, 0, req.body.wechat, req.body.phone];
    console.log("req: " + params);
    db.run(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200);
        }
    }) 
});

router.put('/:id', function(req, res, next) {
    var query = 'update Student set name=?, points=?, wechat=?, phone=? where id=?';
    var params = [req.body.name, req.body.points, req.body.wechat, req.body.phone, req.params.id];
    db.run(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).json({'data': params});
        }
    }) 
});


router.delete('/:id', function(req, res, next) {
    var query = 'delete from Student where id=?';
    var params = [req.params.id];
    console.log(req.params)
    db.run(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200);
        }
    }) 
});

module.exports = router;
