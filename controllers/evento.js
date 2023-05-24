'use strict'
const Evento=require('../models/evento.js')
const multer  = require('multer')
const fs = require('fs'); 
var path = require("path");
const mongoose=require('mongoose')

function updateEvento(req,res){
    let eventoId=req.params.eventoId    
    Evento.findById(eventoId, (err, eventoReturn) =>{
      if (err) return res.status(500).send({message:'Error al realizar la petición'})
      if (!eventoReturn) return res.status(404).send({message:'El evento no existe'})           
      if (req.file.buffer !=''){
        // si no es el fake file
        //eliminamos la imagen del flyer:
        try {
          fs.unlinkSync('./public/web/data/eventos/'+eventoReturn.flyer)        
        } catch(err) {        
          //return res.status(404).send({message:'Server Error: Problemas en la edicion del archivo'})  
        }   
      }
               
    })
    let update=req.body  
    let nombre_archivo=''; 
    let newpath =''
    if (req.file.buffer !=''){
      //se realiza si no es el fake file
      const extension=req.file.originalname.slice(req.file.originalname.lastIndexOf('.'))                
      nombre_archivo=Date.now()+extension    
      newpath = `./public/web/data/eventos/${nombre_archivo}`; 
    }        
        
    /*if (req.file.buffer !=''){
      console.log("es un archivo comun")
    }else
    {
      console.log("es el file fake")
      
    }*/
    if (req.file.buffer !=''){
      //se realiza si no es el fake file
      try {
        fs.writeFileSync(newpath, req.file.buffer);
        console.log("File written successfully");
      } catch(err) {
        console.error(err);
      }
    }
    
    let fecha_hora=req.body.fecha_evento+' '+req.body.horario_inicio 
    let in_redes_sociales=[]
    if (typeof req.body.redes_sociales === 'string' || req.body.redes_sociales instanceof String)  
        in_redes_sociales = JSON.parse(req.body.redes_sociales);  
        
    let record={     
        titulo: update.titulo,
        fecha_evento:update.fecha_evento,
        horario_inicio:fecha_hora,        
        descripcion:update.descripcion,
        direccion:update.direccion, 
        tipofiesta:update.tipofiesta,
        clasificacion:update.clasificacion  ,
        activo:update.activo,
        //flyer:nombre_archivo,
        create_lastup:Date.now(),
        redes_sociales: in_redes_sociales,                                 
        id_usuario:update.id_usuario,             
    };   
    if (req.file.buffer !=''){
      //se realiza si no es el fake file      
      record.flyer = nombre_archivo;
      //console.log("agregamos el elemento flyer")
    }else
    {
      //console.log("NO agregamos el elemento flyer")
    }
    
    Evento.findByIdAndUpdate(eventoId,record,{new: true},  (err, eventoUpdated)=>{
        if (err) 
        {            
            return res.status(500).send({message:'Error al actualizar el evento'})
        }        
       res.status(200).send({obj_evento:eventoUpdated})
    })
}
function getEvento(req, res){
    let eventoId= req.params.eventoId
    console.log(eventoId);    
    Evento.findById(eventoId, (err, eventoReturn) =>{

      if (err) return res.status(500).send({message:'Error al realizar la petición'})
      if (!eventoReturn) return res.status(404).send({message:'El evento no existe'})      
      res.status(200).send({obj_evento:eventoReturn})
    })
}
function getEventos(req, res){  
    let limit=req.body.limit
    let skip=req.body.skip     
    Evento.find({},(err,eventos)=>{
        if (err) return res.status(500).send({message:'Error al realizar la peticion'})
        if (!eventos) return res.status(404).send({message:'Eventos no encontrados'})
        res.status(200).send({eventos})
    }).skip(skip).limit(limit)
}

