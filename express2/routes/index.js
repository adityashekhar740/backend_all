var express = require("express");
var router = express.Router();
const userModel = require("./users");

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
module.exports = router;
