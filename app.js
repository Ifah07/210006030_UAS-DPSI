const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const penggunaRouter = require('./routes/pengguna');
const pesananRouter = require('./routes/pesanan');
const metodePembayaranRouter = require('./routes/metodePembayaran');
const ulasanRouter = require('./routes/ulasan');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Ganti 'jade' dengan 'pug'

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/pengguna', penggunaRouter);
app.use('/pesanan', pesananRouter);
app.use('/metodePembayaran', metodePembayaranRouter);
app.use('/ulasan', ulasanRouter);

const PORT = process.env.PORT || 3000;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send('Not Found');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Sinkronkan model dengan database
sequelize.sync()
 .then(() => {
   console.log('Database synchronized');
 })
 .catch(err => {
   console.error('Error synchronizing database:', err);
 });

 // Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;
