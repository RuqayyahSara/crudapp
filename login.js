const mongoose = require('mongoose');

//create schema
var loginSchema = new mongoose.Schema({
   username: {type: String, required: true},
    password: {type: String},
});
//export model
module.exports = mongoose.model("Login", loginSchema);
