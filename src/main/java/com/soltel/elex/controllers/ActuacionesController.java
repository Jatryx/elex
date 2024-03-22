package com.soltel.elex.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soltel.elex.models.ActuacionesModel;
import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.services.ActuacionesService;
import com.soltel.elex.services.ExpedientesService;

@RestController
@RequestMapping("/api/actuaciones")
public class ActuacionesController {

    @Autowired
    private ActuacionesService service;

    @Autowired
    private ExpedientesService expedienteService;

    @GetMapping("/consultarExistentes")
    public List<ActuacionesModel> dameActuacionesExistentes() {
        return service.consultarActuaciones();
    }
    

    @PostMapping("/insertar/{observaciones}/{finalizado}/{fecha}/{usuario}/{responsable1}/{responsable2}/{consejeria}/{idExpediente}")
    public ResponseEntity<?> insertarActuacion(String observaciones, boolean finalizado, LocalDate fecha, String usuario, String responsable1, String responsable2, String consejeria, int idExpediente){

        ActuacionesModel actuacion = new ActuacionesModel();
        Optional<ExpedientesModel> expediente = expedienteService.obtenerExpedientePorId(idExpediente);

        if (expediente.isPresent()) {
            actuacion.setObservaciones(observaciones);
            actuacion.setFinalizado(finalizado);
            actuacion.setFecha(fecha);
            actuacion.setUsuario(usuario);
            actuacion.setResponsable1(responsable1);
            actuacion.setResponsable2(responsable2);
            actuacion.setConsejeria(consejeria);
            actuacion.setExpediente(expediente.get());

            ActuacionesModel actuacionGuardada = service.insertarActuacion(actuacion);
            return ResponseEntity.ok(actuacionGuardada);
            
        }

        return ResponseEntity.badRequest().body("Expediente no existe");
    }

    @PutMapping("/actualizar/{id}/{observaciones}/{finalizado}/{fecha}/{usuario}/{responsable1}/{responsable2}/{consejeria}/{idExpediente}")
    public ResponseEntity<?> actualizarActuacion(int id, String observaciones, boolean finalizado, LocalDate fecha, String usuario, String responsable1, String responsable2, String consejeria, int idExpediente) {
        ActuacionesModel actuacion = new ActuacionesModel();
        Optional<ExpedientesModel> expediente = expedienteService.obtenerExpedientePorId(idExpediente);

        if (expediente.isPresent()) {
            actuacion.setId(id);
            actuacion.setObservaciones(observaciones);
            actuacion.setFinalizado(finalizado);
            actuacion.setFecha(fecha);
            actuacion.setUsuario(usuario);
            actuacion.setResponsable1(responsable1);
            actuacion.setResponsable2(responsable2);
            actuacion.setConsejeria(consejeria);
            actuacion.setExpediente(expediente.get());

            ActuacionesModel actuacionGuardada = service.actualizarActuacion(actuacion);
            return ResponseEntity.ok(actuacionGuardada);
        }

        return ResponseEntity.badRequest().body("Expediente no existe");
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarActuacion(int id) {
        Optional<ActuacionesModel> actuacionBuscada = service.obtenerActuacionPorId(id);

        if (actuacionBuscada.isPresent()) {
            ActuacionesModel actuacion = actuacionBuscada.get();
            actuacion.setBorrado(true);
            
            ActuacionesModel actuacionGuardada = service.actualizarActuacion(actuacion);
            return ResponseEntity.ok(actuacionGuardada);
            
        }

        return ResponseEntity.badRequest().body("Actuación no existe");
    }
    
}
