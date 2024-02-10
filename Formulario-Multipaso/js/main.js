

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formRegistro");
    const pasos = document.querySelectorAll(".paso");
    const botonesSiguiente = document.querySelectorAll(".btn-siguiente");
    const progressBar = document.querySelector(".progress-bar")
    const botonesAnterior = document.querySelectorAll(".btn-anterior");
    let pasoActual = 1;


    function actualizarBarraDeProgreso() {
        const progreso = ((pasoActual - 1) / (pasos.length - 1)) * 100;
        console.log(progreso);
        progressBar.style = `width: ${progreso}%`
    }

    function comprobarCorreo(correo) {
        // Expresión regular para validar el correo electrónico
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return expresionRegular.test(correo);
    }

    function comprobarTelefono(telefono) {
        // Expresión regular para validar el número de teléfono
        const expresionRegular = /^(34|6|7|8|9)(\d{8})$/;

        // Verificar si el número de teléfono cumple con la expresión regular
        return expresionRegular.test(telefono);
    }

    function comprobarNombreOApellido(nombreOApellido) {
        // Expresión regular para validar que el primer carácter sea una mayúscula y haya al menos un carácter en minúscula
        const expresionRegular = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

        // Verificar si la cadena cumple con la expresión regular
        return expresionRegular.test(nombreOApellido);
    }

    function siguientePaso() {


        // Obtener el paso actual visible
        const pasoVisible = document.querySelector('.paso:not([style*="display: none"])');

        // Obtener todos los campos de entrada dentro del paso actual
        const campos = pasoVisible.querySelectorAll(".input-required");

        // Verificar si alguno de los campos está vacío
        let algunCampoVacio = false;

        campos.forEach(function (campo) {
            if (!campo.value.trim() || (campo.id == "nombre" && !comprobarNombreOApellido(campo.value.trim())) || (campo.id == "apellido" && !comprobarNombreOApellido(campo.value.trim())) || campo.value === "0" || (campo.id == "email" && !comprobarCorreo(campo.value.trim())) || (campo.id == "tel" && !comprobarTelefono(campo.value.trim()))) {

                algunCampoVacio = true;
                // Resaltar el campo en rojo si está vacío
                campo.style.border = "2px solid red";
                campo.style.backgroundColor = "#FEE";
            } else {
                // Restablecer el estilo si el campo no está vacío
                campo.style.border = "";
                campo.style.backgroundColor = "";
            }
        });

        if (algunCampoVacio) {

            comprobarInput();

        } else {
            if (verificarSeleccion()) {
                pasos[pasoActual - 1].style.display = "none";
                pasoActual++;
                if (pasoActual > pasos.length) {
                    pasoActual = pasos.length;
                }
                pasos[pasoActual - 1].style.display = "block";
                actualizarBarraDeProgreso();
            }
        }
    }


    function pasoAnterior() {
        pasos[pasoActual - 1].style.display = "none";
        pasoActual--;
        if (pasoActual < 1) {
            pasoActual = 1;
        }
        pasos[pasoActual - 1].style.display = "block";
        actualizarBarraDeProgreso();
    }

    function comprobarInput() {
        // Obtener el paso actual
        const pasoActual = document.querySelector('.paso:not([style*="display: none"])');

        // Obtener todos los campos de entrada dentro del paso actual
        const campos = pasoActual.querySelectorAll(".input-required");


        // Recorrer los campos de entrada del paso actual
        campos.forEach(function (campo) {
            // Verificar si el campo está en blanco
            if (campo.value.trim() === "" || (campo.id == "nombre" && !comprobarNombreOApellido(campo.value.trim())) || (campo.id == "apellido" && !comprobarNombreOApellido(campo.value.trim())) || campo.value == "0" || (campo.id == "email" && !comprobarCorreo(campo.value.trim())) || (campo.id == "tel" && !comprobarTelefono(campo.value.trim()))) {
                // Resaltar el campo en rojo
                campo.style.border = "2px solid red";
                campo.style.backgroundColor = "#FEE";

                // Agregar evento blur para cada campo para detectar cuando el usuario sale del campo sin completarlo
                campo.addEventListener("blur", function () {
                    // Si el campo está vacío cuando el usuario sale de él, resaltar en rojo
                    if (campo.value.trim() === "" || campo.value == "0") {
                        campo.style.border = "2px solid red";
                        campo.style.backgroundColor = "#FEE";
                    }
                });
            } else {
                // Restablecer el estilo si el campo no está en blanco
                campo.style.border = "";
                campo.style.backgroundColor = "";
            }
        });

        // Agregar evento input para cada campo para detectar cuando se escriba algo
        campos.forEach(function (campo) {
            campo.addEventListener("input", function () {
                // Si el campo deja de estar vacío, quitar el estilo de resaltado rojo
                if (campo.value.trim() !== "") {
                    campo.style.border = "";
                    campo.style.backgroundColor = "";
                }
            });
        });

    }


    botonesSiguiente.forEach((boton) => {


        boton.addEventListener("click", function () {
            siguientePaso();
        });


    });

    botonesAnterior.forEach((boton) => {
        boton.addEventListener("click", pasoAnterior);
    });

    formulario.addEventListener("submit", (e) => e.preventDefault());
});

