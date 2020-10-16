var express = require('express');
var router = express.Router();
const Product = require('../models/Product')

// Ajouter nouveau produit
router.post('/',(req,res,next)=>{
    const product=new Product({
        name : req.body.name,
        price : req.body.price
    })

    product.save()
    .then(result=>{
        res.status(201).json({
            message : result
        })
    })
    .catch(err=>{
        res.status(404).json({
            message : err
        })
    })
})

//Afficher tous les produits
router.get('/',(req,res,next)=>{
    Product.find()
    .then(result=>{
        res.status(200).json({
            message : result
        })
    })
    .catch(err=>{
        res.status(404).json({
            message : err
        })
    })
})









module.exports = router;
