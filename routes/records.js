var express = require('express');
var router = express.Router();
var db = require('../db.js');

// url/cards/..

/* GET home page. */
router.get('/list', function(req, res, next) {
    var query = 'select * from records;';
    db.query(query, (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
            res.end();
        } else {
            res.status(200).send({data: result});
            res.end();
        }
    })
});

router.get('/:id', function(req, res, next) {
    // var query = 'select Student.*,Card.* from Card left join Student on Student.id = Card.studentId where Card.id = ?';
    var query = 'select * from records where id = $1';
    db.query(query,[req.params.id], (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
            res.end();
        } else {
            res.status(200).send({data: result});
            res.end();
        }
    })
});

router.post('/add', function(req, res, next) {
    var query = 'insert into records (date, cardid, courseid) values ($1,$2,$3)';
    var params = [req.body.date, req.body.cardid, req.body.courseid];
    db.query(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
            console.log(err)
            res.end();
        } else {
            res.status(200).json({'data': result});
            res.end();
        }
    }) 
});

router.delete('/:id', function(req, res, next) {
    var query = 'delete from records where id=$1';
    var params = [req.params.id];
    db.query(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
            res.end();
        } else {
            res.status(200).json({'data': result});
            res.end();
        }
    }) 
});


module.exports = router;
