

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

    function siguientePaso() {

        // Obtener el paso actual visible
        const pasoVisible = document.querySelector('.paso:not([style*="display: none"])');

        // Obtener todos los campos de entrada dentro del paso actual
        const campos = pasoVisible.querySelectorAll(".input-required");

        // Verificar si alguno de los campos está vacío
        let algunCampoVacio = false;
        campos.forEach(function (campo) {
            if (!campo.value.trim()) {
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

            pasos[pasoActual - 1].style.display = "none";
            pasoActual++;
            if (pasoActual > pasos.length) {
                pasoActual = pasos.length;
            }
            pasos[pasoActual - 1].style.display = "block";
            actualizarBarraDeProgreso();
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
            if (campo.value.trim() === "" || opcionCapital.value == "") {
                // Resaltar el campo en rojo
                campo.style.border = "2px solid red";
                campo.style.backgroundColor = "#FEE";

                // Agregar evento blur para cada campo para detectar cuando el usuario sale del campo sin completarlo
                campo.addEventListener("blur", function () {
                    // Si el campo está vacío cuando el usuario sale de él, resaltar en rojo
                    if (campo.value.trim() === "") {
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

document.addEventListener("DOMContentLoaded", function () {
    const selectPaises = document.getElementById("selectPaises");

    // Diccionario de capitales en inglés y su equivalente en español
    const capitalesDict = {
        "Tallinn": "Tallin",
        "Prague": "Praga",
        "Copenhagen": "Copenhague",
        "Paris": "París",
        "Berlin": "Berlín",
        "Athens": "Atenas",
        "Rome": "Roma",
        "Budapest": "Budapest",
        "Dublin": "Dublín",
        "Vilnius": "Vilna",
        "Valletta": "La Valeta",
        "Amsterdam": "Ámsterdam",
        "Warsaw": "Varsovia",
        "Lisbon": "Lisboa",
        "Ljubljana": "Liubliana",
        "Stockholm": "Estocolmo",
        "Bern": "Berna",
        "London": "Londres",
        "Kyiv": "Kiev",
        "Sarajevo": "Sarajevo",
        "Chișinău": "Chisináu",
        "Monaco": "Mónaco",
        "Podgorica": "Podgorica",
        "Skopje": "Skopie",
        "Oslo": "Oslo",
        "Belgrade": "Belgrado",
        "Brussels": "Bruselas",
        "Andorra la Vella": "Andorra la Vieja",
        "Vatican City": "Ciudad del Vaticano",
        "Moscow": "Moscú",
        "Reykjavik": "Reikiavik",
        "St. Peter Port": "St. Peter port",
        "Douglas": "Douglas",
        "Luxembourg": "Ciudad de Luxemburgo",
        "Saint Helier": "Saint Helier",
        "Vienna": "Viena",
        "Bucharest": "Bucarest"
    };

    // Obtener la lista de países y sus capitales
    fetch("https://restcountries.com/v3.1/region/europe")
        .then(response => response.json())
        .then(data => {
            // Obtener solo los nombres de los países europeos en español
            const paises = data.map(country => country.translations.spa.common);

            // Generar opciones para el selector de países
            generarOpciones(selectPaises, paises);

            // Manejar el cambio de selección en el selector de países
            selectPaises.addEventListener("change", function () {
                const paisSeleccionado = selectPaises.value;
                // Encontrar el país seleccionado en los datos ya obtenidos
                const paisData = data.find(country => country.translations.spa.common === paisSeleccionado);
                const capitalIngles = paisData ? paisData.capital?.[0] || "No disponible" : "No disponible";
                console.log(capitalIngles)
                const capitalSeleccionada = capitalesDict[capitalIngles] || capitalIngles;
                // Limpiar el selector de ciudades y agregar la capital seleccionada
                capital.value = "";

                const opcionCapital = document.getElementById("capital");
                opcionCapital.text = capitalSeleccionada;
                opcionCapital.value = capitalSeleccionada;

            });
        })
        .catch(error => {
            console.error("Error al obtener países y capitales:", error);
        });

    // Función para generar opciones en un select
    function generarOpciones(selectElement, opciones) {
        opciones.forEach(opcion => {
            var opcionElement = document.createElement("option");
            opcionElement.text = opcion;
            opcionElement.value = opcion;
            selectElement.add(opcionElement);
        });
    }
});

















