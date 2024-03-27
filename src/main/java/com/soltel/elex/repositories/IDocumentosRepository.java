package com.soltel.elex.repositories;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.soltel.elex.models.DocumentosModel;

@Repository
public interface IDocumentosRepository extends JpaRepository<DocumentosModel, Integer>{

    @Query("SELECT d FROM DocumentosModel d WHERE d.borrado = false")
    List<DocumentosModel> findAllSinBorrar();

    @Query("SELECT d FROM DocumentosModel d WHERE d.borrado = true")
    List<DocumentosModel> findAllBorrados();

    @Query("SELECT d FROM DocumentosModel d WHERE d.expediente.id = :idExpediente")
    List<DocumentosModel> findAllByExpedienteId(int idExpediente);

    @Query("SELECT d FROM DocumentosModel d WHERE d.nombreDocumento = :nombreDocumento")
    List<DocumentosModel> findByNombreDocumento(String nombreDocumento);
}
