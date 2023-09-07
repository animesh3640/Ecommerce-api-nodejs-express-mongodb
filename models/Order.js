const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        TotalAmount:{
            type:Number,
            require:true,
        }, 
        Products:{
            type:Array,
            require:true
        },
        UserId:{
            type:String,
            require:true
        }
    },
        {
            strict:false
        }
    );
    
    module.exports = mongoose.model("orders",OrderSchema);