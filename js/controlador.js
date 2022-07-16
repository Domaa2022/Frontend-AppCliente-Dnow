

function cerrarModal() {
    $('#exampleModalCenter2').modal('hide');
}

function displayCategoria(){
    document.getElementById('menuEmpresa').style.display = 'block';
    document.getElementById('menuPrincipal').style.display = 'none';
    document.getElementById('menuUbicacion').style.display = 'none';
}

function displayPrincipal(){
    document.getElementById('menuEmpresa').style.display = 'none';
    document.getElementById('menuPrincipal').style.display = 'block';
    document.getElementById('menuUbicacion').style.display = 'none';
}

function cargarPaginaLocalizacion(){
    location.href="ubicacion.html";
}

function cargarPaginaPago() {
    location.href="pago.html";
}


function cargarPaginaDetalles() {
    location.href="detalles.html";
}