

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
        pasos[pasoActual - 1].style.display = "none";
        pasoActual++;
        if (pasoActual > pasos.length) {
            pasoActual = pasos.length;
        }
        pasos[pasoActual - 1].style.display = "block";
        actualizarBarraDeProgreso();
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

    botonesSiguiente.forEach((boton) => {
        boton.addEventListener("click", siguientePaso);
    });

    botonesAnterior.forEach((boton) => {
        boton.addEventListener("click", pasoAnterior);
    });

    formulario.addEventListener("submit", (e) => e.preventDefault());
});

document.addEventListener("DOMContentLoaded", function () {
    var selectPaises = document.getElementById("selectPaises");
    var selectCiudades = document.getElementById("selectCiudades");

    // Obtener la lista de países y sus capitales
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            // Filtrar los países que pertenecen a la Unión Europea o están en Europa
            const paisesEuropeos = data.filter(country => country.region === "Europe" || country.subregion === "Europe");
            const paises = paisesEuropeos.map(country => country.translations.spa.common);

            // Generar opciones para el selector de países
            generarOpciones(selectPaises, paises);

            // Manejar el cambio de selección en el selector de países
            selectPaises.addEventListener("change", function () {
                const paisSeleccionado = selectPaises.value;
                // Encontrar el país seleccionado en los datos ya obtenidos
                const paisData = paisesEuropeos.find(country => country.translations.spa.common === paisSeleccionado);
                const capitalSeleccionada = paisData ? paisData.capital?.[0] || "No disponible" : "No disponible";
                // Limpiar el selector de ciudades y agregar la capital seleccionada
                selectCiudades.innerHTML = "";
                const opcionCapital = document.createElement("option");
                opcionCapital.text = capitalSeleccionada;
                opcionCapital.value = capitalSeleccionada;
                selectCiudades.add(opcionCapital);
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
















