var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var path=require('path')

const cors=require('cors');
const mongoose=require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');
const { static } = require('express');



var app = express();

// view engine setup


app.use(logger('dev'));

app.use(cors());
mongoose.connect('mongodb://localhost/Shopping-API',{useNewUrlParser:true , useUnifiedTopology: true},(err,result)=>{
  if(err){
    console.log(err)
    return
  }
  else{
    console.log("connect to DB")
  }
});
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'productImg')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message:err.message
  });
});

module.exports = app;
