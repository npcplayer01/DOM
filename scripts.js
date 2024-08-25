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
        row.innerHTML = `
            <td>${record.photo ? `<img src="${record.photo}" alt="Foto de ${record.firstName}" width="50">` : 'Sin foto'}</td>
            <td>${record.firstName}</td>
            <td>${record.lastName}</td>
            <td>${record.username}</td>
            <td>${record.email}</td>
            <td>${record.age}</td>
            <td>${record.address}</td>
            <td>${record.phone}</td>
            <td>
                <button class="edit-btn" onclick="editRecord(${record.id})">Editar</button>
                <button class="delete-btn" onclick="confirmDelete(${record.id})">Eliminar</button>
            </td>
        `;
    });
}

// Función para editar un registro
function editRecord(id) {
    const record = data.find(r => r.id === id);
    if (record) {
        document.getElementById('firstName').value = record.firstName;
        document.getElementById('lastName').value = record.lastName;
        document.getElementById('username').value = record.username;
        document.getElementById('email').value = record.email;
        document.getElementById('age').value = record.age;
        document.getElementById('address').value = record.address;
        document.getElementById('phone').value = record.phone;

        // Cambiar el botón de "Agregar" a "Actualizar"
        const submitBtn = dataForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Actualizar';
        submitBtn.onclick = function(event) {
            event.preventDefault();
            if (confirm('¿Estás seguro de que quieres actualizar este registro?')) {
                record.firstName = document.getElementById('firstName').value;
                record.lastName = document.getElementById('lastName').value;
                record.username = document.getElementById('username').value;
                record.email = document.getElementById('email').value;
                record.age = document.getElementById('age').value;
                record.address = document.getElementById('address').value;
                record.phone = document.getElementById('phone').value;
                const newPhoto = document.getElementById('photo').files[0];
                if (newPhoto) {
                    record.photo = URL.createObjectURL(newPhoto);
                }
                renderTable();
                dataForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-plus"></i> Agregar';
                submitBtn.onclick = addRecord;
                showMessage('¡Éxito!', 'Registro actualizado correctamente', 'success');
            }
        };
    }
}

// Función para confirmar eliminación
function confirmDelete(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
        deleteRecord(id);
    }
}

// Función para eliminar un registro
function deleteRecord(id) {
    data = data.filter(r => r.id !== id);
    renderTable();
    showMessage('Eliminado', 'El registro ha sido eliminado', 'info');
}

dataForm.addEventListener('submit', addRecord);
themeToggle.addEventListener('click', toggleTheme);

// Renderizar la tabla inicial
renderTable();

// Funciones para mostrar mensajes y confetti
function showMessage(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'OK'
    });
}

function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}