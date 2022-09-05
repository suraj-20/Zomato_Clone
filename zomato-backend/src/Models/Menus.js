const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MenuSchema=new Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    restaurantId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    resName: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})

module.exports=mongoose.model('Menu' ,MenuSchema ,'Menu');