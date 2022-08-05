var clienteActivo = JSON.parse(sessionStorage.getItem('usuario'));




function generarOrdenes(){
axios({
        url : 'http://localhost:3000/usuarios/' + clienteActivo._id,
        method : 'get',
        ResponseType : 'json'
    }).then((res)=>{
        x= res.data.ordenes

        console.log(res.data)

        if(x.length >= 1){
            let precioPedido = 0
            let ISV = 0
            let precioTotal = 0

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

        }else{
            document.getElementById('botonProcesar').style.display = 'none'
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
};


function ProcesarOrden(){
    let subtotal = 0
    let ISV = 0.15;
    let date = new Date();

    axios({
        url : 'http://localhost:3000/usuarios/' + clienteActivo._id,
        method : 'get',
        ResponseType : 'json'
    }).then((res)=>{
        x = res.data 
        let numeroPedido = x.pedidos.length + 1
        let encargo = {
        numeroPedido : numeroPedido,
        usuario : x.nombre,
        correo  : x.correo,
        fechaPago : String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear(),
        precioPedido : 0,
        ISV : 0,
        PrecioTotal :0,
        productos : []
        }

        for (let i = 0; i < x.ordenes.length; i++) {
            encargo.productos.push({
                nombreProducto : x.ordenes[i].nombreProducto,
                cantidad: x.ordenes[i].cantidad,
                precio: x.ordenes[i].precio,
    
            });
            subtotal += x.ordenes[i].precio
            
        }
    
        encargo.ISV = ISV * subtotal
        encargo.precioPedido = subtotal
        encargo.PrecioTotal = (ISV * subtotal) + subtotal

        axios({
            url : 'http://localhost:3000/usuarios/pedido/' + clienteActivo._id,
            method : 'post',
            ResponseType : 'json',
            data: encargo
    
        }).then( res => {
            console.log(res.data)
            sessionStorage.setItem('usuario', JSON.stringify(res.data))
            ActualizarCarrito()
            window.location.href = '../html/ubicacion.html'
        }).catch ( err => {
            console.log (err)
        })


    }).catch ( err => {
        console.log (err)
    })

}

function ActualizarCarrito(){

    axios({
        url : 'http://localhost:3000/usuarios/' + clienteActivo._id,
        method : 'delete',
        ResponseType : 'json',

    }).then( res => {
        console.log("Adios")
        console.log(res.data)
    }).catch ( err => {
        console.log (err)
    })





}