



const mongoose = require('mongoose'); 
mongoose.connect('mongodb://127.0.0.1:27017/userdb')      //database setup ->  formation 

const userschema=mongoose.Schema({
  username:String,
  name:String,                                            // schema defination ->  each document defined
  age:Number,
});

module.exports=mongoose.model("users",userschema);

