package com.soltel.elex.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soltel.elex.models.Tipos_expedienteModel;
import com.soltel.elex.services.Tipos_expedienteService;

@RestController
@RequestMapping("/api/tipos_expediente")
public class Tipos_expedienteController {
    @Autowired
    private Tipos_expedienteService servicioTipo;

    @GetMapping("/consultarExistentes")
    public List<Tipos_expedienteModel> dameTiposExpedienteExistentes() {
        return servicioTipo.consultarTiposExistentes();
    }

    @GetMapping("/consultarBorrados")   
    public List<Tipos_expedienteModel> dameTiposExpedienteBorrados() {
        return servicioTipo.consultarTiposBorrados();
    }

    @PostMapping("/insertar/{materia}")
    public Tipos_expedienteModel insertarTipo(@PathVariable String materia) {
        Tipos_expedienteModel tipo = new Tipos_expedienteModel();
        tipo.setMateria(materia);
        return servicioTipo.insertarTipo(tipo);
    }

    @PutMapping("/actualizar/{id}/{materia}")
    public ResponseEntity<?> actualizarTipo(@PathVariable int id, @PathVariable String materia) {
        Optional<Tipos_expedienteModel> tipo = servicioTipo.obtenerTipoPorId(id);
        if (tipo.isPresent()) {
            Tipos_expedienteModel tipoActualizado = tipo.get();
            tipoActualizado.setMateria(materia);
            Tipos_expedienteModel guardaTipo = servicioTipo.actualizarTipo(tipoActualizado);
            return ResponseEntity.ok(guardaTipo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tipo no encontrado");
        }
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<Void> borrarTipo(@PathVariable int id) {
        return servicioTipo.obtenerTipoPorId(id)
                .map(tipo -> {
                    servicioTipo.borrarTipo(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}