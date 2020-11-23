// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('cardSys.db', function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('DB connected');
//         db.run('CREATE TABLE IF NOT EXISTS Student (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, points INTEGER, wechat TEXT, phone TEXT， image TEXT )', (err) => {
//             if(err) {console.log(err)}
//             /*else {db.run('INSERT INTO Student(name, points, wechat, phone) VALUES("harry", 10, "wechatid_1", "7781234567")')}*/
//         });
//         db.run('CREATE TABLE IF NOT EXISTS Card (id INTEGER PRIMARY KEY AUTOINCREMENT, type INTEGER, remain INTEGER, studentId INTEGER, FOREIGN KEY(studentId) REFERENCES Student(id) )', (err) => {
//             if(err) {console.log(err)}
//             /*else {{db.run('INSERT INTO Card(type, remain, studentId) VALUES(1, 7, 1)')}}*/});
//     }
// });
let db;
if (process.env.DATABASE_URL) {
    const { Pool } = require('pg');
    db = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });
} else {
    const { Client } = require('pg')
    db = new Client({
        user: 'deadmin',
        host: 'localhost',
        database: 'dedb',
        password: 'DEADMINPASSWORD',
        post:5432
    })
}
db.connect()

var query = 'CREATE TABLE IF NOT EXISTS students (id SERIAL PRIMARY KEY, name CHAR(30), wechat CHAR(30), phone CHAR(30), points SMALLINT);';
db.query(query,(err, result) => {
    if (err) {
        console.log('err creating students table', err);
    } else {
        console.log('students table running');
    }
}) 

var query = 'CREATE TABLE IF NOT EXISTS images (id SERIAL PRIMARY KEY, path CHAR(30), studentid INT, CONSTRAINT student FOREIGN KEY(studentid) REFERENCES students(id) ON DELETE CASCADE);';
db.query(query,(err, result) => {
    if (err) {
        console.log('err creating images table', err);
    } else {
        console.log('images table running');
    }
}) 

var query = 'CREATE TABLE IF NOT EXISTS cardtypes (id SERIAL PRIMARY KEY, type SERIAL, typename CHAR(30));';
db.query(query,(err, result) => {
    if (err) {
        console.log('err creating cardtypes table', err);
    } else {
        console.log('cardtypes table running');
    }
}) 

var query = 'CREATE TABLE IF NOT EXISTS cards (id SERIAL PRIMARY KEY, cardtypeid INT, credit SMALLINT, expire TIMESTAMP, studentid INT, CONSTRAINT student FOREIGN KEY(studentid) REFERENCES students(id) ON DELETE CASCADE, CONSTRAINT cardtype FOREIGN KEY(cardtypeid) REFERENCES cardtypes(id) ON DELETE CASCADE);';
db.query(query,(err, result) => {
    if (err) {
        console.log('err creating cards table', err);
    } else {
        console.log('cards table running');
    }
}) 

var query = 'CREATE TABLE IF NOT EXISTS records (id SERIAL PRIMARY KEY, date TIMESTAMP, cardid INT, courseid INT, CONSTRAINT card FOREIGN KEY(cardid) REFERENCES cards(id) ON DELETE CASCADE, CONSTRAINT course FOREIGN KEY(courseid) REFERENCES courses(id) ON DELETE CASCADE);';
db.query(query,(err, result) => {
    if (err) {
        console.log('err creating records table', err);
    } else {
        console.log('records table running');
    }
}) 

var query = 'CREATE TABLE IF NOT EXISTS courses (id SERIAL PRIMARY KEY, name CHAR(30), schedule CHAR(10), startdate TIMESTAMP, enddate TIMESTAMP, teacher CHAR(30), location CHAR(30));'
db.query(query,(err, result) => {
    if (err) {
        console.log('err creating courses table', err);
    } else {
        console.log('courses table running');
    }
}) 

var query = 'CREATE TABLE IF NOT EXISTS courseimages (id SERIAL PRIMARY KEY, path CHAR(30), courseid INT, CONSTRAINT course FOREIGN KEY(courseid) REFERENCES courses(id) ON DELETE CASCADE);';
db.query(query,(err, result) => {
    if (err) {
        console.log('err creating courseimages table', err);
    } else {
        console.log('courseimages table running');
    }
}) 

var query = 'CREATE TABLE IF NOT EXISTS coursevideos (id SERIAL PRIMARY KEY, link CHAR(120), courseid INT, CONSTRAINT course FOREIGN KEY(courseid) REFERENCES courses(id) ON DELETE CASCADE);';
db.query(query,(err, result) => {
    if (err) {
        console.log('err creating coursevideos table', err);
    } else {
        console.log('coursevideos table running');
    }
}) 

var query = 'ALTER TABLE courses ADD COLUMN typeid INT;';
db.query(query,(err, result) => {
    if (err) {
        if (err.code === '42701') {
            console.log('typeid column already exists');
        } else {
            console.log(err);
        }
    } else {
        console.log('typeid column created');
    }
}) 

var query = 'ALTER TABLE courses ADD CONSTRAINT type FOREIGN KEY (typeid) REFERENCES cardtypes(id) ON DELETE CASCADE;';
db.query(query,(err, result) => {
    if (err) {
        if (err.code === '42710') {
            console.log('courses mapping already exists');
        } else {
            console.log(err);
        }
    } else {
        console.log('courses mapping created');
    }
})

var query = 'ALTER TABLE courses ADD COLUMN starttime CHAR(30);';
db.query(query,(err, result) => {
    if (err) {
        if (err.code === '42701') {
            console.log('starttime column already exists');
        } else {
            console.log(err);
        }
    } else {
        console.log('starttime column created');
    }
}) 

var query = 'ALTER TABLE courses ADD COLUMN length SMALLINT;';
db.query(query,(err, result) => {
    if (err) {
        if (err.code === '42701') {
            console.log('length column already exists');
        } else {
            console.log(err);
        }
    } else {
        console.log('length column created');
    }
}) 


module.exports = db;
