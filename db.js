var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('cardSys.db', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('DB connected');
        db.run('CREATE TABLE IF NOT EXISTS Student (id INTEGER PRIMARY KEY AUTOINCREMENT, password varchar NOT NULL, email varchar NOT NULL UNIQUE, name TEXT, points INTEGER, wechat TEXT, phone TEXT， image TEXT )', (err) => {
            if(err) {console.log(err)}
            /*else {db.run('INSERT INTO Student(name, points, wechat, phone) VALUES("harry", 10, "wechatid_1", "7781234567")')}*/
            else {
                db.run('INSERT INTO Student(password, email, name, points, wechat, phone) VALUES("123456", "123@123.com", "harry", 10, "wechatid_1", "7781234567")', (err) => {
                    if(err) {console.log(err)}
                });
            }
        });
        
        db.run('CREATE TABLE IF NOT EXISTS Card (id INTEGER PRIMARY KEY AUTOINCREMENT, type INTEGER, remain INTEGER, studentId INTEGER, FOREIGN KEY(studentId) REFERENCES Student(id) )', (err) => {
            if(err) {console.log(err)}
            /*else {{db.run('INSERT INTO Card(type, remain, studentId) VALUES(1, 7, 1)')}}});*/
        });
    }
});

module.exports = db;
