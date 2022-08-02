var clienteActivo = JSON.parse(sessionStorage.getItem('usuario'));
console.log(clienteActivo);

document.getElementById('Bienvenida').innerHTML = 
`
<p class="tituloBienvenida">Hola, ${clienteActivo.nombre}</p>
<p class="titulo1">¿Que necesitas?</p>
`


function generarCategorias(){
    axios({
		url : 'http://localhost:3000/categorias',
		method : 'get',
		ResponseType : 'json'
	}).then((res)=>{
        {
            document.getElementById('containerCategorias').innerHTML = ""
        }
        

        (res.data).forEach(e => {
            document.getElementById('containerCategorias').innerHTML += 
            `
            <div class="col-4">
                    <div class="cardcategorias" onclick="displayCategoria('${e._id}')" >
                        <img src="${e.imagen}" class="imgCategorias" alt="">
                        <p class="letraCat">${e.nombreCategoria}</p>
                    </div>
                </div>
            `
            
        });

    }).catch(err => {
        console.log(err)
    })
};

generarCategorias();


function cerrarModal() {
    $('#exampleModalCenter2').modal('hide');
}

function displayCategoria(id){
    document.getElementById('menuEmpresa').style.display = 'block';
    document.getElementById('menuPrincipal').style.display = 'none';
    axios({
        url : 'http://localhost:3000/categorias/' + id,
        method : 'get',
        ResponseType : 'json'
    }).then((res)=>{
        let x = res.data
        {
            document.getElementById("titutoCategoria").innerHTML = ""
            document.getElementById("titutoCategoria").innerHTML = `
            <h1 id="titulo">${x.nombreCategoria}</h1>
            `
        }
        {
            document.getElementById('conteiner-Empresas').innerHTML = ""
        }
        
        for (let i = 0; i < x.empresas.length; i++) {
            document.getElementById('conteiner-Empresas').innerHTML +=
            `<div class="seccionEmpresa" onclick="modalEmpresaProducto('${id}',${i})">
            <div>
                <img src="${x.empresas[i].banner}" alt="" class="imgEmpresa">
            </div>
            
            <div class="flex" style="align-items: center;">
                <img src="${x.empresas[i].logo}" alt="" class="imgRedondaEmpresa">
                <div style="margin-top: 7px; margin-left: 10px;">
                    <p class="tituloEmpresa">${x.empresas[i].nombreEmpresa}</p>
                    <p class="titloDescripcionEmpresa" style="margin-top: 2px;">${x.empresas[i].descripcion}</p>
                </div>
            </div>

        </div>`
        }
        
    }).catch((err)=>{
        console.log(err)
    })

    
    
}

function modalEmpresaProducto(id,i){
    axios({
        url : 'http://localhost:3000/categorias/' + id,
        method : 'get',
        ResponseType : 'json'
    }).then((res)=>{
        let x = res.data.empresas[i]
        $('#exampleModalCenter').modal('show');
        {
            document.getElementById('modalEmpresaTitulo').innerHTML = ''
            document.getElementById('modalEmpresaTitulo').innerHTML = 
            `<h5 class="modal-title tituloModalEmpresa" id="exampleModalCenterTitle">${x.nombreEmpresa}</h5>`
        }
        
        document.getElementById('modalEmpresaBody').innerHTML = ''
        for (let j = 0; j < x.productos.length; j++) {
            document.getElementById('modalEmpresaBody').innerHTML += `
            <div class="flex centrar" style="margin-top: 10px ;" data-toggle="modal" data-target="#exampleModalCenter2">
                    <div class="popular flex centrar2">
                        <div class="flex ">
                            <img src="${x.productos[j].imagen}" class="imgRedondaPopular" alt="">
                            <p class="textopopular">${x.productos[j].nombreProducto}</p>
                        </div>
                        <p class="precio"> $ ${x.productos[j].precio}</p>
                    </div>
                </div>
                `
            
        }

    })

}

function displayPrincipal(){
    document.getElementById('menuEmpresa').style.display = 'none';
    document.getElementById('menuPrincipal').style.display = 'block';

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




