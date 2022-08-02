const formularioRegistro = document.getElementById('formularioRegistro');
const formularioInicioSesion = document.getElementById('formularioInicioSesion');
const inputsRegistro = document.querySelectorAll('#formularioRegistro input');
const inputsInicioSesion = document.querySelectorAll('#formularioInicioSesion input');
var usuarioActivo 

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campoRegistro ={
	Usuario: false ,
	Contraseña: false,
	Correo: false,

}

const campoInicioSesion ={
	UsuariorRegistrado: false ,
	ContraseñaRegistrada: false,
}

const validarFormularioInicioSesion = (e) => {
	switch (e.target.name) {
		case 'usuario':
			validarCampo(expresiones.usuario, e.target, 'UsuariorRegistrado');
			break;
		case 'contraseña':
			validarCampo(expresiones.password, e.target, 'ContraseñaRegistrada');
		default:
			break;
	}
}

inputsInicioSesion.forEach(input => {

	input.addEventListener('keyup', validarFormularioInicioSesion);
	input.addEventListener('blur', validarFormularioInicioSesion);

})

const validarFormularioRegistro = (e) => {
	switch (e.target.name) {
		case "usuarionuevo":
			validarCampoRegistro(expresiones.usuario, e.target, "Usuario");
			break;
		case "contraseñanueva":
			validarCampoRegistro(expresiones.password, e.target, "Contraseña");
			break;
		case "correoelectronico":
			validarCampoRegistro(expresiones.correo, e.target, "Correo");
			break;
		default : 
		break;

	}
}

inputsRegistro.forEach(input => {

	input.addEventListener('keyup', validarFormularioRegistro);
	input.addEventListener('blur', validarFormularioRegistro);

})


const validarCampoRegistro = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo${campo}`).classList.remove('formularioGrupo-incorrecto');
		campoRegistro[campo] = true;
	}else{
		document.getElementById(`grupo${campo}`).classList.add('formularioGrupo-incorrecto');
		campoRegistro[campo] = false;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo${campo}`).classList.remove('formularioGrupo-incorrecto');
		campoInicioSesion[campo] = true;
	}else{
		document.getElementById(`grupo${campo}`).classList.add('formularioGrupo-incorrecto');
		campoInicioSesion[campo] = false;
	}
}

function Ingresar() {
	var usuario = document.getElementById('usuario').value
	var contraseña = document.getElementById('contraseña').value
	var usuarioIngresado = false


	axios({
		url : 'http://localhost:3000/usuarios',
		method : 'get',
		ResponseType : 'json'
	}).then(res => {
		(res.data).forEach( e => {
			if(e.correo == usuario && e.contraseña == contraseña){
				window.location.href = './Appcliente.html'
				sessionStorage.setItem('usuario', JSON.stringify(e))
				usuarioIngresado = true
			}
		});
		if(!usuarioIngresado){
		document.getElementById('errorInicio').style.display = "block";
		document.getElementById('errorInicio').innerHTML = '<p class="texto" style="color:red ;"> usuario o contraseña incorrecta  </p>' }

	}).catch(err => {
		console.log(err)
	})
}

function nuevoUsuario(){
	var usuario = document.getElementById('usuarionuevo').value
	var contraseña = document.getElementById('contraseñaNuevo').value
	var correo = document.getElementById('correo').value

	let usuarioNuevo =
	{
		nombre: usuario,
		correo: correo,
		contraseña: contraseña,
		latitud: "",
		longitud: "",
		ordenes: [],
		pedidos: [],
		metodoPago: []
	}

	axios({
		url : 'http://localhost:3000/usuarios',
		method : 'post',
		data : usuarioNuevo,
		ResponseType : 'json'
	}).then(res => {
		console.log(res.data)
		ingresarUsuario(usuario, contraseña)
	}).catch(err => {
		console.log(err)
	}
	)
}

function ingresarUsuario(usuario, contraseña){
	axios({
		url : 'http://localhost:3000/usuarios',
		method : 'get',
		ResponseType : 'json'
	}).then(res => {
		(res.data).forEach( e => {
			if(e.nombre == usuario && e.contraseña == contraseña){
				window.location.href = './Appcliente.html'
				sessionStorage.setItem('usuario', JSON.stringify(e))
			}
		});
	}).catch(err => {
		console.log(err)
	}
	)
}

