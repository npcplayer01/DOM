// Array para almacenar los datos
let data = [];

// Selección de elementos del DOM
const dataForm = document.getElementById('data-form');
const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];
const themeToggle = document.getElementById('theme-toggle');

// Función para agregar un nuevo registro
function addRecord(event) {
    event.preventDefault();
    const photo = document.getElementById('photo').files[0];
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    const newRecord = {
        photo: photo ? URL.createObjectURL(photo) : null,
        firstName,
        lastName,
        username,
        email,
        age,
        address,
        phone,
        id: Date.now()
    };
    data.push(newRecord);

    renderTable();
    dataForm.reset();
    showMessage('¡Éxito!', 'Registro agregado correctamente', 'success');
    showConfetti();
}


// Función para renderizar la tabla
function renderTable() {
    dataTable.innerHTML = '';
    data.forEach(record => {
        const row = dataTable.insertRow();

        

    });
}