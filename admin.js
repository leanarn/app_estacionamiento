// Obtener usuario activo y validar si es administrador
const usuarioAdmin = JSON.parse(localStorage.getItem('usuarioActivo'));
if (!usuarioAdmin || usuarioAdmin.tipo !== 'admin') {
    alert('Acceso denegado.');
    window.location.href = 'login.html';
}

// Función para cargar datos de vehículos
function cargarVehiculos() {
    const vehiculosEstacionados = JSON.parse(localStorage.getItem('vehiculosEstacionados')) || [];
    const vehiculosRetirados = JSON.parse(localStorage.getItem('vehiculosRetirados')) || [];

    // Mostrar vehículos estacionados
    const estacionadosTabla = document.getElementById('vehiculos-estacionados').querySelector('tbody');
    estacionadosTabla.innerHTML = '';
    vehiculosEstacionados.forEach(vehiculo => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${vehiculo.propietario}</td>
            <td>${vehiculo.matricula}</td>
            <td>${vehiculo.tipoVehiculo}</td>
            <td>${new Date(vehiculo.horaEntrada).toLocaleString()}</td>
            <td><button onclick="eliminarVehiculo('${vehiculo.matricula}')">Eliminar</button></td>
        `;
        estacionadosTabla.appendChild(fila);
    });

    // Mostrar vehículos retirados
    const retiradosTabla = document.getElementById('vehiculos-retirados').querySelector('tbody');
    retiradosTabla.innerHTML = '';
    vehiculosRetirados.forEach(vehiculo => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${vehiculo.propietario}</td>
            <td>${vehiculo.matricula}</td>
            <td>${vehiculo.tipoVehiculo}</td>
            <td>${new Date(vehiculo.horaEntrada).toLocaleString()}</td>
            <td>${new Date(vehiculo.horaSalida).toLocaleString()}</td>
            <td>$${vehiculo.costo}</td>
        `;
        retiradosTabla.appendChild(fila);
    });

    // Actualizar total recaudado
    document.getElementById('total-recaudado').textContent = localStorage.getItem('totalRecaudado') || '0';
}

// Función para limpiar el registro de vehículos retirados
function limpiarRegistro() {
    localStorage.removeItem('vehiculosRetirados');
    cargarVehiculos();
    alert('Registro de vehículos retirados limpiado.');
}

// Función para reiniciar la caja
function reiniciarCaja() {
    localStorage.setItem('totalRecaudado', '0');
    cargarVehiculos();
    alert('Caja reiniciada a $0.');
}

// Función para eliminar un vehículo estacionado
function eliminarVehiculo(matricula) {
    let vehiculosEstacionados = JSON.parse(localStorage.getItem('vehiculosEstacionados')) || [];
    vehiculosEstacionados = vehiculosEstacionados.filter(v => v.matricula !== matricula);
    localStorage.setItem('vehiculosEstacionados', JSON.stringify(vehiculosEstacionados));
    cargarVehiculos();
}

// Llamar la función al cargar la página
cargarVehiculos();

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    window.location.href = 'login.html';
}

// Redirige a la página de usuarios
function verUsuarios() {
    window.location.href = 'usuarios.html';
}
