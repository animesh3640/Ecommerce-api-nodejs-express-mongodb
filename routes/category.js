const express = require("express");
const router = express();
const {getCategories} = require("../controllers/category.controllers")

router.get("/categories",getCategories)


module.exports=router;