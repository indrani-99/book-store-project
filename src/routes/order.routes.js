const express=require('express');
const { OrderModel } = require('../models/order.model');
const { auth } = require('../middleware/auth.middleware');

const orderRoutes=express.Router();

//private routes who are authenticate

//read orders
orderRoutes.get('/', auth, async (req,res)=>{
    try{
        const orders=await OrderModel.find({userid:req.body.userid});
        if(orders)
        res.send(orders);
    else
        res.send("You haven't order any book from our shop");
    }
    catch(err){
        res.send("Some error occure");
    }
});

//create orders
orderRoutes.post('/', auth, async (req,res)=>{
  
    try{
        const orders=await new OrderModel(req.body);
        await orders.save();
        res.send("Order successfully posted");
    }
    catch(err){
        res.send("Some error occure");
    }
});

orderRoutes.patch('/:orderid', auth, async (req,res)=>{
  
    try{
        const orderid=req.params;
        const orders=await OrderModel.findByIdAndUpdate({_id:orderid}, req.body);
        await orders.save();
        res.send("Order successfully updated");
    }
    catch(err){
        res.send("Some error occure");
    }
});



//delete orders
orderRoutes.delete('/:orderid', auth, async (req,res)=>{
  
    try{
        const orderid=req.params;
        const orders=await OrderModel.findByIdAndDelete({_id:orderid});
        await orders.save();
        res.send("Order successfully deleted");
    }
    catch(err){
        res.send("Some error occure");
    }
});
module.exports={
    orderRoutes
}
