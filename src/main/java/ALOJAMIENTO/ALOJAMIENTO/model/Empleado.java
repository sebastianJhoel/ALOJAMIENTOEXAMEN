package ALOJAMIENTO.ALOJAMIENTO.model;

import jakarta.persistence.*;

@Entity
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String rol;
    private String identificacion;
    private String telefono;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    // Constructores
    public Empleado() {}

    public Empleado(String nombre, String rol, String identificacion, String telefono, Cliente cliente) {
        this.nombre = nombre;
        this.rol = rol;
        this.identificacion = identificacion;
        this.telefono = telefono;
        this.cliente = cliente;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getIdentificacion() { return identificacion; }
    public void setIdentificacion(String identificacion) { this.identificacion = identificacion; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }
}
