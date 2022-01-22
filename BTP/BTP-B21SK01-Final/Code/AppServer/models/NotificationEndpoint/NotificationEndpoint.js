const mongoose = require('mongoose')

const notificationEndpointSchema = new mongoose.Schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    endpoint:{
        type : String,
        required : true,
    },
    expirationTime : {
        type : String,
        required : false,
    },
    keys : {
        type : Object,
        required : true,
    },

})

module.exports = mongoose.model('NotificationEndpoint',notificationEndpointSchema);