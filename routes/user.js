const express = require("express");
const router = express();
const {registerUser,loginuser} = require("../controllers/user.controllers");

router.post("/register",registerUser)
router.post("/login",loginuser)
module.exports=router;