package ALOJAMIENTO.ALOJAMIENTO.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Piso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer numero;

    // Constructores
    public Piso() {}

    public Piso(int numero) {
        this.numero = numero;
    }

    // Getters y Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Integer getNumero() { return numero; }

    public void setNumero(Integer numero) { this.numero = numero; }
}