document.getElementById('selectPlanta').addEventListener('change', function () {
    var plantaSeleccionada = this.value;
    var departamentoSelect = document.getElementById('selectDepartamento');
    departamentoSelect.innerHTML = ''; // Limpiar las opciones anteriores

    if (plantaSeleccionada === 'plantaCentral') {
        agregarOpcion(departamentoSelect, 'software', 'Departamento de Ingeniería de Software');
        agregarOpcion(departamentoSelect, 'desarrolloWeb', 'Departamento de Desarrollo Web');
        agregarOpcion(departamentoSelect, 'seguridadInformatica', 'Departamento de Seguridad Informática');
        agregarOpcion(departamentoSelect, 'infraestructura', 'Departamento de Infraestructura Tecnológica');
    } else if (plantaSeleccionada === 'plantaProduccion') {
        agregarOpcion(departamentoSelect, 'experienciaUsuario', 'Departamento de Experiencia de Usuario (UX)');
        agregarOpcion(departamentoSelect, 'investigacion', 'Departamento de Investigación y Desarrollo (I+D)');
        agregarOpcion(departamentoSelect, 'mantenimiento', 'Departamento de Mantenimiento y Soporte');
        agregarOpcion(departamentoSelect, 'logistica', 'Departamento de Logística');
    } else if (plantaSeleccionada == 'plantaOperaciones') {
        agregarOpcion(departamentoSelect, 'gestionProyectos', 'Departamento de Gestión de Proyectos');
        agregarOpcion(departamentoSelect, 'recursosHumanos', 'Departamento de Gestión de Recursos Humanos');
        agregarOpcion(departamentoSelect, 'operacionProcesos', 'Departamento de Operaciones y Procesos');
        agregarOpcion(departamentoSelect, 'controlCalidad', 'Departamento de Control de Calidad');

    }
});

// Función auxiliar para agregar opciones a un select
function agregarOpcion(selectElement, value, text) {
    var option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

document.getElementById("finalizar").addEventListener("click", function () {
    // Recuperar los valores de los campos de entrada
    var campo7Value = document.getElementById("campo7").value;
    var campo8Value = document.getElementById("campo8").value;

    // Realizar los cálculos
    var resultado = parseFloat(campo7Value) + parseFloat(campo8Value);

    // Mostrar el presupuesto final
    alert("El presupuesto final es: " + resultado);
});



function verificarSeleccion() {
    var opciones = document.getElementsByName('genero');
    var seleccionado = false;
    for (var i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        alert("Seleccione su género antes de continuar.");
    }
    return seleccionado;
}











