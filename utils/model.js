const mongoose = require('mongoose');

const Note = mongoose.model('Note',{
    title:String,
    text:String,
    color:String
});

const User = mongoose.model('User',{
    username:String,
    password:String,
    secret:String
})

module.exports = {Note,User}