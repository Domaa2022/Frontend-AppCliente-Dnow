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


function mostrarfecha(){

}