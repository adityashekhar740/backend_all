var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport=require('passport');
const localStratergy=require('passport-local');
passport.use(new localStratergy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/failed", function (req, res) {
  req.flash("name", "Aditya");
  req.flash("Age", 20);
  req.flash("gen", "male");
  res.send("Data has been set");
});

router.get("/check", function (req, res) {
  console.log(req.flash("name"), req.flash("Age"));
  console.log(" ");
  console.log(req.flash("gen"));
});
router.get("/create", async function (req, res) {
  const Cuser = await userModel.create({
    username: "shekhar_aditya",
    nickname: "aditya shekhar singh",
    description: "a runner up",
    categories: [
      "businessman",
      "bodybuilder",
      "cricketer",
      "devotee",
      "foodie",
    ],
  });
  res.send(Cuser);
});
router.get("/findname", async function (req, res) {
  let regex = new RegExp("^ADI$", "i"); // a regular exn will be used to do case insensitive search
  const user = await userModel.find({ nickname: regex });
  res.send(user);
});
router.get("/findcat", async function (req, res) {
  const user = await userModel.find({
    // categories:{ $in : ["coder"]}
    categories: { $all: ["everything"] },
  });
  res.send(user);
});
router.get("/finddate", async function (req, res) {
  const d1 = new Date("2024-01-24");
  const d2 = new Date("2024-01-26");

  const user = await userModel.find({
    datecreated: { $gte: d1, $lte: d2 },
  });
  res.send(user);
});
router.get("/findexist", async function (req, res) {
  const user = await userModel.find({
    categories: { $exists: true },
  });
  res.send(user);
});
router.get('/findlen',async function(req,res){
  const ans= await userModel.find({
    $expr:{
    $and:[
      {$gte: [{$strLenCP:'$nickname'},4]},
      {$lte: [{$strLenCP:'$nickname'},25]}
    ]
  }
  })
  res.send(ans);
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

router.get('/profile',function(req,res){
  res.render('profile');

})

// register route

router.post('/register', async function(req, res) {
  try {
    var userdata = new userModel({
      username: req.body.username,
      secret: req.body.secret
    });
    await userModel.register(userdata, req.body.password);
    passport.authenticate('local')(req, res, function() {

      res.redirect('/profile');
    });
  } catch (error) {
    if (error.name === 'UserExistsError') {
      res.send('user already exists');
    }
  }
});


router.post('/login',passport.authenticate('local',{
  
  successRedirect: '/profile',
  failureRedirect: '/'
}))

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err) return next(err);
    res.redirect('/');
  })

})



module.exports = router;
