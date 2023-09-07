const Category = require("../models/Category");

const getCategories = async (req, res) => {
    try {
        const categoryData = await Category.find()
            
        res.status(200).send({
            status:200, message: "Categories Fetached Successfully !", data: categoryData
        })
    } catch (err) {
        console.log("Error = ", err);
        res.status(400).send({ status: 400, message: "Failed to get Categories !" })
    }
}
module.exports = { getCategories };
