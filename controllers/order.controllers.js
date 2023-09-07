const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Products = require("../models/Product");

const getOrderDetails = async(req, res) => {
    const id = req.params.id;
    try{
        const orderDetailsData = await Order.findById(id);
        res.status(200).send({ status: 200, message: "Order details fetched Successfully", data: orderDetailsData})
    }catch(err){

        res.status(400).send({ status: 400, message: "failed to get order details  ", data: err })
    }
}

const getOrderHistory = async(req, res) => {
    const id = req.params.userId;
    console.log(id);
    try{
        const orderHistory = await Order.find({UserId:id})
        res.status(200).send({ status: 200, message: "Order history fetched Successfully", data: orderHistory})
    }catch(err){
        res.status(400).send({ status: 400, message: "failed to get order history  ", data: err })
    }
}

const placeOrder = async(req, res) => {
    const userId = req.params.userId;
    try {
        const cartItems = await Cart.find();
        let totalAmount = 0;
        let productsIdArrays =[]
        cartItems.forEach((item)=>{
            productsIdArrays.push(item.productId);
        })
        let productDetails=[];

        for(let i=0;i<productsIdArrays.length;i++){
            let p1  =  await Products.findById(productsIdArrays[i]);
            productDetails.push({title:p1.title,price:p1.price});
        }
        
        for(let i=0;i<cartItems.length;i++){
            totalAmount+=(parseInt(cartItems[i].quantity))*(parseInt(productDetails[i].price))
        }
        console.log(parseInt(totalAmount));
        const orderObj = new Order({
            TotalAmount:totalAmount,
            Products:productDetails,
            UserId:userId
        })
        orderObj.save();
        res.status(200).send({ status: 200, message: "Order Placed Successfully", data: orderObj})
    } catch (err) {
        res.status(400).send({ status: 400, message: "failed to place order ", data: err })
    }
}

module.exports = { getOrderDetails, placeOrder,getOrderHistory };
