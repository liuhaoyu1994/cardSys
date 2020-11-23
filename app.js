var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session')

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var cardsRouter = require('./routes/cards');
var studentsRouter = require('./routes/students');
var coursesRouter = require('./routes/courses');
var recordsRouter = require('./routes/records');
var fileuploadRouter = require('./routes/fileupload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'ui/build')));

app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/students', studentsRouter);
app.use('/api/users', usersRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/fileupload', fileuploadRouter);
app.use('/api/records', recordsRouter);

app.get('/*', (req, res) => {
  console.log('a')
  res.sendFile(path.join(__dirname+'/ui/build/index.html'));
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
