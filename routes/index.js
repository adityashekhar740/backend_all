var express = require('express');
var router = express.Router();
const userModel = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.signedin=true;
  res.render('index', { title: 'Express' });
});

// router.get('/create', async function(req,res){
//   // render to create a new user
//   const createuser=await userModel.create({
//     username:"Aditya_740",
//   name:'Aditya',   
//   age:20,                                 // userModel.create will create the user in the  exported model in users

//   })
//   res.send(createuser);         // print the created user in
// })
// router.get('/create2', async function(req,res){
//   // render to create a new user
//   const createuser=await userModel.create({
//     username:"shekhar_singh",
//   name:'Aditya',     
//   age:20,                               
//   })
//   res.send(createuser);        
// })

router.get('/issignedin',function(req,res){
  if(req.session.signedin!==undefined){
    console.log(req.session); 
    res.send("User is signed in");
  }
  else{
    res.send('not signed in');
  }
})

router.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err)throw err;
    else{
      res.send("Session destroyed");
    }
  })
})

router.get('/setcookie',function(req,res){
  res.cookie("name","Aditya");
  res.send('cookie setted');
})
router.get('/readcookie',function(req,res){
  console.log(req.cookies);
  res.send('cookie red');
})
router.get('/deletecookie',function(req,res){
  res.clearCookie("name");
  console.log(req.cookies);
  res.send('cookie deleted');
})

router.get('/create/:username/:name/:age',async function(req,res){
  let createdUser= await userModel.create({
    username:req.params.username,
    name:req.params.name,
    age:req.params.age
  })
  res.send(createdUser);
})

router.get('/read', async function(req,res){
  const allusers=await userModel.find();
  res.send(allusers);
})                                                               // get all users from database
router.get('/read/:name',async function(req,res){
  let user=await userModel.findOne({
    username:req.params.name,
  })
  if(user){
    res.send(user);
  }
  else{
    res.render('error');
  }
})

router.get('/delete/:username', async function(req,res){
  let deluser= await userModel.findOneAndDelete({
    username:req.params.username,
  })
  res.send(deluser)


  
})


module.exports = router;
