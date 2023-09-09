const express = require("express");
require("dotenv").config();
var cors = require('cors')
const app = express();

//swagger imports and configuration
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce APIs by Animesh Karne',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'https://ecommerce-api-animesh-karne.onrender.com'
            },
        ]
    },
    apis: ['./index.js']
}
const swaggerSpec = swaggerJsDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//file imports  
const db = require("./config/db");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");


//middlewares
app.use(cors())
app.use(express.json());

//base api
/**
 * @swagger
 * /:
 *   get:
 *     summary: This API is used to check if the GET method is working or not.
 *     description: This API is used to check if the GET method is working or not.
 *     responses:
 *       200:
 *         description: To test the base method.
 */
app.get("/", (req, res) => {
    res.send("Welcome To Animesh Karne's Eccomerse API , Goto /api-docs for more info")
})
//addiong all routes from routes folder

// all schemas

//User schema
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *            type: string
 *         email:
 *            type: string
 *         password:
 *            type: string
 */

//product schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         image:
 *           type: string
 *         ratings:
 *           type: number
 *         ratings-count:
 *           type: integer
 *         categoryID:
 *           type: string
 */

//Category Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         CategoryName:
 *           type: string
 */

//cart schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         quantity:
 *           type: integer
 *         productId:
 *            type: string
 */

//Order schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         TotalAmount:
 *           type: integer
 *         products:
 *            type: array
 *         UserId:
 *            type: string
 */


// authentication apis
//register new user
/**
 * @swagger
 * /register:
 *   post:
 *     summary: register new user.
 *     description: for adding new user to database.
 *     requestBody:
 *       required: true
 *       description: pass just name,username,password and email.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Register Successfully.
 *         
*/

// login with exs=isting user
/**
 * @swagger
 * /login:
 *   post:
 *     summary: login user.
 *     description: for login user and authenticate user.
 *     requestBody:
 *       required: true
 *       description: pass just loginId (usrername or password) and password.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login Successfully.
 *         
*/
app.use("/", userRoutes)


//PRODUCTS APIs
/**
 /**
 * @swagger
 * /products:
 *   get:
 *     summary: To get all products from the database (mongodb).
 *     description: This API is used to fetch data from MongoDB.
 *     responses:
 *       200:
 *         description: This API is used to fetch data from MongoDB.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
* @swagger
 * /products/{id}:
 *   get:
 *     summary: To get a product from the database (mongodb) by ID.
 *     description: This API is used to fetch data from MongoDB by specifying a numeric ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alphanumeric ID required
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: This API is used to fetch data from MongoDB.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
*/

/**
* @swagger
 * /products/categoryid/{categoryID}:
 *   get:
 *     summary: To get a product of perticular category.
 *     description: To get a product of perticular category.
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         description: alphanumeric ID required
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: This API is used to fetch data from MongoDB.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
*/
app.use("/", productRoutes)

//category api
/**
 /**
 * @swagger
 * /categories:
 *   get:
 *     summary: To get all categories from the database .
 *     description: This API is used to fetch data from category collection.
 *     responses:
 *       200:
 *         description: This API is used to fetch data from MongoDB.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
app.use("/", categoryRoutes)

//cart apis
/**
 /**
 * @swagger
 * /cartitems:
 *   get:
 *     summary: To get all items from the cart .
 *     description: This API is used to fetch data from cart.
 *     responses:
 *       200:
 *         description: This API is used to fetch cart data from cart collection.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /additem:
 *   post:
 *     summary: Add an item to the cart.
 *     description: just add product id in body so the that products added in  cart ,{"productId":"64f71965b2fdf2b9a5edc996"} like this only add and make login request and add header. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Added Successfully.
 *         
*/

/**
 * @swagger
 * /updatequantity/{opt}/{cartItemId}:
 *   put:
 *     summary: Update quantity of a product.
 *     description: To increment or decrement the quantity of a product in the cart, provide 'plus' or 'minus' as 'operation' and the 'id' of the cart item.
 *     parameters:
 *       - in: path
 *         name: opt
 *         required: true
 *         description: Specify 'plus' to increment or 'minus' to decrement quantity.
 *         schema:
 *           type: string
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: The ID of the cart item.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Update Successful.
 */

/**
* @swagger
 * /removeitemfromcart/{itemId}:
 *   delete:
 *     summary: remove item from cart.
 *     description: This API is used to delete data from cart.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alphanumeric ID of item from cart 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: item deleted from cart.
*/
app.use("/", cartRoutes)

//order apis
/**
* @swagger
 * /orderdetails/{id}:
 *   get:
 *     summary: To get a details of perticular order.
 *     description: To get a details of perticular order.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alphanumeric ID required from orders
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: This API is used to fetch data from MongoDB.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Orders'
*/

/**
 * @swagger
 * /placeorder/{userId}:
 *   post:
 *     summary: place order with cart products.
 *     description: place order with products from cart. 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alphanumeric ID required user's id  
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order Placed.
 *         
*/

/**
* @swagger
 * /getorderhistory/{userId}:
 *   get:
 *     summary: get order history.
 *     description: To get a history of orders.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: alphanumeric ID required from orders
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: This API is used to fetch data from MongoDB.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Orders'
*/
app.use("/", orderRoutes)


app.listen(process.env.SERVER_PORT, () => {
    console.log("server is running at port ", process.env.SERVER_PORT);
})
