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
const app = initializeApp(firebaseConfig);

// Accede a la base de datos Firestore
const db = getFirestore();

// Accede a la colección "estudiantes"
const estudiantesCollection = collection(db, "estudiantes");

// Accede al formulario de registro por su ID
const registerForm = document.getElementById("register-form");

async function registrarNuevoEstudiante() {
    try {
        // Agrega un nuevo documento a la colección "estudiantes" con los datos del formulario
        await addDoc(estudiantesCollection, {
            nombre: registerForm["nombre"].value,
            ape1: registerForm["apellido1"].value,
            ape2: registerForm["apellido2"].value,
            telef: registerForm["telefono"].value,
            email: registerForm["email"].value,
            desc: registerForm["descripcion"].value
        });
        alert("¡Nuevo estudiante registrado!");
        location.reload();

    } catch (error) {
        alert(error.message);
    }
}

// Agrega un evento de escucha al formulario de registro para llamar a la función "registrarNuevoEstudiante" cuando se envíe el formulario
registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario
    registrarNuevoEstudiante(); // Llama a la función para registrar un nuevo estudiante
});

// Obtén referencia a la tabla en la que se mostrarán los estudiantes
const tablaEstudiantes = document.querySelector('tbody');

// Función para mostrar todos los estudiantes en la tabla HTML
async function mostrarEstudiantes() {
    try {
        // Obtén todos los documentos de la colección "estudiantes"
        const querySnapshot = await getDocs(estudiantesCollection);

        // Limpia la tabla antes de agregar los nuevos estudiantes
        tablaEstudiantes.innerHTML = '';

        // Itera sobre cada documento en la colección
        querySnapshot.forEach((doc) => {
            // Obtén los datos del estudiante
            const estudiante = doc.data();

            // Crea una nueva fila en la tabla para el estudiante
            const filaEstudiante = `
            <tr data-doc-id="${doc.id}">
                    <th scope="row">${doc.id}</th>
                    <td>${estudiante.nombre}</td>
                    <td>${estudiante.ape1}</td>
                    <td>${estudiante.ape2}</td>
                    <td>${estudiante.telef}</td>
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
function mostrarModalEdicion(id, nombre, apellido1, apellido2, telefono, email, descripcion) {
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

// Función para actualizar los datos del estudiante en la base de datos
async function actualizarDatosEstudiante() {
    const editForm = document.getElementById('editar-form');
    const id = editForm.querySelector('#edit-id').value; // Obtener el ID del documento desde el formulario
    const nombre = editForm.querySelector('#edit-nombre').value;
    const apellido1 = editForm.querySelector('#edit-apellido1').value;
    const apellido2 = editForm.querySelector('#edit-apellido2').value;
    const telefono = editForm.querySelector('#edit-telefono').value;
    const email = editForm.querySelector('#edit-email').value;
    const descripcion = editForm.querySelector('#edit-descripcion').value;

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
    } catch (error) {
        alert('Error al actualizar los datos del estudiante: ' + error.message);
    }
}

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
        } catch (error) {
            alert('Error al eliminar el estudiante: ' + error.message);
        }
    }
}

// Agrega un evento de envío al formulario de edición para llamar a la función actualizarDatosEstudiante
document.getElementById('editar-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario
    actualizarDatosEstudiante(); // Llama a la función para actualizar los datos del estudiante
});