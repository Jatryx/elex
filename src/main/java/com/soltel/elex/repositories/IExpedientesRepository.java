package com.soltel.elex.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.soltel.elex.models.ExpedientesModel;


@Repository
public interface IExpedientesRepository extends JpaRepository<ExpedientesModel, Integer>{

    @Query("SELECT e FROM ExpedientesModel e WHERE e.borrado = false")
    List<ExpedientesModel> findAllSinBorrar();
    
}
