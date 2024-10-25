function registrarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const documento = document.getElementById('documento').value;
    const tipo = document.getElementById('tipo-usuario').value; // Cambiar a 'tipo-usuario'
    const password = document.getElementById('password').value;

    if (!nombre || !documento || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.find(user => user.documento === documento);

    if (usuarioExistente) {
        alert('Este documento ya está registrado.');
        return;
    }

    usuarios.push({ nombre, documento, tipo, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html';
}

// Función para volver al inicio de sesión
function volverALogin() {
    window.location.href = 'login.html';
}
