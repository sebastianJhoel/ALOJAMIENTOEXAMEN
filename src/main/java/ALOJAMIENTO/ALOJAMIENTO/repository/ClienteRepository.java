package ALOJAMIENTO.ALOJAMIENTO.repository;

import ALOJAMIENTO.ALOJAMIENTO.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
