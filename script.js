const express=require('express');
const app=express();
var a=0;
app.set('view engine','ejs');

app.use(express.static('./public'));

app.use(function(req,res,next){
    a++;
    console.log('login attemt no :'+a);
    next();
})
app.use(function(req,res,next){
    a==5?console.log('logged in successfully'):null;
    next();
})

app.get('/',function(req,res){
    res.render('index');
    // res.send('ggg');
})

app.get('/trial',function(req,res){
    res.render('index_2', {name:'aditya',age:'20'} );
})

app.get('/signup',function(req,res){
    res.send('signup please !!..');
})

app.get('/account/:name',function(req,res){
    res.send(`acc holder : ${req.params.name}`)
})
app.get('/error',function(req,res){
    throw Error('a chipi chipi chapa chapa error');
})
app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }                                                             // this middleware automatically runs next()  
  res.status(500)
  res.render('error', { error: err })
})

app.listen(3000);