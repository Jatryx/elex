package com.soltel.elex.services;

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
        return repository.findAll();
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
}
