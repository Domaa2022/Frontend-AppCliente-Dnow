
var clienteActivo = JSON.parse(sessionStorage.getItem('usuario'));



( () => {
    axios({
        url : 'http://localhost:3000/usuarios/' + clienteActivo._id,
        method : 'get',
        ResponseType : 'json'
    }).then((res)=>{
        console.log(res.data)

    axios({
        url : 'http://localhost:3000/usuarios/' + clienteActivo._id,
        method : 'delete',
        ResponseType : 'json',

    }).then( res => {
        console.log("Adios")
        console.log(res.data)
    }).catch ( err => {
        console.log (err)
    }) })

}) ();




document.getElementById('inputNumero').addEventListener('keyup', (e) => {
    let valorInput = e.target.value;
    document.getElementById('inputNumero').value = valorInput
        //*elimina espacios
        .replace(/\s/g, '')
        //*eliminar letras
        .replace(/\D/g, '')
        // Ponemos espacio cada cuatro numeros
        .replace(/([0-9]{4})/g, '$1 ')
        // Elimina el ultimo espaciado
        .trim();


})

document.getElementById('inputNombre').addEventListener('keyup', (e) => {
    let valorInputNombre = e.target.value
    document.getElementById('inputNombre').value = valorInputNombre
        .replace(/[0-9]/g, '')
})

document.getElementById('inputCVV').addEventListener('keyup', (e) => {
    document.getElementById('inputCVV').value = document.getElementById('inputCVV').value
        // Eliminar los espacios
        .replace(/\s/g, '')
        // Eliminar las letras
        .replace(/\D/g, '');
});


function detalles(){
    let nombre = document.getElementById('inputNombre').value
    let numero  = document.getElementById('inputNumero').value
    let fecha  = document.getElementById('inputMes').value
    let cvv = document.getElementById('inputCVV'). value 

    if( nombre,numero,fecha,cvv == ""){
        alert("introdusca su valores ")
    }else{
        enviar();
    }

    
}



function enviar (){
    window.location.replace("../html/detalles.html")
}


