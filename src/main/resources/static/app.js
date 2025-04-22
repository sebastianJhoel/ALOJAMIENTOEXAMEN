// app.js

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
                    <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
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

function eliminarCliente(id) {
    fetch(`${API_URL}/clientes/${id}`, { method: "DELETE" })
        .then(() => cargarClientes());
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
                    <button onclick="eliminarEmpleado(${empleado.id})">Eliminar</button>
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
        telefono: document.getElementById("empleadoTelefono").value
        // cliente se asigna automáticamente en el backend
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

function eliminarEmpleado(id) {
    fetch(`${API_URL}/empleados/${id}`, { method: "DELETE" })
        .then(() => cargarEmpleados());
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
                    <button onclick="eliminarPiso(${piso.id})">Eliminar</button>
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

function eliminarPiso(id) {
    fetch(`${API_URL}/pisos/${id}`, { method: "DELETE" })
        .then(() => cargarPisos());
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
                    <button onclick="eliminarHabitacion(${habitacion.id})">Eliminar</button>
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

function eliminarHabitacion(id) {
    fetch(`${API_URL}/habitaciones/${id}`, { method: "DELETE" })
        .then(() => cargarHabitaciones());
}
