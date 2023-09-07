const Cart = require("../models/Cart");
const Joi = require('joi');
const additems = async (req,res) => {
    const {productId} = req.body;

    const isValid = Joi.object({
        productId: Joi.string().alphanum().required()
    }).validate(req.body);

    if (isValid.error) {
        return res.send({
            status: 400,
            message: "Invalid Input",
            data: isValid.error
        })
    }

    const cartObj = new Cart({
        productId
    })
    try{
        cartObj.save();
        res.status(201).send({ status: 201, message: 'product added in the cart', data: [] })
    }catch(err){
        console.log(err);
        return res.send({
            status: 400,
            message: "Error Cart Data",
            data: err
        })
    }
}

const getcartitems = async (req, res) => {
    try {
        const cartData = await Cart.find()
            
        res.status(200).send({
            status:200, message: "Cart Items Fetached Successfully !", data: cartData
        })
    } catch (err) {
        console.log("Error = ", err);
        res.status(400).send({ status: 400, message: "Failed to get cart items !" })
    }
}

const updateQuntity = async (req,res)=>{
    const id = req.params.cartItemId;
    const opt = req.params.opt;
    try{
        const cartItem = await Cart.findById(id);
        let newCartItem;
        if(opt=='plus'){
             newCartItem = {
                ...cartItem._doc,quantity:cartItem.quantity+1
            }
        }else if(opt=='minus'){
            newCartItem = {
                ...cartItem._doc,quantity:cartItem.quantity-1
            }
        }
        console.log(newCartItem);
        await Cart.findByIdAndUpdate({ _id: id }, newCartItem);
        res.status(200).send({ status: 200, message: "quantity Updated" })
    } catch (err) {
        res.status(400).send({ status400, message: "Cannot increse quantity!" })
    }
    
}

const deleteCartItem = async (req, res) => {
    const itemId = req.params.itemId;
    try {
        await Cart.deleteOne({ _id: itemId })
        res.status(200).send({ status: 200, message: "Item is removed from the cart !" })
    } catch (err) {
        console.log(err)
        res.status(400).send({ status: 400, message: "Unable to remove cart item" })
    }
}

module.exports = { getcartitems ,additems,updateQuntity,deleteCartItem};
