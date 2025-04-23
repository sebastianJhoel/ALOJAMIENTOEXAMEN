<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>ALOJAMIENTO1</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<h1>ALOJAMIENTO</h1>

<div class="container">
    <button class="toggle-btn" onclick="toggleDarkMode()">🌓 Modo Oscuro</button>
    <!-- Panel Izquierdo: Formularios -->
    <div class="panel-izquierdo">
        <!-- Sección: Agregar Piso -->
        <section>
            <h2>Agregar Piso</h2>
            <form id="pisoForm">
                <input type="number" id="numeroPiso" placeholder="Número de Piso" required>
                <button type="submit">Agregar Piso</button>
            </form>
        </section>

        <!-- Sección: Agregar Habitación -->
        <section>
            <h2>Agregar Habitación</h2>
            <form id="habitacionForm">
                <input type="number" id="numeroHabitacion" placeholder="Número de Habitación" required>
                <input type="number" id="habitacionPisoId" placeholder="ID de Piso al que pertenece" required>
                <button type="submit">Agregar Habitación</button>
            </form>
        </section>

        <!-- Sección: Agregar Cliente -->
        <section>
            <h2>Agregar Cliente</h2>
            <form id="clienteForm">
                <input type="text" id="clienteNombre" placeholder="Nombre" required>
                <input type="text" id="clienteIdentificacion" placeholder="Identificación" required>
                <input type="text" id="clienteTelefono" placeholder="Teléfono" required>
                <input type="number" id="clientePiso" placeholder="ID de Piso" required>
                <input type="number" id="clienteHabitacion" placeholder="ID de Habitación" required>
                <button type="submit">Agregar Cliente</button>
            </form>
        </section>

        <!-- Sección: Agregar Empleado -->
        <section>
            <h2>Agregar Empleado</h2>
            <form id="empleadoForm">
                <input type="text" id="empleadoNombre" placeholder="Nombre" required>
                <input type="text" id="empleadoIdentificacion" placeholder="Identificación" required>
                <input type="text" id="empleadoTelefono" placeholder="Teléfono" required>
                <input type="number" id="empleadoClienteId" placeholder="ID Cliente Asignado" required>
                <button type="submit">Agregar Empleado</button>
            </form>
        </section>
    </div>

    <!-- Panel Derecho: Resultados -->
    <div class="panel-derecho">
        <!-- Lista de Pisos -->
        <section>
            <h2>Pisos Registrados</h2>
            <div id="pisosLista"></div>
        </section>

        <!-- Lista de Habitaciones -->
        <section>
            <h2>Habitaciones Registradas</h2>
            <div id="habitacionesLista"></div>
        </section>

        <!-- Lista de Clientes -->
        <section>
            <h2>Clientes Registrados</h2>
            <div id="clientesLista"></div>
        </section>

        <!-- Lista de Empleados -->
        <section>
            <h2>Empleados Registrados</h2>
            <div id="empleadosLista"></div>
        </section>
    </div>
</div>
<script>
    function toggleDarkMode() {
        document.body.classList.toggle("dark");
    }
</script>

<script src="app.js"></script>

</body>
</html>
