const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    userid:{type:String, required:true},
    username:{type:String, required:true},
    totalamount:{type:String, required:true},
    books: [{ title: String, price:Number }],
    date: { type: Date, default: Date.now }
}, {versionKey:false})

const OrderModel=mongoose.model('Order',orderSchema );

module.exports={OrderModel};