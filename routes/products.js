var express = require('express');
var router = express.Router();
const Product = require('../models/Product')

// Ajouter nouveau produit
router.post('/', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })

    product.save()
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
})

//Afficher tous les produits
router.get('/', (req, res, next) => {
    Product.find()
        .then(result => {
            res.status(200).json({
                message: result.map(product => {
                    return {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        url: 'http://localhost:2000/products/' + product._id
                    }

                })
            })
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
});

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id, "name price")
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
    const product = {
        _id: req.params.id,
        name: req.body.name,
        price: req.body.price
    }
    Product.findById(req.params.id)
        .then(result => {
            if (result) {
                if (product.price == null) {
                    product.price = result.price
                }
                if (product.name == null) {
                    product.name = result.name
                }
                console.log(product)
                Product.update({ _id: req.params.id }, { $set: product })
                    .then(result => {
                        res.status(200).json({
                            message: 'product was updated successfuly'
                        })
                    })
                    .catch(err => {
                        res.status(404).json({
                            message: err
                        })
                    })
            }
            else {
                res.status(404).json({
                    message: 'Product not found'
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: 'Product not found'
            })
        })
});

router.delete('/:id', (req, res, next) => {
    Product.findOneAndDelete({ _id: req.params.id })
        .then(response => {
            if (response) {
                res.status(204).json({
                    message: response
                })
            }
            else {
                res.status(404).json({
                    message: 'Product not found'
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
})









module.exports = router;
