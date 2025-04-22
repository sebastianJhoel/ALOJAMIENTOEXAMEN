package ALOJAMIENTO.ALOJAMIENTO.repository;

import ALOJAMIENTO.ALOJAMIENTO.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
}