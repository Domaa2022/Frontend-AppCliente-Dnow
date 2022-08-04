var clienteActivo = JSON.parse(sessionStorage.getItem('usuario'));




function generarOrdenes(){
axios({
        url : 'http://localhost:3000/usuarios/' + clienteActivo._id,
        method : 'get',
        ResponseType : 'json'
    }).then((res)=>{
        x= res.data.ordenes
        var precioPedido = 0
        var ISV = 0
        var precioTotal = 0

        document.getElementById('ordenes').innerHTML = ""

        for(let i = 0; i < x.length; i++){
            document.getElementById('ordenes').innerHTML +=
            `
            <div class="flex centrar" style="margin-top: 10px ;" data-toggle="modal" data-target="#exampleModalCenter">
            <div class="popular flex centrar2">
                <div class="flex ">
                    <img src="${x[i].imagenProducto}" class="imgRedondaPopular" alt="">
                    <div class="flex" style="flex-direction: column;">
                        <p class="textopopular" style="justify-content: normal;">${x[i].nombreProducto}</p>
                        <p class="textopopular" style="justify-content: normal;">${x[i].descripcion}</p>
                        <p class="textopopular" style="justify-content: normal;">Cantidad :${x[i].cantidad}</p>
                    </div>
                    
                </div>

                <div class="flex" style="flex-direction: column; align-items: center;">
                <p class="precio"> $ ${x[i].precio}</p>
                <i class="fa-solid fa-trash"style="color: #004FA8;" onclick = "eliminarProducto(${i})" ></i>
                </div>
                
            </div>
            </div>
            `
            precioPedido = precioPedido + x[i].precio

        }
        
            
            
            
        

        ISV = ISV + (precioPedido * 0.15)
        precioTotal = precioTotal + (precioPedido + ISV)

        {
            document.getElementById('totalPedido').innerHTML = `
            <div  class="flex" style="justify-content: space-between ;">
            <p class="textoCarritoProcesar">Sub total </p>
            <p class="textoCarritoProcesar"> $${precioPedido}</p>
            </div>
            <div class="flex" style="justify-content: space-between ;">
                <p class="textoCarritoProcesar">ISV</p>
                <p class="textoCarritoProcesar"> $${ISV} </p>
            </div>
            <div class="flex" style="justify-content: space-between ;">
                <p class="textoCarritoProcesar">Total </p>
                <p class="textoCarritoProcesar"> $${precioTotal}</p>
            </div>
            `
        }

    }).catch(err => {
        console.log(err)
    })
}

generarOrdenes();

function eliminarProducto(indiceProducto){
    let indiceProductoEnviar = indiceProducto
    
    axios({
        url : 'http://localhost:3000/usuarios/' + clienteActivo._id + "/" + indiceProductoEnviar,
        method : 'delete',
        ResponseType : 'json'

    }).then(res =>{
        console.log(res.data)
        generarOrdenes();
        

    }).catch(err => {
        console.log(err)
    })
}