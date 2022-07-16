function displayLaining() {
    document.getElementById("Laining").style.display = "block";
    document.getElementById("iniciarSeccion").style.display = "none";
    document.getElementById("Registro").style.display = "none";
}

function displayRegistro() {
    document.getElementById("Laining").style.display = "none";
    document.getElementById("iniciarSeccion").style.display = "none";
    document.getElementById("Registro").style.display = "block";
}

function displayIniciarSesion() {
    document.getElementById("Laining").style.display = "none";
    document.getElementById("iniciarSeccion").style.display = "block";
    document.getElementById("Registro").style.display = "none";
}