var express = require('express');
var router = express.Router();
var db = require('../db.js');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
    var query = 'select * from students;';
    db.query(query, (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).send({data: result.rows});
        }
    }) 
});

router.get('/:id', function(req, res, next) {
    var query = 'select * from students where id = ?;';
    db.query(query,[req.params.id], (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).send({data: result.rows});
        }
    })
});


router.get('/:id/image', function(req, res, next) {
    var query = 'select * from images where studentid = $1'
    db.query(query,[req.params.id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({'err': err});
        } else {
            try {
                filePath = '..\\Cardsys\\public\\images\\' + result.rows[0].path;
            } catch (error) {
                
                filePath = '..\\Cardsys\\public\\images\\thumb.jpg'
            }
            
            var stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': 'image/png', 
                'Content-Length': stat.size
            });
            var readStream = fs.createReadStream(filePath);
            readStream.on('data', function(data) {
                res.write(data);
            });
            readStream.on('end', function() {
                res.end();        
            });
        }
    })
});

router.get('/:id/cards', function(req, res, next) {
    var query = 'select students.*,cards.* from cards left join students on students.id = cards.studentId where students.id = $1';
    db.query(query,[req.params.id], (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
            console.log(err)
        } else {
            res.status(200).send({data: result});
        }
    })
});

router.post('/add', function(req, res, next) {
    var query = 'insert into students (name, points, wechat, phone) values (?,?,?,?);';
    var params = [req.body.name, 0, req.body.wechat, req.body.phone];
    console.log("req: " + params);
    db.query(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200);
        }
    }) 
});

router.put('/:id', function(req, res, next) {
    var query = 'update students set name=?, points=?, wechat=?, phone=? where id=?;';
    var params = [req.body.name, req.body.points, req.body.wechat, req.body.phone, req.params.id];
    db.query(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200).json({'data': params});
        }
    }) 
});


router.delete('/:id', function(req, res, next) {
    var query = 'delete from students where id=$1;';
    var params = [req.params.id];
    console.log(query,params)
    db.query(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
        } else {
            res.status(200);
        }
    }) 
});

router.post('/register', function(req, res, next) {
    var query = 'insert into students (name, points, wechat, phone) values ($1,$2,$3,$4)';
    var params = [req.body.name, 0, req.body.wechat, req.body.phone];
    db.query(query, params,(err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({'err': err});
        } else {
            res.status(200);
        }
    }) 
  });



module.exports = router;
