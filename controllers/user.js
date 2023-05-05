'use strict'
const Evento=require('../models/evento.js')
const User=require('../models/user.js')
var path = require("path");
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// a continuacion agregamos los end-point nuevos para la app qu usa users:

function getUserPassword(req, res){  
  let username=req.query.username ;  
  let password=req.query.password ;    
  User.find({ username: username, password:password},(err,cuenta)=>{
      if (err) return res.status(500).send({message:'Error al realizar la peticion'})
      if (!cuenta) {
        return res.status(404).send({message:'Nombre de usuario o contraseña incorrectos'})
      }
      else
      {
        if (cuenta.length === 0) { 
          return res.status(404).send({message:'Nombre de usuario o contraseña incorrectos'})        
        }
        else
        {
          console.log(cuenta);        
          cuenta[0].activo==0 ? res.status(404).send({message:'Usuario no activo'}) :   res.status(200).send({cuenta})
        }        
      }      
  })
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
module.exports= {    
    // a continuacion agregamos los end-point nuevos para la app qu usa users: 
    getUserPassword
}