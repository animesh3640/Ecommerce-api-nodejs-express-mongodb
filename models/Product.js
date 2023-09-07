
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        title:{
            type:String,
            require:true,
        },  
        price:{
            type:Number,
            require:true
        },
        description:{
            type:String,
            require:true 
        },
        category:{
            type:String,
            require:true
        },
        image:{
            type:String,
            require:true 
        },
        password:{
            type:Number,
            require:true 
        },
        'ratings-count':{
            type:Number,
            require:true 
        },
        categoryId:{
            type:String,
            require:true 
        }
    },
    {
        strict:false
    }
);

module.exports = mongoose.model("products",ProductSchema);