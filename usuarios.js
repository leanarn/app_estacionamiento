// Verificar que haya un administrador autenticado
const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

if (!usuarioActivo || usuarioActivo.tipo !== 'admin') {
    alert('Debes iniciar sesión como administrador para acceder.');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarUsuariosRegistrados();
});

// Función para mostrar los usuarios registrados en la tabla
function mostrarUsuariosRegistrados() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tablaUsuarios = document.getElementById('tabla-usuarios').getElementsByTagName('tbody')[0];
    tablaUsuarios.innerHTML = ''; // Limpiar la tabla antes de mostrar los usuarios

    usuarios.forEach((usuario, index) => {
        const fila = tablaUsuarios.insertRow();
        
        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.documento}</td>
            <td>${usuario.tipo}</td>
            <td><button onclick="eliminarUsuario(${index})">Eliminar</button></td>
        `;
    });
}

// Función para eliminar un usuario
function eliminarUsuario(index) {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.splice(index, 1); // Elimina el usuario de la lista

        localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guarda la lista actualizada
        mostrarUsuariosRegistrados(); // Actualiza la tabla
    }
}

// Función para volver a la página del administrador
function volverAdmin() {
    window.location.href = 'admin.html';
}
