// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuración de tu aplicación web Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBLVQIddZgokPgC7n5CX6xXPZfMY2P_wTk",
    authDomain: "js-crud-98278.firebaseapp.com",
    projectId: "js-crud-98278",
    storageBucket: "js-crud-98278.appspot.com",
    messagingSenderId: "31254836610",
    appId: "1:31254836610:web:486532084b687c82370b9b"
};


// Inicializa Firebase
initializeApp(firebaseConfig);

// Accede a la base de datos Firestore
const db = getFirestore();

// Accede a la colección "estudiantes"
const estudiantesCollection = collection(db, "estudiantes");

// En el evento 'DOMContentLoaded', llamamos a mostrarEstudiantes() y actualizarPaginacion()
document.addEventListener('DOMContentLoaded', () => {
    mostrarEstudiantes(); // Mostrar los estudiantes al cargar la página
    actualizarPaginacion(1, 5); // Actualizar la paginación
});

// Función para mostrar los estudiantes de una página específica
function mostrarPagina(pageNumber, studentsPerPage) {
    // Calcular los índices de inicio y fin de los estudiantes en la página
    const startIndex = (pageNumber - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;

    // Obtener todos los estudiantes
    const students = document.querySelectorAll('tbody tr');

    // Iterar sobre los estudiantes y mostrar/ocultar según la página actual
    students.forEach((student, index) => {
        if (index >= startIndex && index < endIndex) {
            student.style.display = ''; // Mostrar el estudiante si está en la página actual
        } else {
            student.style.display = 'none'; // Ocultar el estudiante si no está en la página actual
        }
    });

    // Actualizar la paginación
    actualizarPaginacion(pageNumber, studentsPerPage);
}

// Función para actualizar la paginación
function actualizarPaginacion(pageNumber, studentsPerPage) {
    // Calcular el número total de estudiantes
    const totalStudents = document.querySelectorAll('tbody tr').length;
    // Calcular el número total de páginas
    const totalPages = Math.ceil(totalStudents / studentsPerPage);

    // Seleccionar el contenedor de la paginación
    const paginationContainer = document.querySelector('.pagination');

    // Limpiar el contenido existente de la paginación
    paginationContainer.innerHTML = '';

    // Crear botones para cada página
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('btn', 'btn-primary', 'mx-1');

        // Agregar evento de clic para mostrar la página correspondiente
        pageButton.addEventListener('click', () => {
            mostrarPagina(i, studentsPerPage);
        });

        // Marcar el botón de la página actual
        if (i === pageNumber) {
            pageButton.classList.add('active');
        }

        // Agregar el botón a la paginación
        paginationContainer.appendChild(pageButton);
    }
}


// Accede al formulario de registro por su ID
const registerForm = document.getElementById("register-form");

document.addEventListener('DOMContentLoaded', () => {
    mostrarPagina(1, 5); // Mostrar los primeros 5 estudiantes cuando la página se cargue

    registerForm.addEventListener("submit", async (ev) => {
        ev.preventDefault();
        await registrarNuevoEstudiante();
    });
});

async function registrarNuevoEstudiante() {
    try {
        // Reiniciar las variables para mostrar el error de formato solo una vez por cada intento de registro
        let errorCorreoMostrado = false;
        let errorTelefonoMostrado = false;
        let errorNombreMostrado = false;

        // Obtener todos los campos de entrada 
        const campos = document.querySelectorAll(".input-required");

        let algunCampoVacio = false;

        // Obtener los valores de nombre y apellidos
        const nombre = registerForm["nombre"].value.trim();
        const apellido1 = registerForm["apellido1"].value.trim();
        const apellido2 = registerForm["apellido2"].value.trim();

        // Realizar la consulta para verificar si ya existe un estudiante con el mismo nombre y apellidos
        const querySnapshot = await getDocs(collection(db, "estudiantes"));
        querySnapshot.forEach((doc) => {
            const estudiante = doc.data();
            if (estudiante.nombre === nombre && estudiante.apellido1 === apellido1 && estudiante.apellido2 === apellido2) {
                alert("Ya existe un estudiante con el mismo nombre y apellidos");
                algunCampoVacio = true; // Establecer esta bandera para evitar que se registre el estudiante
            }
        });

        campos.forEach(function (campo) {
            if (!campo.value.trim() ||
                ((campo.id == "nombre" || campo.id == "apellido1" || campo.id == "apellido2") && !comprobarNombreOApellido(campo.value.trim())) ||
                (campo.id == "formControlEmail" && !comprobarCorreo(campo.value.trim()) && !errorCorreoMostrado) ||
                (campo.id == "formControlTelefono" && !comprobarTelefono(campo.value.trim()) && !errorTelefonoMostrado)) {

                algunCampoVacio = true;
                // Resaltar el campo en rojo si está vacío
                campo.style.border = "2px solid red";
                campo.style.backgroundColor = "#FEE";

                if ((campo.id == "nombre" || campo.id == "apellido1" || campo.id == "apellido2") && !errorNombreMostrado) {
                    alert("Formato del nombre o apellidos incorrectos");
                    errorNombreMostrado = true;
                }

                // Mostrar mensaje de error si el formato del teléfono o correo es incorrecto
                if (campo.id == "formControlEmail" && !errorCorreoMostrado) {
                    alert("El formato del correo electrónico es incorrecto");
                    errorCorreoMostrado = true;
                } else if (campo.id == "formControlTelefono" && !errorTelefonoMostrado) {
                    alert("El formato del teléfono es incorrecto");
                    errorTelefonoMostrado = true;
                }

            } else {
                // Restablecer el estilo si el campo no está vacío
                campo.style.border = "";
                campo.style.backgroundColor = "";
            }
        });

        if (!algunCampoVacio) {
            // Agrega un nuevo documento a la colección "estudiantes" con los datos del formulario
            await addDoc(estudiantesCollection, {
                nombre: nombre,
                apellido1: apellido1,
                apellido2: apellido2,
                telefono: registerForm["telefono"].value,
                email: registerForm["email"].value,
                desc: registerForm["descripcion"].value
            });

            alert("¡Nuevo estudiante registrado!");
            location.reload();
            // Después de eliminar un estudiante, actualizar la paginación
            actualizarPaginacion(1, 5);

        } else {
            comprobarInput();
        }

    } catch (error) {
        alert(error.message);
    }
}

