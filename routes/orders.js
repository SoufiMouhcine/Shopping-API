const express=require('express')
var router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

router.post('/',(req,res,next)=>{
    const order=new Order({
        user_id:req.body.user_id,
        product:req.body.product
    })
    order.save()
    .then(result=>{
        res.status(201).json({
            message : result
        })
    })
    .catch(err=>{
        res.status(404).json({
            message:err
        })
    })
});

router.get('/',(req,res,next)=>{
    Order.find().populate('user_id','username')
    .then(result=>{
        res.status(200).json({
            message:result
        })
    })
    .catch(err=>{
        res.status(404).json({
            message:err
        })
    })
})





module.exports = router;
