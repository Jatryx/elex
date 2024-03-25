package com.soltel.elex.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soltel.elex.models.ActuacionesModel;
import com.soltel.elex.repositories.IActuacionesRepository;

@Service
public class ActuacionesService {

    @Autowired
    private IActuacionesRepository repository;

    public List<ActuacionesModel> consultarActuaciones() {
        return repository.findAllSinBorrar();
    }

    public List<ActuacionesModel> consultarActuacionesBorradas() {
        return repository.findAllBorrados();
    }

    public ActuacionesModel insertarActuacion(ActuacionesModel actuacion) {
        return repository.save(actuacion);
    }

    public ActuacionesModel actualizarActuacion(ActuacionesModel actuacion) {
        return repository.save(actuacion);
    }

    public Optional<ActuacionesModel> obtenerActuacionPorId(int id) {
        return repository.findById(id);
    }

    public List<ActuacionesModel> obtenerTodosLasActuacionesExpediente(int idExpediente) {
        return repository.findAllByExpedienteId(idExpediente);
    }

    public List<ActuacionesModel> obtenerActuacionesPorResponsableAndFecha(String usuario, LocalDate fecha) {
        List<ActuacionesModel> actuaciones = repository.findAllByUsuarioAndFecha(usuario, fecha);
        if (actuaciones.isEmpty()) {
            throw new RuntimeException("No se encontraron actuaciones para el responsable '" + usuario + "' en la fecha '" + fecha.toString() + "'");
        }
        return actuaciones;
    }
}
