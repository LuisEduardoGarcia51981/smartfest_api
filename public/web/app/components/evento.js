function evento(evento) {

    let index = evento.fecha_evento.search("T")
    let fecha = evento.fecha_evento.substring(0,index)
    let horario = evento.horario_inicio.substring(index+1,index+9)

    return `
<h1 class="titulo">${evento.titulo}fest</h1>
<br>
<img class="flyer" src="../../data/eventos/${evento.flyer}" alt=${evento.descripcion}>
<div class="informacion">
        <div>
        <h5>Ubicacion: ${evento.direccion}</h5>
        <h5>Horario :${horario}</h5>
        <h5>Fecha :${fecha} </h5>
        <img src="../../assets/icons/Facebook.svg" alt="">
        <img src="../../assets/icons/Instagram.svg" alt="">
        <img src="../../assets/icons/Twitter.svg" alt="">
        </div>
</div>
    `
}
export { evento }