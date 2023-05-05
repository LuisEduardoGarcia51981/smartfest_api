import { getEventos, getEventoById, crearEvento, status, editarEvento,eliminarEvento } from '../services/eventos-services.js'
import { event_table } from '../components/event_table.js'
import { evento } from '../components/evento.js'
var input_event;
var form_data;
document.addEventListener("DOMContentLoaded", () => {
  let estado = document.getElementById("admin")
  status().then(e => {
    estado.innerHTML = e.user;
  })
  const form = document.getElementById("form");
  form_data = new FormData(form)

  input_event =
  {
    titulo: document.getElementById("titulo"),
    ubicacion: document.getElementById("ubicacion"),
    fecha_inicio: document.getElementById("fecha_incio"),
    descripcion: document.getElementById("descripcion"),
    flyer: document.getElementById("flyer"),
    tipo_evento: document.getElementById("nombre_evento"),
    facebook: document.getElementById("facebook"),
    twitter: document.getElementById("twitter")
  }

})

window.create_event = function (id_evento) {
  input_event.ubicacion.value = ""
  input_event.titulo.value = ""
  input_event.fecha_inicio.value = ""
  input_event.flyer.value = ""
  input_event.descripcion.value = ""
  input_event.facebook.value = ""
  input_event.twitter.value = ""
}

window.delete_event = function (id_evento) {
  let event = document.getElementById("evento-" + id_evento);
  event.innerHTML = " "

  eliminarEvento(id_evento).then(()=>{
    alert("Evento eliminado con exito")
  }).catch(err =>{
    alert("Fallo en eliminacion "+JSON.stringify(err))
  })
}

window.save_event = function () {
  const form = document.getElementById("form");
  form_data = new FormData(form)
  let date = form_data.get("fecha_inicio")
  let index = date.search("T")
  let fecha = date.substring(0, index)

  let cad_redes = '[{ "red":"facebook" ,"link":"' + form_data.get("facebook") + '"},{"red":"twiter", "link":"' + form_data.get("twitter") + '" }]'
  const evento = {
    id_usuario: 1,
    direccion: form_data.get("direccion_evento"),
    titulo: form_data.get("nombre_evento"),
    file: form_data.get("flyer"),
    fecha_evento: fecha,
    horario_inicio: date.substring(index + 1) + ":00",
    descripcion: form_data.get("descripcion"),
    redes_sociales: cad_redes,

  }
  crearEvento(evento).then((res) => {
    alert("creado con exito")
    location.reload ()
  }).catch(errores =>{
    alert("errores en "+JSON.stringify(errores))
  })

}

window.edit_event = function (id_evento) {
  getEventoById(id_evento).then(e => {
    let img = document.getElementById("img_edit")
    img.src = '../../data/eventos/' + e.flyer
    let index = e.fecha_evento.search("T")
    let fecha = e.fecha_evento.substring(0, index)
    let hora = e.horario_inicio.substring(index + 1, index + 6)
    let fomarto_fecha = fecha + "T" + hora

    input_event.titulo.value = e.titulo;
    input_event.ubicacion.value = e.direccion;
    input_event.descripcion.value = e.descripcion;
    input_event.twitter.value = e.redes_sociales[1].link
    input_event.facebook.value = e.redes_sociales[0].link
    input_event.fecha_inicio.value = fomarto_fecha



    const boton_save = document.getElementById("create|edit")
    boton_save.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button  type="button" class="btn btn-primary" onclick="edit_save('${id_evento}')">Editar</button>`
  })
}

window.edit_save = function (id_evento) {

  const form = document.getElementById("form");
  form_data = new FormData(form)
  let date = form_data.get("fecha_inicio")
  let index = date.search("T")
  let fecha = date.substring(0, index)

  let cad_redes = '[{ "red":"facebook" ,"link":"' + form_data.get("facebook") + '"},{"red":"twiter", "link":"' + form_data.get("twitter") + '" }]'
  const evento = {
    id_usuario: 1,
    direccion: form_data.get("direccion_evento"),
    titulo: form_data.get("nombre_evento"),
    file: form_data.get("flyer"),
    fecha_evento: fecha,
    horario_inicio: date.substring(index + 1) + ":00",
    descripcion: form_data.get("descripcion"),
    redes_sociales: cad_redes,

  }

  editarEvento(evento, id_evento).then((res) => {    
    alert("Editado con exito")
    location.reload ()
  }
  ).catch(errores =>{
    alert("errores en "+JSON.stringify(errores))
  })

}

window.view_event = function (id) {
  let modal = document.getElementById('modal_view_body')
  console.log(modal)
  getEventoById(id).then((event) => {
    modal.innerHTML = evento(event)
  })
}


var modalId = document.getElementById('modalId');
var eventos;
getEventos().then((data) => {
  eventos = data;
  data_tabla()
});


function data_tabla() {
  const table = document.getElementById("data_tabla")

  eventos.eventos.forEach(evento => {
    table.innerHTML += (event_table(evento));
  });

}



