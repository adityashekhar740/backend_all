var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./Posts");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/createuser", async function (req, res) {
  const crUser = await userModel.create({
    username: "Adityaaa",
    password: "pass",
    posts: [],
    email: "shekhar@gmail.com",
    fullName: "aditya shekhar singh",
  });
  res.send(crUser);
});
router.get("/createpost", async function (req, res) {
  const crPost = await postModel.create({
    postText: "hey it's my new post",
     user:"65b61ef16d04dba8232f18bb"
  });
  let user = await userModel.findOne({
    _id:"65b61ef16d04dba8232f18bb"
  });
  user.posts.push(crPost._id);
  await user.save();
  res.send(user);
});
// get all users     
router.get('/read',async function(req,res){
  const posts=await postModel.find();
  res.send(posts);
})
router.get('/userposts',async function(req,res){
  const user =await userModel.findOne({
    _id:"65b61ef16d04dba8232f18bb"
  })
  
  .populate('posts')
  // const posts=await postModel.find({
  //   _id:user.posts
  // })
  // res.send(posts);
  res.send(user);
})

module.exports = router;
