var express = require('express');
var router = express.Router();
var db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var query = 'select Student.*,Card.* from Card left outer join Student on Student.id = Card.studentId';
    db.all(query, (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).send({data: result});
        }
    })
    
});

router.get('/:id', function(req, res, next) {
    var query = 'select Student.*,Card.* from Card left outer join Student on Student.id = Card.studentId where Card.id = ?';
    db.get(query,[req.params.id], (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).send({data: result});
        }
    })
    
});

router.post('/add', function(req, res, next) {
    var query = 'insert into Card (type, remain, studentId) values (?,?,?)';
    var params = [req.body.type, req.body.remain, req.body.studentId];
    db.run(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).json({'data': params});
        }
    }) 
});

router.put('/:id', function(req, res, next) {
    var query = 'update Card set type=?, remain=?, studentId=? where id=?';
    var params = [req.body.type, req.body.remain, req.body.studentId, req.params.id];
    db.run(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).json({'data': params});
        }
    }) 
});

router.delete('/:id', function(req, res, next) {
    var query = 'delete from Card where id=?';
    var params = [req.params.id];
    db.run(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).json({'data': params});
        }
    }) 
});


module.exports = router;
