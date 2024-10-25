function iniciarSesion() {
    const documento = document.getElementById('documento-login').value;
    const password = document.getElementById('password-login').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(user => user.documento === documento && user.password === password);

    if (usuario) {
        localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
        alert(`Bienvenido, ${usuario.nombre}`);

        // Redirigir según el tipo de usuario
        if (usuario.tipo === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'cliente.html';
        }
    } else {
        alert('Documento o contraseña incorrectos.');
    }
}
