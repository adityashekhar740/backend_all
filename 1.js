const express=require('express');
const app=express();
var a=0;
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
    res.send('hemlo dunia');
})

app.get('/signup',function(req,res){
    res.send('signup please !!..');
})

app.listen(3000);