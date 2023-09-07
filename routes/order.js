const express = require("express");
const router = express();
const {getOrderDetails,placeOrder,getOrderHistory} = require("../controllers/order.controllers");
const isAuth = require("../middlewares/isAuth");

router.get("/orderdetails/:id",isAuth,getOrderDetails)
router.post("/placeorder/:userId",isAuth,placeOrder);
router.get("/getorderhistory/:userId",isAuth,getOrderHistory);


module.exports=router;