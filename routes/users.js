const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");



const userSchema = mongoose.Schema({
    username: String,
    fullName: String,
    password: String,
    pic: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})
userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema)