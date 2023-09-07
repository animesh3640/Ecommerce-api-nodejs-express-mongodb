const express = require("express");
const router = express();
const { getProducts, getProductsWithId, getProductsWithCategoryID } = require("../controllers/products.controllers");


router.get("/products", getProducts)
router.get("/products/:id", getProductsWithId)
router.get("/products/categoryid/:categoryID", getProductsWithCategoryID)


module.exports = router;