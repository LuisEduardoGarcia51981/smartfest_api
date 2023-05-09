'use strict'
const express = require('express')
const bodyParser=require('body-parser')
const app=express()
const cors = require('cors')
let ip='192.168.0.154';
app.use(cors({
    origin: [ 'http://'+ip+':19006','http://localhost:19006','http://127.0.0.1:19006']
}));
//app.use(express.static('/public/web/assets/photos'));
const path = require('path')

app.use('/img', express.static(path.join(__dirname, './public/web/assets/photos')))
const api_route_eventos= require ('./routes/evento.js')
const api_route_users= require ('./routes/user.js')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api',api_route_eventos)
app.use('/api',api_route_users)

// obtiene la ruta del directorio publico donde se encuentran los elementos estaticos (css, js).
app.use(express.static('public/web'));
app.get('/app', (req, res) => {res.sendFile(__dirname + '/public/web/app/index.html')});
app.get('/api' ,function (req,res){
    res.send({user:"User_Laboratorio"}).status(200)
})

module.exports= app
