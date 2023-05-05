function card(evento){

    let id=evento._id;
    let index = evento.fecha_evento.search("T")
    let fecha = evento.fecha_evento.substring(0,index)

    return `<div class="card" onclick="go('${id}')" >
                <div class="image" style="background-image: url(../../data/eventos/${evento.flyer})">
                </div><h2>${evento.titulo}</h2>
                    <div class="card-content">
                    <h2></h2>
                    <h3>Ubicacion: ${evento.direccion}</h3>
                    <h3>Fecha: ${fecha}</h3>
                </div>
            </div>`;
}
export {card}