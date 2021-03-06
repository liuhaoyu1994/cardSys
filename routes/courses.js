var express = require('express');
var router = express.Router();
var db = require('../db.js');

// url/cards/..

/* GET home page. */
router.get('/list', function(req, res, next) {
    var query = 'select courses.*, cardtypes.typename from courses join cardtypes on courses.typeid = cardtypes.id;';
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

router.get('/category', function(req, res, next) {
    let query,params;
    if (req.query.typeid == 'all') {
        query = 'select courses.*, cardtypes.typename from courses join cardtypes on courses.typeid = cardtypes.id;';
        params = null
    } else {
        query = 'select courses.*, cardtypes.typename from courses join cardtypes on courses.typeid = cardtypes.id where courses.typeid = $1;';
        params = [req.query.typeid]
    }
    db.query(query,params, (err, result) => {
        if (err) {
            console.log(err)
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
    var query = 'select courses.*, cardtypes.typename from courses join cardtypes on courses.typeid = cardtypes.id where courses.id = $1;';
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
    var query = 'insert into courses (name, schedule, startdate, enddate, teacher, location, typeid, starttime, length) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)';
    var params = [req.body.name, req.body.schedule, req.body.startdate, req.body.enddate, req.body.teacher, req.body.location, req.body.typeid, req.body.starttime, req.body.length];
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
    var query = 'delete from courses where id=$1';
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
