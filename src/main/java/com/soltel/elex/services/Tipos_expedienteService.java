package com.soltel.elex.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soltel.elex.models.Tipos_expedienteModel;
import com.soltel.elex.repositories.ITipos_expedienteRepository;

import java.util.List;
import java.util.Optional;


@Service
public class Tipos_expedienteService {
	@Autowired
    private ITipos_expedienteRepository repository;

    public List<Tipos_expedienteModel> consultarTiposExistentes() {
        return repository.findAllSinBorrar();
    }

    public List<Tipos_expedienteModel> consultarTiposBorrados() {
        return repository.findAllBorrados();
    }

    public Tipos_expedienteModel insertarTipo(Tipos_expedienteModel tipo) {
        return repository.save(tipo);
    }

    public Tipos_expedienteModel actualizarTipo(Tipos_expedienteModel tipo) {
        return repository.save(tipo);
    }

    public void borrarTipo(int id) {
        repository.deleteById(id);
    }

    public Optional<Tipos_expedienteModel> obtenerTipoPorId(int id) {
        return repository.findById(id);
    }


}