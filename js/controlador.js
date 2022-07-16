

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

function displayUbicacion(){
    document.getElementById('menuUbicacion').style.display = 'block';
    document.getElementById('menuPrincipal').style.display = 'none';
}
