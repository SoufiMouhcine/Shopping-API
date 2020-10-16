const mongoose = require('mongoose');

const ProdcutSchema=mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Product',ProdcutSchema);