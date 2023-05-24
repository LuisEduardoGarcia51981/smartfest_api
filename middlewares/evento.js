'use strict'
const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCreate = [
  check('titulo')
    .exists().withMessage('El campo titulo no existe')
    .trim()
    .notEmpty().withMessage('El campo titulo no puede ser vacio'),
  check('fecha_evento')
    .exists().withMessage('El campo fecha_evento no existe')
    .not()
    .isEmpty().withMessage('El campo fecha_evento no puede ser vacio')
    .isDate().withMessage('El campo fecha_evento no es una fecha valida. yyyy-mm-dd')
    .isAfter().withMessage('El campo fecha_evento ya caduco'),
  check('id_usuario')
    .exists().withMessage('El campo id_usuario no existe')
    .trim()
    .notEmpty().withMessage('El campo id_usuario no puede ser vacio')
    .isInt().withMessage('El campo id_usuario no es un número'),
  check('horario_inicio')
    .exists().withMessage('El campo horario_inicio no existe')
    .trim()
    .notEmpty().withMessage('El campo horario_inicio no puede ser vacio')
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).withMessage('El campo horario_inicio no es una hora valida. hh:mm:ss'),
  check('file')
    .custom((value, { req }) => {
      if (req.file.fieldname !== "") {
        return true;
      } else {
        return false;
      }
    })
    .withMessage('Imagen inexistente')
    .custom((value, { req }) => {
      if (req.file.mimetype === "image/jpg" || req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/png" || req.file.mimetype === "image/bmp") {
        return '.imagen'; // return "non-falsy" value to indicate valid data"
      } else {
        return false; // return "falsy" value to indicate invalid data
      }
    })
    .withMessage('Ingreso una imagen con una extension no valida- solo jpg, jpeg, png y bmp.'), // custom error message that will be send back if the file in not a pdf.

  (req, res, next) => {

    validateResult(req, res, next)

  }
]

const validateEdit = [
  check('eventoId')
    .exists().withMessage('El eventoId es obligatorio')
    .notEmpty().withMessage('El eventoId no puede ser vacio')
    .isAlphanumeric().withMessage('El campo eventoId no es un identificador valido para eventos'),
  check('titulo')
    .custom((value, { req }) => {
      if (typeof (value) != "undefined") { //titulo existe          
        if (value.trim() === "") {
          throw new Error('El campo titulo no puede ser vacio')
        }
        else {
          return true
        }
      }
      else {
        return true;
      };
    }),
  check('fecha_evento')
    .custom((value, { req }) => {
      if (typeof (value) != "undefined") { //fecha_evento existe             
        if (value.trim() === "") {
          throw new Error('El campo fecha_evento no puede ser vacio')
        }
        else {
          var RegExPattern = /[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
          if ((value.match(RegExPattern)) && (value != '')) {  // es una fecha valida
            var date_actual = new Date;
            var date_evento = new Date(value);
            if (date_evento < date_actual)  //la fecha caduco
            {
              throw new Error('El campo fecha_evento ya caduco')
            }
            else  //la fecha no caduco
            {
              return true;

            }
          } else { //no es una fecha valida

            throw new Error('El campo fecha_evento no es una fecha valida. yyyy-mm-dd')
          }
        }
      }
      else {
        return true;
      };
    }),
  check('id_usuario')
    .custom((value, { req }) => {
      if (typeof (value) != "undefined") { //id_usuario existe                 
        if (value.trim() === "") { throw new Error('El campo id_usuario no puede ser vacio'); }
        else {
          if (isNaN(value)) { //No es un numero entero                
            throw new Error('El campo id_usuario no es un identificador de usuario válido')
          }
          else { return true; }
        }
      }
      else { return true };
    }),
  check('horario_inicio')
    .custom((value, { req }) => {
      if (typeof (value) != "undefined") { //horario_inicio existe                 
        if (value.trim() === "") {
          throw new Error('El campo horario_inicio no puede ser vacio');
        }
        else {
          var RegExPattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
          if ((value.match(RegExPattern)) && (value != '')) {  // es un horario valido
            return true;

          } else { //no es un horario valido

            throw new Error('El campo horario_inicio no es una hora valida. hh:mm:ss')
          }
        }
      }
      else {
        return true
      };
    }),
  check('file')
    .custom((value, { req }) => { 
      if (typeof (value) != "undefined") { //el archivo existe        
             
        if (req.file !== "" && req.file !== undefined) {
          console.log("aca2")

          if (req.file.mimetype === "image/jpg" || req.file.mimetype === "image/jpeg" ||
            req.file.mimetype === "image/png" || req.file.mimetype === "image/bmp") {
            return true;
          }
          else {

            throw new Error('Ingreso una imagen con una extension no valida- solo jpg, jpeg, png y bmp.')
          }
        }
        else {
          throw new Error('Imagen inexistente ' +req.file)
        }
      }
      else {
        if (req.file.fieldname !== "") {
          if (req.file.mimetype === "image/jpg" || req.file.mimetype === "image/jpeg" ||
            req.file.mimetype === "image/png" || req.file.mimetype === "image/bmp") {
            return true;
          } else {
            throw new Error('Ingreso una imagen con una extension no valida- solo jpg, jpeg, png y bmp.')
          }
        }
        else {
          console.log("en igual");
          throw new Error('Imagen inexistente en igual')
        }
      };
    }),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validateGetEventosScroll = [
  check('page')
    .exists().withMessage('El número de página es obligatorio')
    .notEmpty().withMessage('El número de página no puede ser vacio')
    .isNumeric().withMessage('El campo page no es un identificador válido para páginas, tiene que ser un número'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validateGetEvento = [
  check('eventoId')
    .exists().withMessage('El eventoId es obligatorio')
    .notEmpty().withMessage('El eventoId no puede ser vacio')
    .isAlphanumeric().withMessage('El campo eventoId no es un identificador valido para eventos'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
const validateGetEventos = [
  check('limit')
    .exists().withMessage('El campo limit es obligatorio')
    .notEmpty().withMessage('El campo limit no puede ser vacio')
    .isNumeric().withMessage('El campo limit no es un numero')
    .custom((value, { req, }) => {
      if (value < 0) {
        throw new Error('El campo limit tiene que ser mayor o igual a 0')
      }
      return true
    }),
  check('skip')
    .exists().withMessage('El campo skip es obligatorio')
    .notEmpty().withMessage('El campo skip no puede ser vacio')
    .isNumeric().withMessage('El campo skip no es un numero')
    .custom((value, { req, }) => {
      if (value < 0) {
        throw new Error('El campo skip tiene que ser mayor o igual a 0')
      }
      return true
    }),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
const validateDeleteEvento = [
  check('eventoId')
    .exists().withMessage('El eventoId es obligatorio')
    .notEmpty().withMessage('El eventoId no puede ser vacio')
    .isAlphanumeric().withMessage('El campo eventoId no es un identificador valido para eventos'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// a continuacion agregamos los end-point nuevos para la app qu usa users:

//Buscar todos los eventos creados por un usuario:
const validateGetEventosUser = [
  check('userId')
    .exists().withMessage('El campo userId es obligatorio')
    .notEmpty().withMessage('El campo userId no puede ser vacio'),         
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
module.exports = {validateGetEventosScroll,validateGetEventosUser, validateCreate, validateEdit, validateGetEvento, validateGetEventos, validateDeleteEvento }
//module.exports = { validateCreate, validateEdit, validateGetEvento, validateGetEventos, validateDeleteEvento }