// Obtén referencia a la tabla en la que se mostrarán los estudiantes
const tablaEstudiantes = document.querySelector('tbody');

// Función para mostrar todos los estudiantes en la tabla HTML
async function mostrarEstudiantes() {
    try {
        // Obtén todos los documentos de la colección "estudiantes"
        const querySnapshot = await getDocs(estudiantesCollection);

        // Limpia la tabla antes de agregar los nuevos estudiantes
        tablaEstudiantes.innerHTML = '';

        let contador = 0;

        // Itera sobre cada documento en la colección
        querySnapshot.forEach((doc) => {

            // Obtén los datos del estudiante
            const estudiante = doc.data();
            contador++;

            // Crea una nueva fila en la tabla para el estudiante
            const filaEstudiante = `
            <tr data-doc-id="${doc.id}">
                    <th scope="row">${contador}</th>
                    <td>${estudiante.nombre}</td>
                    <td>${estudiante.apellido1}</td>
                    <td>${estudiante.apellido2}</td>
                    <td>${estudiante.telefono}</td>
                    <td>${estudiante.email}</td>
                    <td>
                        <button type="button" class="btn btn-warning editar-estudiante">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="btn btn-danger eliminar-estudiante">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            `;

            // Agrega la nueva fila a la tabla
            tablaEstudiantes.innerHTML += filaEstudiante;
        });

        // Después de agregar los estudiantes, mostrar la primera página
        mostrarPagina(1, 5);

        // Agrega eventos de clic a los botones de editar y eliminar estudiante
        agregarEventosEditar();
        agregarEventosEliminar();

    } catch (error) {
        alert(error.message);
    }
}


// Llama a la función para mostrar los estudiantes cuando la página se cargue
document.addEventListener('DOMContentLoaded', mostrarEstudiantes);

// Función para agregar eventos de clic a los botones de eliminar estudiante
function agregarEventosEliminar() {
    document.querySelectorAll('.eliminar-estudiante').forEach(button => {
        button.addEventListener('click', async () => {
            const idDocumento = button.closest('tr').dataset.docId; // Obtiene el ID único del documento de la colección
            console.log(idDocumento);
            eliminarEstudiante(idDocumento);
        });
    });
}

// Función para agregar eventos de clic a los botones de editar estudiante
function agregarEventosEditar() {
    document.querySelectorAll('.editar-estudiante').forEach(button => {
        button.addEventListener('click', () => {
            // Obtener los datos del estudiante de la fila correspondiente
            const fila = button.closest('tr');
            const idDocumento = fila.dataset.docId; // Obtener el ID único del documento de Firebase
            const nombre = fila.querySelector('td:nth-child(2)').textContent;
            const apellido1 = fila.querySelector('td:nth-child(3)').textContent;
            const apellido2 = fila.querySelector('td:nth-child(4)').textContent;
            const telefono = fila.querySelector('td:nth-child(5)').textContent;
            const email = fila.querySelector('td:nth-child(6)').textContent;
            const descripcion = ''; // Puedes obtener la descripción si es necesario

            // Mostrar el modal de edición con los datos del estudiante
            mostrarModalEdicion(idDocumento, nombre, apellido1, apellido2, telefono, email, descripcion);
        });
    });
}

// Función para mostrar el modal de edición con los datos del estudiante
function mostrarModalEdicion(idDocumento, nombre, apellido1, apellido2, telefono, email, descripcion) {
    const modal = new bootstrap.Modal(document.getElementById('editarModal'));

    // Llena el formulario de edición con los datos del estudiante
    document.getElementById('edit-id').value = idDocumento; // Establece el ID del documento
    document.getElementById('edit-nombre').value = nombre;
    document.getElementById('edit-apellido1').value = apellido1;
    document.getElementById('edit-apellido2').value = apellido2;
    document.getElementById('edit-telefono').value = telefono;
    document.getElementById('edit-email').value = email;
    document.getElementById('edit-descripcion').value = descripcion;

    modal.show();
}

