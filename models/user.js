'use strict'
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const UserSchema= Schema({    

    nombre:String,
    apellido:String,
    username:String,
    password:String,
    activo:{type: Number, default:1},       
    })
    module.exports = mongoose.model('User',UserSchema)
    
