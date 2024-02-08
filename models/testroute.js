const mongoose = require('mongoose');


const testrouteschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now //This will set the current time as a default value for this field
    } 
});

module.exports = mongoose.model('testroute', testrouteschema);
