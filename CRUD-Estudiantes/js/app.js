// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7Pge-QF85I0doZKnHdE7zBG1BWsmXyfg",
    authDomain: "crud-js-394b8.firebaseapp.com",
    projectId: "crud-js-394b8",
    storageBucket: "crud-js-394b8.appspot.com",
    messagingSenderId: "260132245242",
    appId: "1:260132245242:web:6ae36a22b666d275af0343",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    getDatabase,
    set,
    get,
    update,
    remove,
    ref,
    child,
    push,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const db = getDatabase();

const registerForm = document.getElementById("register-form");

// Crear nuevo estudiante

async function registrarNuevoEstudiante() {

    const newStudentRef = push(ref(db, "Students"));

    try {
        const newStudentRef = push(ref(db, "Students"));

        await set(newStudentRef, {
            nombre: registerForm["nombre"].value,
            ape1: registerForm["apellido1"].value,
            ape2: registerForm["apellido2"].value,
            telef: registerForm["telefono"].value,
            email: registerForm["email"].value,
            desc: registerForm["descripcion"].value,
        });

        alert("¡Nuevo estudiante registrado!!");
    } catch (error) {
        alert(error);
    }
}

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    registrarNuevoEstudiante();
});


