package com.soltel.elex.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.soltel.elex.models.ExpedientesModel;


@Repository
public interface IExpedientesRepository extends JpaRepository<ExpedientesModel, Integer>{

    @Query("SELECT e FROM ExpedientesModel e WHERE e.borrado = false")
    List<ExpedientesModel> findAllSinBorrar();

    @Query("SELECT e FROM ExpedientesModel e WHERE e.borrado = true")
    List<ExpedientesModel> findAllBorrados();

    // Para saber cual es el ultimo expediente creado y poder asignarle el siguiente id
    @Query(value = "SELECT COUNT(e) FROM ExpedientesModel e WHERE e.tipo.id = :tipoId")
    Long countByTipoExpediente(@Param("tipoId") int tipoId);
    
    @Query("SELECT e FROM ExpedientesModel e WHERE e.tipo.id = :tipoId")
    List<ExpedientesModel> findByTipoExpediente(@Param("tipoId") Integer tipoId);

    @Query("SELECT e FROM ExpedientesModel e WHERE e.estado = :estado AND e.fecha = :fecha")
    List<ExpedientesModel> findByEstadoAndFecha(@Param("estado") String estado, @Param("fecha") LocalDate fecha);

    @Query("SELECT e FROM ExpedientesModel e WHERE e.nig = :nig")
    Optional<ExpedientesModel> findByNig(@Param("nig") String nig);
}