async function actualizarDatosEstudiante() {
    try {
        const editForm = document.getElementById('editar-form');
        const id = editForm.querySelector('#edit-id').value; // Obtener el ID del documento desde el formulario
        const nombre = editForm.querySelector('#edit-nombre').value;
        const apellido1 = editForm.querySelector('#edit-apellido1').value;
        const apellido2 = editForm.querySelector('#edit-apellido2').value;
        const telefono = editForm.querySelector('#edit-telefono').value;
        const email = editForm.querySelector('#edit-email').value;
        const descripcion = editForm.querySelector('#edit-descripcion').value;
        // Reiniciar las variables para mostrar el error de formato solo una vez por cada intento de registro
        let errorCorreoMostrado = false;
        let errorTelefonoMostrado = false;

        // Obtener todos los campos de entrada 
        const campos = document.querySelectorAll(".edit-required");

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

        // Realizar la consulta para verificar si ya existe un estudiante con el mismo nombre y apellidos
        const querySnapshot = await getDocs(collection(db, "estudiantes"));
        querySnapshot.forEach((doc) => {
            const estudiante = doc.data();
            if (estudiante.nombre === nombre && estudiante.apellido1 === apellido1 && estudiante.apellido2 === apellido2) {
                alert("Ya existe un estudiante con el mismo nombre y apellidos");
                algunCampoVacio = true;
            }
        });

        campos.forEach(function (campo) {
            if ((campo.id == "edit-nombre" && !comprobarNombreOApellido(campo.value.trim())) ||
                (campo.id == "edit-email" && !comprobarCorreo(campo.value.trim()) && !errorCorreoMostrado) ||
                (campo.id == "edit-telefono" && !comprobarTelefono(campo.value.trim()) && !errorTelefonoMostrado)) {

                algunCampoVacio = true;
                // Resaltar el campo en rojo si está vacío
                campo.style.border = "2px solid red";
                campo.style.backgroundColor = "#FEE";

                // Mostrar mensaje de error si el formato del teléfono o correo es incorrecto
                if (campo.id == "edit-email" && !errorCorreoMostrado) {
                    alert("El formato del correo electrónico es incorrecto");
                    errorCorreoMostrado = true;
                } else if (campo.id == "edit-telefono" && !errorTelefonoMostrado) {
                    alert("El formato del teléfono es incorrecto");
                    errorTelefonoMostrado = true;
                }
            } else {
                // Restablecer el estilo si el campo no está vacío
                campo.style.border = "";
                campo.style.backgroundColor = "";
            }
        });

        console.log(algunCampoVacio);
        if (!algunCampoVacio) {
            try {
                // Actualiza los datos del estudiante en la base de datos
                await updateDoc(doc(db, 'estudiantes', id), {
                    nombre: nombre,
                    apellido1: apellido1,
                    apellido2: apellido2,
                    telefono: telefono,
                    email: email,
                    descripcion: descripcion
                });
                alert('Datos del estudiante actualizados correctamente');
                // Recargar la página para reflejar los cambios
                location.reload();
                // Después de eliminar un estudiante, actualizar la paginación
                actualizarPaginacion(1, 5);
            } catch (error) {
                alert('Error al actualizar los datos del estudiante: ' + error.message);
            }
        } else {
            comprobarInput();
        }

    } catch (error) {
        alert(error.message);
    }
}

// Agrega un evento de envío al formulario de edición para llamar a la función actualizarDatosEstudiante
document.getElementById('editar-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario
    actualizarDatosEstudiante(); // Llama a la función para actualizar los datos del estudiante
});

// Función para eliminar un estudiante de la base de datos
async function eliminarEstudiante(idDocumento) {
    // Confirmar la eliminación
    const confirmarEliminacion = confirm('¿Estás seguro de que deseas eliminar este estudiante?');
    if (confirmarEliminacion) {
        try {
            // Eliminar el documento correspondiente de la colección "estudiantes"
            await deleteDoc(doc(db, "estudiantes", idDocumento));
            alert('Estudiante eliminado exitosamente');

            // Recargar la página para actualizar la lista de estudiantes
            location.reload();
            // Después de eliminar un estudiante, actualizar la paginación
            actualizarPaginacion(1, 5);
        } catch (error) {
            alert('Error al eliminar el estudiante: ' + error.message);
        }
    }
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

function comprobarInput() {
    // Obtener el paso actual

    // Obtener todos los campos de entrada dentro del paso actual
    const campos = document.querySelectorAll("input");


    // Recorrer los campos de entrada del paso actual
    campos.forEach(function (campo) {
        // Verificar si el campo está en blanco
        if (campo.value.trim() === "" || (campo.id == "nombreApellido" && !comprobarNombreOApellido(campo.value.trim())) || campo.value == "0" || (campo.id == "email" && !comprobarCorreo(campo.value.trim())) || (campo.id == "tel" && !comprobarTelefono(campo.value.trim()))) {
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