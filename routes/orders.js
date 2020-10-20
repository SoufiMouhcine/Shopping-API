const { response } = require('express');
const express = require('express')
var router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

router.post('/', (req, res, next) => {
    const order = new Order({
        user_id: req.body.user_id,
        product: req.body.product
    })
    order.save()
        .then(result => {
            res.status(201).json({
                message: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
});

router.get('/', (req, res, next) => {
    Order.find().populate('user_id', 'username')
        .then(result => {
            res.status(200).json({
                message: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
});

router.put('/:id', (req, res, next) => {
    var product = req.body.product
    Order.find({ _id: req.params.id })
        .then(result => {
            var products = result[0].product
            for (let indexOfProduct = 0; indexOfProduct < products.length; indexOfProduct++) {
                for (let i = 0, j = 0; i < product.length; j++) {
                    if (product[i]._id === products[j]._id) {
                        products[j].quantity = product[i].quantity
                        product.splice(i, 1)

                    }
                    else {
                        products = products.concat(product)
                    }
                }
            }
            console.log(products)
            const newProduct={
                product:products
            }
            console.log(newProduct)
            Order.update({ _id: req.params.id }, { $set: newProduct })
                .then(response => {
                    res.status(200).json({
                        message: response
                    })
                })
                .catch(err => {
                    res.status(404).json({
                        message: err
                    })
                })
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
})





module.exports = router;
