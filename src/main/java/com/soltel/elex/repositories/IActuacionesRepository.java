package com.soltel.elex.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.soltel.elex.models.ActuacionesModel;



@Repository
public interface IActuacionesRepository extends JpaRepository<ActuacionesModel, Integer>{

    @Query("SELECT a FROM ActuacionesModel a WHERE a.borrado = false")
    List<ActuacionesModel> findAllSinBorrar();

    @Query("SELECT a FROM ActuacionesModel a WHERE a.borrado = true")
    List<ActuacionesModel> findAllBorrados();
    
    @Query("SELECT a FROM ActuacionesModel a WHERE a.expediente.id = :idExpediente")
    List<ActuacionesModel> findAllByExpedienteId(int idExpediente);

    @Query("SELECT a FROM ActuacionesModel a WHERE a.usuario = :usuario AND a.fecha = :fecha")
    List<ActuacionesModel> findAllByUsuarioAndFecha(String usuario, LocalDate fecha);
    
}
