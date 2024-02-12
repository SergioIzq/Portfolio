

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formRegistro");
    const pasos = document.querySelectorAll(".paso");
    const botonesSiguiente = document.querySelectorAll(".btn-siguiente");
    const progressBar = document.querySelector(".progress-bar")
    const botonesAnterior = document.querySelectorAll(".btn-anterior");
    let pasoActual = 1;
    const SALARIO_MINIMO_INTERPROFESIONAL = 950;


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
        const expresionRegular = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s']{1,25}$/;

        // Verificar si la cadena cumple con la expresión regular
        return expresionRegular.test(nombreOApellido);
    }

    function siguientePaso() {


        let errorNombreMostrado = false;
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

                if ((campo.id == "nombre" || campo.id == "apellido" || campo.id == "apellido") && !errorNombreMostrado) {
                    alert("Formato del nombre o apellidos incorrectos");
                    errorNombreMostrado = true;

                }

                // Mostrar mensaje de error si el formato del teléfono o correo es incorrecto
                if (campo.id == "email") {
                    alert("El formato del correo electrónico es incorrecto");
                    errorCorreoMostrado = true;
                } else if (campo.id == "tel") {
                    alert("El formato del teléfono es incorrecto");
                }

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
        let option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        selectElement.appendChild(option);
    }

    // Evento clic en botón "Finalizar"
    document.getElementById("finalizar").addEventListener("click", function () {
        // Recuperar los valores de los campos de entrada
        let fechaIngreso = new Date(document.getElementById("start").value);
        let salarioActual = parseInt(document.getElementById("salario").value);

        // Validar que el salario actual sea mayor que cero y mayor o igual al salario mínimo
        if (salarioActual <= 0 || salarioActual < SALARIO_MINIMO_INTERPROFESIONAL) {
            alert("El salario actual no puede ser negativo ni menor al salario mínimo interprofesional.");
            return; // Detener la ejecución si la validación falla
        }
        // Calcular el nuevo salario
        const nuevoSalario = calcularAumentoSalarial(fechaIngreso, salarioActual);
        // Mostrar los gráficos
        mostrarGraficos(salarioActual, nuevoSalario);
    });


    // Evento clic en botón "Anterior"    
    botonesAnterior.forEach((boton) => {
        boton.addEventListener("click", function () {
            // Ocultar los gráficos al volver atrás
            ocultarGraficos();
        });
    });

    // Función para ocultar los gráficos
    function ocultarGraficos() {
        const graficosContainer = document.querySelector('.graficos');
        graficosContainer.style.display = 'none';
    }


    // Variables globales para almacenar las instancias de los gráficos
    let chart1, chart2;

    // Función para mostrar los gráficos
    function mostrarGraficos(salarioActual, nuevoSalario) {
        if (salarioActual && nuevoSalario) {
            // Obtener el contexto del primer gráfico (salario actual)
            const ctx1 = document.getElementById('graficoSalarioActual').getContext('2d');

            if (!chart1) {
                // Si no existe un gráfico anteriormente, crear uno nuevo
                chart1 = new Chart(ctx1, {
                    type: 'bar',
                    data: {
                        labels: ['Salario Actual'],
                        datasets: [{
                            label: 'Salario Actual',
                            data: [salarioActual],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                suggestedMax: salarioActual + 1000 // Establecer el máximo del eje y
                            }
                        }
                    }
                });
            } else {
                // Si el gráfico ya existe, actualizar sus datos
                chart1.data.datasets[0].data = [salarioActual];
                chart1.options.scales.y.suggestedMax = salarioActual + 1000; // Actualizar el máximo del eje y
                chart1.update();
            }

            // Obtener el contexto del segundo gráfico (nuevo salario)
            const ctx2 = document.getElementById('graficoNuevoSalario').getContext('2d');

            if (!chart2) {
                // Si no existe un gráfico anteriormente, crear uno nuevo
                chart2 = new Chart(ctx2, {
                    type: 'bar',
                    data: {
                        labels: ['Nuevo Salario'],
                        datasets: [{
                            label: 'Nuevo Salario',
                            data: [nuevoSalario],
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                suggestedMax: nuevoSalario // Establecer el máximo del eje y
                            }
                        }
                    }
                });
            } else {
                // Si el gráfico ya existe, actualizar sus datos
                chart2.data.datasets[0].data = [nuevoSalario];
                chart2.options.scales.y.suggestedMax = nuevoSalario; // Actualizar el máximo del eje y
                chart2.update();
            }

            // Mostrar el contenedor de gráficos
            const graficosContainer = document.querySelector('.graficos');
            graficosContainer.style.display = 'flex';
        }
    }

    function calcularAumentoSalarial(fechaIngreso, salarioActual) {
        // Obtener la fecha actual
        const fechaActual = new Date();

        // Calcular la antigüedad del empleado en milisegundos
        const antiguedadEnMilisegundos = fechaActual - fechaIngreso;

        // Convertir la antigüedad a años
        const antiguedadEnAnios = Math.floor(antiguedadEnMilisegundos / (1000 * 60 * 60 * 24 * 365));

        // Definir los porcentajes de aumento según la antigüedad
        let porcentajeAumento = 0;

        if (antiguedadEnAnios < 5) {
            porcentajeAumento = 5; // Aumento del 5% para empleados con menos de 5 años de antigüedad
        } else if (antiguedadEnAnios < 10) {
            porcentajeAumento = 10; // Aumento del 10% para empleados con 5 a 10 años de antigüedad
        } else {
            porcentajeAumento = 15; // Aumento del 15% para empleados con más de 10 años de antigüedad
        }

        // Calcular el nuevo salario con el aumento aplicado
        const aumento = (salarioActual * porcentajeAumento) / 100;
        const nuevoSalario = salarioActual + aumento;

        return nuevoSalario;
    }

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

    // Obtener el elemento de entrada de fecha
    const fechaInput = document.getElementById("start");

    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0];

    // Establecer el atributo max del elemento de entrada de fecha
    fechaInput.setAttribute("max", fechaActual);
});