 function event_table(evento){

    let id=evento._id;
    let index = evento.fecha_evento.search("T")
    let fecha = evento.fecha_evento.substring(0,index)
    let horario = evento.horario_inicio.substring(index+1,index+9)

    return `<tr class="table-primary" id="evento-${evento._id}" >
    <td>${id}</td>
    <td>${evento.titulo}</td>
    <td>${fecha} Horario: ${horario}</td>
    <td class="buttons">
        <button type="button" onclick="view_event('${id}')" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#modal_view"><img src="../../assets/icons/view.png" alt="" srcset="" srcset="" width="36px" height="36px"></button>
        <button type="button" onclick="edit_event('${id}')" class="btn btn-warning " data-bs-toggle="modal" data-bs-target="#modalId"><img src="../../assets/icons/edit.png" alt="" sizes="" srcset="" width="36px" height="36px"></button>
        <button type="button" class="btn btn-danger" onclick="delete_event('${id}')"><img src="../../assets/icons/Delete.svg" alt="" sizes="" srcset="" width="36px" height="36px"></button>
    </td>
</tr>`
}
export {event_table}