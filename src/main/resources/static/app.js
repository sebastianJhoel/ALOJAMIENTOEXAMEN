const API_URL = "http://localhost:8080/api"; // Ajusta el puerto si es diferente

document.addEventListener("DOMContentLoaded", () => {
    cargarClientes();
    cargarEmpleados();
    cargarPisos();
    cargarHabitaciones();

    document.getElementById("clienteForm").addEventListener("submit", crearCliente);
    document.getElementById("empleadoForm").addEventListener("submit", crearEmpleado);

});

// ======================== CLIENTES =========================

function cargarClientes() {
    fetch(`${API_URL}/clientes`)
        .then(res => res.json())
        .then(clientes => {
            const contenedor = document.getElementById("clientesLista");
            contenedor.innerHTML = "";
            clientes.forEach(cliente => {
                const div = document.createElement("div");
                div.className = "card";
                div.innerHTML = `
                    <p><strong>Nombre:</strong> ${cliente.nombre}</p>
                    <p><strong>ID:</strong> ${cliente.identificacion}</p>
                    <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
                    <p><strong>Piso ID:</strong> ${cliente.piso.id}</p>
                    <p><strong>Habitación ID:</strong> ${cliente.habitacion.id}</p>
                `;
                contenedor.appendChild(div);
            });
        });
}

function crearCliente(e) {
    e.preventDefault();

    const cliente = {
        nombre: document.getElementById("clienteNombre").value,
        identificacion: document.getElementById("clienteIdentificacion").value,
        telefono: document.getElementById("clienteTelefono").value,
        piso: { id: parseInt(document.getElementById("clientePiso").value) },
        habitacion: { id: parseInt(document.getElementById("clienteHabitacion").value) }
    };

    fetch(`${API_URL}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    }).then(() => {
        document.getElementById("clienteForm").reset();
        cargarClientes();
    });
}

// ======================== EMPLEADOS =========================

function cargarEmpleados() {
    fetch(`${API_URL}/empleados`)
        .then(res => res.json())
        .then(empleados => {
            const contenedor = document.getElementById("empleadosLista");
            contenedor.innerHTML = "";
            empleados.forEach(empleado => {
                const div = document.createElement("div");
                div.className = "card";
                div.innerHTML = `
                    <p><strong>Nombre:</strong> ${empleado.nombre}</p>
                    <p><strong>ID:</strong> ${empleado.identificacion}</p>
                    <p><strong>Teléfono:</strong> ${empleado.telefono}</p>
                    <p><strong>Cliente Asignado:</strong> ${empleado.cliente ? empleado.cliente.nombre : "Ninguno"}</p>
                `;
                contenedor.appendChild(div);
            });
        });
}

function crearEmpleado(e) {
    e.preventDefault();

    const empleado = {
        nombre: document.getElementById("empleadoNombre").value,
        identificacion: document.getElementById("empleadoIdentificacion").value,
        telefono: document.getElementById("empleadoTelefono").value,
        cliente: { id: parseInt(document.getElementById("empleadoClienteId").value) }
    };

    fetch(`${API_URL}/empleados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empleado)
    }).then(() => {
        document.getElementById("empleadoForm").reset();
        cargarEmpleados();
    });
}

// ======================== PISOS =========================

document.getElementById("pisoForm").addEventListener("submit", crearPiso);

function cargarPisos() {
    fetch(`${API_URL}/pisos`)
        .then(res => res.json())
        .then(pisos => {
            const contenedor = document.getElementById("pisosLista");
            contenedor.innerHTML = "";
            pisos.forEach(piso => {
                const div = document.createElement("div");
                div.className = "card";
                div.innerHTML = `
                    <p><strong>ID:</strong> ${piso.id}</p>
                    <p><strong>Número de Piso:</strong> ${piso.numero}</p>
                `;
                contenedor.appendChild(div);
            });
        });
}

function crearPiso(e) {
    e.preventDefault();
    const piso = { numero: parseInt(document.getElementById("numeroPiso").value) };

    fetch(`${API_URL}/pisos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(piso)
    }).then(() => {
        document.getElementById("pisoForm").reset();
        cargarPisos();
    });
}

// ======================== HABITACIONES =========================

document.getElementById("habitacionForm").addEventListener("submit", crearHabitacion);

function cargarHabitaciones() {
    fetch(`${API_URL}/habitaciones`)
        .then(res => res.json())
        .then(habitaciones => {
            const contenedor = document.getElementById("habitacionesLista");
            contenedor.innerHTML = "";
            habitaciones.forEach(habitacion => {
                const div = document.createElement("div");
                div.className = "card";
                div.innerHTML = `
                    <p><strong>ID:</strong> ${habitacion.id}</p>
                    <p><strong>Número:</strong> ${habitacion.numero}</p>
                    <p><strong>Piso ID:</strong> ${habitacion.piso.id}</p>
                `;
                contenedor.appendChild(div);
            });
        });
}

function crearHabitacion(e) {
    e.preventDefault();
    const habitacion = {
        numero: parseInt(document.getElementById("numeroHabitacion").value),
        piso: { id: parseInt(document.getElementById("habitacionPisoId").value) }
    };

    fetch(`${API_URL}/habitaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitacion)
    }).then(() => {
        document.getElementById("habitacionForm").reset();
        cargarHabitaciones();
    });
}
