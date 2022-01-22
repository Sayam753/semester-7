const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    title:{
        type : String,
        required : true,
    },
    description:{
        type : String,
        required : true,
    },
    image_url : {
        type : String,
        required : true,
    },
    model_url : {
        type : String,
        required : false,
    },
    date: {
        type: Date,
        required: true,
    },

})

module.exports = mongoose.model('Model',modelSchema);