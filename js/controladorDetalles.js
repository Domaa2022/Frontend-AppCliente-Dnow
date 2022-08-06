var clienteActivo = JSON.parse(sessionStorage.getItem('usuario'));

document.getElementById('detallesPedido').innerHTML = ''

axios({
    url : 'http://localhost:3000/usuarios/' + clienteActivo._id,
    method : 'get',
    ResponseType : 'json'
}).then((res)=>{
    let x = res.data.pedidos[0]
    console.log(x)
    document.getElementById('detallesPedido'). innerHTML = 
    `<p class="TituloDetalles"> Pedido:  #${x.numeroPedido}</p>
    <br>
    <div class="flex">
        <p class="textoDetalle">Estado: </p>
        <p class="textoDetalle">${x.Estado}</p>
    </div><div class="flex">
        <p class="textoDetalle">Fecha de pago:</p>
        <p class="textoDetalle">${x.fechaPago}</p>
    </div>
    <div class="flex">
        <p class="textoDetalle">Fecha de entrega:</p>
        <p class="textoDetalle">${x.fechaEntrega}</p>
    </div>
    <br>
    <br>
    <div class="flex">
        <p class="textoDetalle">Recibe:</p>
        <p class="textoDetalle">${x.Recibe}</p>
    </div>
    <div class="flex">
        <p class="textoDetalle">Correo:</p>
        <p class="textoDetalle">${x.correoMotorista}</p>
    </div>
    <div class="flex">
        <p class="textoDetalle">Lugar de entrega:</p>
        <p class="textoDetalle">Latitud: ${res.data.latitud} Longitud : ${res.data.longitud}</p>
    </div>`

    document.getElementById('detallesBody').innerHTML = ''
    x.productos.forEach(e => {
        document.getElementById('detallesBody').innerHTML +=
        `<div class="flex" style="justify-content: space-between;">
            <div>
                <p class="textoDetalle">${e.nombreProducto}, </p>
                <p class="textoDetalle">cantidad : ${e.cantidad}</p>
            </div>
            <p class="textoDetalle">$${e.precio}</p>
        </div>
        `
    });

    document.getElementById('detallesPrecios').innerHTML = ''
    document.getElementById('detallesPrecios').innerHTML =
    `
    <div  class="flex" style="justify-content: space-between ;">
        <p class="textoCarritoProcesar">Sub total: </p>
        <p class="textoCarritoProcesar"> $ ${x.precioPedido}</p>
    </div>
    <div class="flex" style="justify-content: space-between ;">
        <p class="textoCarritoProcesar"> ISV: </p>
        <p class="textoCarritoProcesar"> $ ${x.ISV}</p>
    </div>
    <div class="flex" style="justify-content: space-between ;">
        <p class="textoCarritoProcesar">Total:</p>
        <p class="textoCarritoProcesar"> $ ${x.precioTotal}</p>
    </div>
    `



})
