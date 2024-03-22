package com.soltel.elex.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.soltel.elex.models.Tipos_expedienteModel;


@Repository
public interface ITipos_expedienteRepository extends JpaRepository<Tipos_expedienteModel, Integer>{
    
    @Query("SELECT t FROM Tipos_expedienteModel t WHERE t.borrado = false")
    List<Tipos_expedienteModel> findAllSinBorrar();
}
