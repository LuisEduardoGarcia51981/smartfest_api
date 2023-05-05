'use strict'

const express = require('express')
const UserCtrl=require('../controllers/user')
const api_route= express.Router()
const {validateLoginUsuario} =require('../middlewares/user')
//const multer = require('multer'); 
//const upload = multer({});
//rutas a los endpoint de los eventos:
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// a continuacion agregamos los end-point nuevos para la app qu usa users:

//Buscar todos los eventos creados por un usuario:
//api_route.get('/eventosUser',validateGetEventosUser,UserCtrl.getEventosUser)

api_route.get('/user',validateLoginUsuario,UserCtrl.getUserPassword)

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
module.exports = api_route