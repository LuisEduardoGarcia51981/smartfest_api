'use strict'
const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')



//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// a continuacion agregamos los end-point nuevos para la app que usa users:

//Verificar login usuario
const validateLoginUsuario = [
  check('username')
    .exists().withMessage('El campo username es obligatorio')
    .notEmpty().withMessage('El campo username no puede ser vacio'),   
  check('password')
    .exists().withMessage('El campo password es obligatorio')
    .notEmpty().withMessage('El campo password no puede ser vacio'),         
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
  
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
module.exports = { validateLoginUsuario }