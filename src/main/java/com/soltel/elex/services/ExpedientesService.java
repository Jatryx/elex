package com.soltel.elex.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.repositories.IExpedientesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class ExpedientesService {

    @Autowired
    private IExpedientesRepository repository;

    public List<ExpedientesModel> consultarExpedientesExistentes() {
        return repository.findAllSinBorrar();
    }

    public List<ExpedientesModel> consultarExpedientesBorrados() {
        return repository.findAllBorrados();
    }

    public ExpedientesModel insertarExpediente(ExpedientesModel expediente) {
        return repository.save(expediente);
    }

    public ExpedientesModel actualizarExpediente(ExpedientesModel expediente) {
        return repository.save(expediente);
    }

    public Optional<ExpedientesModel> obtenerExpedientePorId(int id) {
        return repository.findById(id);
    }

    public Long contarPorTipoExpediente(int tipoId) {
        return repository.countByTipoExpediente(tipoId);
    }

}