function saveEvento(req, res,next){         
        const extension=req.file.originalname.slice(req.file.originalname.lastIndexOf('.'))                
        let nombre_archivo=Date.now()+extension  
        const newpath = `./public/web/data/eventos/${nombre_archivo}`;    
        fs.writeFileSync(newpath, req.file.buffer);       
        let in_redes_sociales=[]              
        if (typeof req.body.redes_sociales === 'string' || req.body.redes_sociales instanceof String)  
            in_redes_sociales = JSON.parse(req.body.redes_sociales);  //JSON.stringify(req.body.redes_sociales); 
        let obj_evento=new Evento()  
        obj_evento.titulo=req.body.titulo
        obj_evento.fecha_evento=req.body.fecha_evento
        obj_evento.horario_inicio=req.body.horario_inicio
        let fecha_hora=req.body.fecha_evento+' '+req.body.horario_inicio                
        obj_evento.horario_inicio=fecha_hora
        obj_evento.descripcion=req.body.descripcion
        obj_evento.direccion=req.body.direccion     
        obj_evento.tipofiesta=req.body.tipofiesta 
        obj_evento.clasificacion=req.body.clasificacion  
        obj_evento.activo=req.body.activo   
        obj_evento.flyer=nombre_archivo     
        obj_evento.create_date=Date.now()  
        obj_evento.create_lastup=obj_evento.create_date        
        //let el_id_usuario=parseInt(req.body.id_usuario);
        //let objectIdUser = mongoose.Types.ObjectId(el_id_usuario);
        //obj_evento.id_usuario=objectIdUser
        obj_evento.id_usuario=req.body.id_usuario
        obj_evento.redes_sociales=in_redes_sociales                
        obj_evento.save((err,eventoStored)=>{
            if (err) {              
              return res.status(500).send({message:'Error al guardar el evento en la base de datos'+err})  

            }            
            return res.status(200).send({obj_evento:eventoStored})
        })                    
}
function deleteEvento(req,res){
    let eventoId=req.params.eventoId            
    Evento.findById(eventoId, (err, eventoReturn) =>{

      //verificamos si el evento a eliminar existe:
      if (err) return res.status(500).send({message:'Error al borrar el evento, no existe'})
      if (!eventoReturn) return res.status(404).send({message:'El evento no existe'})          
      //eliminamos la imagen del flyer:
      let imagen='../public/web/data/eventos/'+eventoReturn.flyer      
      try {
        fs.unlinkSync(imagen)        
      } catch(err) {        
        //return res.status(404).send({message:'Problemas en la eliminación del archivo. Probablemente no se encontro la imagen'})  
      }                         
          
         eventoReturn.remove(err => {
             if (err) res.status(404).send({message:'El evento no se ha podido eliminar'})
             res.status(200).send({message:'El evento se ha eliminado correctamente'})
         })    
       
     
    })
}
function getEventosScroll(req, res){  
  let limit=8 // cuantos despues de skip  
  let skip=(req.query.page) * limit; //desde donde 
  let userId=req.query.userId;
  Evento.find({id_usuario: userId},(err,eventos)=>{
      if (err) return res.status(500).send({message:'Error al realizar la peticion'})
      if (!eventos) return res.status(404).send({message:'Eventos no encontrados'})
      res.status(200).send({eventos})
  }).skip(skip).limit(limit).sort({ create_date: -1 })
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// a continuacion agregamos los end-point nuevos para la app qu usa users:
//({ name: 'john', age: { $gte: 18 } })
function getEventosUser(req, res){
  let userId=req.query.userId;  
  //console.log(userId);
  Evento.find({ id_usuario: userId},(err,eventos)=>{
      if (err) return res.status(500).send({message:'Error al realizar la peticion'})
      if (!eventos) return res.status(404).send({message:'Productos del usuario solicitado no encontrados'})      
      res.status(200).send({eventos})
  })
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
module.exports= {
    saveEvento,
    updateEvento,
    getEvento,
    getEventos,
    deleteEvento,
    // a continuacion agregamos los end-point nuevos para la app qu usa users:
    getEventosUser,
    getEventosScroll
}