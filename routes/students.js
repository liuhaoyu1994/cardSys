var express = require('express');
var router = express.Router();
var db = require('../db.js');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('aaa')
    var query = 'select * from students;';
    db.query(query, (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
            res.end();
        } else {
            res.status(200).send({data: result.rows});
            res.end();
        }
    }) 
});

router.get('/:id', function(req, res, next) {
    var query = 'select * from students where id = ?;';
    db.query(query,[req.params.id], (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
            res.end();
        } else {
            res.status(200).send({data: result.rows});
            res.end();
        }
    })
});


router.get('/:id/image', function(req, res, next) {
    let stat
    try {
        filePath = '..\\Cardsys\\public\\images\\' + req.params.id + '_avatar.jpg';
        stat = fs.statSync(filePath);
    } catch (error) {
        filePath = '..\\Cardsys\\public\\images\\thumb.jpg'
        stat = fs.statSync(filePath);
    }
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

    // var query = 'select * from images where studentid = $1'
    // db.query(query,[req.params.id], (err, result) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(400).json({'err': err});
    //     } else {
    //         try {
    //             filePath = '..\\Cardsys\\public\\images\\' + result.rows[0].path.trim();
    //             console.log(result.rows)
    //         } catch (error) {
    //             filePath = '..\\Cardsys\\public\\images\\thumb.jpg'
    //         }
            
    //         var stat = fs.statSync(filePath);
    //         res.writeHead(200, {
    //             'Content-Type': 'image/png', 
    //             'Content-Length': stat.size
    //         });
    //         var readStream = fs.createReadStream(filePath);
    //         readStream.on('data', function(data) {
    //             res.write(data);
    //         });
    //         readStream.on('end', function() {
    //             res.end();        
    //         });
    //     }
    // })
});

router.get('/:id/cards', function(req, res, next) {
    var query = 'select students.*,cards.* from cards left join students on students.id = cards.studentId where students.id = $1';
    db.query(query,[req.params.id], (err, result) => {
        if (err) {
            res.status(400).json({'err': err});
            console.log(err)
            res.end();
        } else {
            res.status(200).send({data: result});
            res.end();
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
            res.end();
        } else {
            res.status(200);
            res.end();
        }
    }) 
});

router.put('/:id', function(req, res, next) {
    var query = 'update students set name=?, points=?, wechat=?, phone=? where id=?;';
    var params = [req.body.name, req.body.points, req.body.wechat, req.body.phone, req.params.id];
    db.query(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
            res.end();
        } else {
            res.status(200).json({'data': params});
            res.end();
        }
    }) 
});


router.delete('/:id', function(req, res, next) {
    var query = 'delete from students where id=$1;';
    var params = [req.params.id];
    db.query(query, params,(err, result) => {
        if (err) {
            res.status(400).json({'err': err});
            res.end();
        } else {
            res.status(200);
            res.end();
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
            res.end();
        } else {
            res.status(200);
            res.end();
        }
    }) 
  });



module.exports = router;
