const Products = require("../models/Product");

const getProducts = async (req, res) => {
    try {
        const productsData = await Products.find()
            
        res.status(200).send({
            status:200, message: "Products Fetached Successfully !", data: productsData
        })
    } catch (err) {
        console.log("Error = ", err);
        res.status(400).send({ status: 400, message: "Failed to get products !" })
    }
}
const getProductsWithId = async (req, res) => {
    const id = req.params.id;
    try {
        const productsData = await Products.find({_id:id})
            
        res.status(200).send({
            status:200, message:`Product with id ${id} Details Fetched`, data: productsData
        })
    } catch (err) {
        console.log("Error = ", err);
        res.status(400).send({ status: 400, message: "Failed to get products !" })
    }
}
const getProductsWithCategoryID = async (req, res) => {
    const categoryId = req.params.categoryID;
    try {
        const Data = await Products.find();
        const fiilteredData = Data.filter((item)=>{
            return item.categoryID==categoryId
        })
        res.status(200).send({
            status:200, message:`Product with categoryID ${categoryId} Details Fetched`, data: fiilteredData
        })
    } catch (err) {
        console.log("Error = ", err);
        res.status(400).send({ status: 400, message: "Failed to get products !" })
    }
}
module.exports = { getProducts , getProductsWithId,getProductsWithCategoryID};