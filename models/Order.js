const mongoose=require('mongoose');
const User = require('./User');

const orderSchema= mongoose.Schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    product:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('Order',orderSchema);