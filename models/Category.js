const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        CategorySchema:{
            type:String,
            require:true,
        }, 
    },
        {
            strict:false
        }
    );
    
    module.exports = mongoose.model("categories",CategorySchema);