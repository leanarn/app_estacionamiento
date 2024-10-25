const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

if (!usuarioActivo) {
    alert('Debes iniciar sesión para acceder.');
    window.location.href = 'login.html';
}

document.getElementById('bienvenida').textContent = `Bienvenido, ${usuarioActivo.nombre}`;

function ingresarVehiculo() {
    const propietario = document.getElementById('propietario').value;
    const matricula = document.getElementById('matricula').value;
    const tipoVehiculo = document.getElementById('tipo-vehiculo').value;
    const horaEntrada = Date.now();
    const documentoUsuario = usuarioActivo.documento;

    let vehiculosEstacionados = JSON.parse(localStorage.getItem('vehiculosEstacionados')) || [];
    vehiculosEstacionados.push({ propietario, matricula, tipoVehiculo, horaEntrada, documentoUsuario });
    localStorage.setItem('vehiculosEstacionados', JSON.stringify(vehiculosEstacionados));

    alert('Vehículo ingresado.');
}

function retirarVehiculo(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    const matricula = document.getElementById('matricula-retirar').value;
    const horaSalida = Date.now();
    const documentoUsuario = usuarioActivo.documento;

    let vehiculosEstacionados = JSON.parse(localStorage.getItem('vehiculosEstacionados')) || [];
    let vehiculosRetirados = JSON.parse(localStorage.getItem('vehiculosRetirados')) || [];
    let totalRecaudado = parseFloat(localStorage.getItem('totalRecaudado')) || 0;

    const indiceVehiculo = vehiculosEstacionados.findIndex(v => v.matricula === matricula && v.documentoUsuario === documentoUsuario);

    if (indiceVehiculo !== -1) {
        const vehiculo = vehiculosEstacionados[indiceVehiculo];
        const horasEstacionado = (horaSalida - vehiculo.horaEntrada) / (1000 * 60 * 60);
        const costo = (vehiculo.tipoVehiculo === 'auto' ? 3 : 2) * Math.ceil(horasEstacionado);

        vehiculosRetirados.push({ ...vehiculo, horaSalida, costo });
        vehiculosEstacionados.splice(indiceVehiculo, 1);

        totalRecaudado += costo;

        localStorage.setItem('vehiculosEstacionados', JSON.stringify(vehiculosEstacionados));
        localStorage.setItem('vehiculosRetirados', JSON.stringify(vehiculosRetirados));
        localStorage.setItem('totalRecaudado', totalRecaudado.toString());

        alert(`Vehículo retirado. Costo: $${costo}`);
    } else {
        alert('Vehículo no encontrado.');
    }
}

function cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    window.location.href = 'login.html';
}

// Asignar la función al evento 'submit' del formulario de retirar vehículo
document.getElementById('retirar-vehiculo-form').addEventListener('submit', retirarVehiculo);
