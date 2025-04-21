package Alojamiento1.Alojamiento1.controller;

import Alojamiento1.Alojamiento1.model.*;
import Alojamiento1.Alojamiento1.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class AlojamientoController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private PisoRepository pisoRepository;

    @Autowired
    private HabitacionRepository habitacionRepository;



    // ===================== CLIENTE =====================

    @GetMapping("/clientes")
    public List<Cliente> getClientes() {
        return clienteRepository.findAll();
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Long id) {
        return clienteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/clientes")
    public Cliente crearCliente(@RequestBody Cliente cliente) {
        // Obtener los IDs de piso y habitación
        Long pisoId = cliente.getPiso().getId();
        Long habitacionId = cliente.getHabitacion().getId();

        // Buscar el piso y habitación completos desde la base de datos
        Piso pisoCompleto = pisoRepository.findById(pisoId)
                .orElseThrow(() -> new RuntimeException("Piso no encontrado"));
        Habitacion habitacionCompleta = habitacionRepository.findById(habitacionId)
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));

        // Asignar los objetos completos al cliente
        cliente.setPiso(pisoCompleto);
        cliente.setHabitacion(habitacionCompleta);

        return clienteRepository.save(cliente);
    }


    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        return clienteRepository.findById(id).map(c -> {
            c.setNombre(cliente.getNombre());
            c.setIdentificacion(cliente.getIdentificacion());
            c.setTelefono(cliente.getTelefono());
            c.setPiso(cliente.getPiso());
            c.setHabitacion(cliente.getHabitacion());
            return ResponseEntity.ok(clienteRepository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/clientes/{id}")
    public ResponseEntity<Cliente> patchCliente(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return clienteRepository.findById(id).map(cliente -> {
            if (updates.containsKey("nombre")) cliente.setNombre((String) updates.get("nombre"));
            if (updates.containsKey("identificacion")) cliente.setIdentificacion((String) updates.get("identificacion"));
            if (updates.containsKey("telefono")) cliente.setTelefono((String) updates.get("telefono"));
            return ResponseEntity.ok(clienteRepository.save(cliente));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // ===================== EMPLEADO =====================

    @GetMapping("/empleados")
    public List<Empleado> getEmpleados() {
        return empleadoRepository.findAll();
    }

    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleado> getEmpleadoById(@PathVariable Long id) {
        return empleadoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/empleados")
    public Empleado crearEmpleado(@RequestBody Empleado empleado) {
        // Asignar al cliente automáticamente (ejemplo simple)
        List<Cliente> clientes = clienteRepository.findAll();
        if (!clientes.isEmpty()) {
            Cliente clienteAsignado = clientes.get(0);
            empleado.setCliente(clienteAsignado);
        }
        return empleadoRepository.save(empleado);
    }

    @PutMapping("/empleados/{id}")
    public ResponseEntity<Empleado> updateEmpleado(@PathVariable Long id, @RequestBody Empleado empleado) {
        return empleadoRepository.findById(id).map(e -> {
            e.setNombre(empleado.getNombre());
            e.setIdentificacion(empleado.getIdentificacion());
            e.setTelefono(empleado.getTelefono());
            return ResponseEntity.ok(empleadoRepository.save(e));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/empleados/{id}")
    public ResponseEntity<Empleado> patchEmpleado(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return empleadoRepository.findById(id).map(empleado -> {
            if (updates.containsKey("nombre")) empleado.setNombre((String) updates.get("nombre"));
            if (updates.containsKey("identificacion")) empleado.setIdentificacion((String) updates.get("identificacion"));
            if (updates.containsKey("telefono")) empleado.setTelefono((String) updates.get("telefono"));
            return ResponseEntity.ok(empleadoRepository.save(empleado));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Void> deleteEmpleado(@PathVariable Long id) {
        if (empleadoRepository.existsById(id)) {
            empleadoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // ===================== PISO =====================

    @GetMapping("/pisos")
    public List<Piso> getPisos() {
        return pisoRepository.findAll();
    }

    @GetMapping("/pisos/{id}")
    public ResponseEntity<Piso> getPisoById(@PathVariable Long id) {
        return pisoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/pisos")
    public Piso crearPiso(@RequestBody Piso piso) {
        return pisoRepository.save(piso);
    }

    @PutMapping("/pisos/{id}")
    public ResponseEntity<Piso> updatePiso(@PathVariable Long id, @RequestBody Piso piso) {
        return pisoRepository.findById(id).map(p -> {
            p.setNumero(piso.getNumero());
            return ResponseEntity.ok(pisoRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/pisos/{id}")
    public ResponseEntity<Piso> patchPiso(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return pisoRepository.findById(id).map(piso -> {
            if (updates.containsKey("numero")) piso.setNumero((Integer) updates.get("numero"));
            return ResponseEntity.ok(pisoRepository.save(piso));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/pisos/{id}")
    public ResponseEntity<Void> deletePiso(@PathVariable Long id) {
        if (pisoRepository.existsById(id)) {
            pisoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // ===================== HABITACION =====================

    @GetMapping("/habitaciones")
    public List<Habitacion> getHabitaciones() {
        return habitacionRepository.findAll();
    }

    @GetMapping("/habitaciones/{id}")
    public ResponseEntity<Habitacion> getHabitacionById(@PathVariable Long id) {
        return habitacionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/habitaciones")
    public Habitacion crearHabitacion(@RequestBody Habitacion habitacion) {
        // Obtener el ID del piso desde el objeto recibido
        Long pisoId = habitacion.getPiso().getId();

        // Buscar el piso completo en la base de datos
        Piso pisoCompleto = pisoRepository.findById(pisoId)
                .orElseThrow(() -> new RuntimeException("Piso no encontrado"));

        // Asignar el piso completo a la habitación
        habitacion.setPiso(pisoCompleto);

        return habitacionRepository.save(habitacion);
    }

    @PutMapping("/habitaciones/{id}")
    public ResponseEntity<Habitacion> updateHabitacion(@PathVariable Long id, @RequestBody Habitacion habitacion) {
        return habitacionRepository.findById(id).map(h -> {
            h.setNumero(habitacion.getNumero());
            h.setPiso(habitacion.getPiso());
            return ResponseEntity.ok(habitacionRepository.save(h));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/habitaciones/{id}")
    public ResponseEntity<Habitacion> patchHabitacion(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return habitacionRepository.findById(id).map(habitacion -> {
            if (updates.containsKey("numero")) habitacion.setNumero((Integer) updates.get("numero"));
            return ResponseEntity.ok(habitacionRepository.save(habitacion));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/habitaciones/{id}")
    public ResponseEntity<Void> deleteHabitacion(@PathVariable Long id) {
        if (habitacionRepository.existsById(id)) {
            habitacionRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
