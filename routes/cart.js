const express = require("express");
const router = express();
const {getcartitems,additems,updateQuntity,deleteCartItem} = require("../controllers/cart.controllers");
const isAuth = require("../middlewares/isAuth");

router.get("/cartitems",isAuth,getcartitems)
router.post("/additem",isAuth,additems);
router.put("/updatequantity/:opt/:cartItemId",isAuth,updateQuntity);
router.delete("/removeitemfromcart/:itemId",isAuth,deleteCartItem);

module.exports=router;

