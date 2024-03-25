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

    public List<ExpedientesModel> obtenerExpedientesPorTipoExpediente(int tipoId) {
        return repository.findByTipoExpediente(tipoId);
    }

    //Filtro de expedientes por estado y fecha
    public List<ExpedientesModel> obtenerExpedientesPorEstadoYFecha(String estado, LocalDate fecha) {
        List<ExpedientesModel> expedientes = repository.findByEstadoAndFecha(estado, fecha);
        if (expedientes.isEmpty()) {
            throw new RuntimeException("No se encontraron expedientes con el estado '" + estado + "' y la fecha '" + fecha.toString() + "'");
        }
        return expedientes;
    }

    //Filtro de expedientes por nig
    public ExpedientesModel obtenerExpedientePorNig(String nig) {
        Optional<ExpedientesModel> expedienteOptional = repository.findByNig(nig);
        return expedienteOptional.orElseThrow(() -> new RuntimeException("No se encontró ningún expediente con el NIG: " + nig));
    }
}
