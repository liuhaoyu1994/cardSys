var express = require('express');
var router = express.Router();
var db = require('../db.js');

// url/cards/..

/* GET home page. */
router.get('/list', function(req, res, next) {
    // var query = 'select Student.*,Card.* from Card left join Student on Student.id = Card.studentId';
    var query = 'select * from cards';
    db.query(query, (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).send({data: result});
        }
    })
    
});

router.get('/:id', function(req, res, next) {
    // var query = 'select Student.*,Card.* from Card left join Student on Student.id = Card.studentId where Card.id = ?';
    var query = 'select * from cards where id = $1';
    db.query(query,[req.params.id], (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).send({data: result});
        }
    })
});

router.post('/add', function(req, res, next) {
    var query = 'insert into cards (type, credit, expire, studentId) values ($1,$2,$3,$4)';
    var params = [req.body.type, req.body.credit, req.body.expire, req.body.studentId];
    db.query(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
            console.log(err)
        } else {
            res.status(200).json({'data': params});
        }
    }) 
});

router.put('/:id', function(req, res, next) {
    var query = 'update cards set type=$1, credit=$2, studentId=$3 expire=$4 where id=$5';
    var params = [req.body.type, req.body.credit, req.body.studentId, req.body.expire, req.params.id];
    db.query(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).json({'data': params});
        }
    }) 
});

router.delete('/:id', function(req, res, next) {
    var query = 'delete from cards where id=$1';
    var params = [req.params.id];
    db.query(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).json({'data': params});
        }
    }) 
});


module.exports = router;
