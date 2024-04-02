package com.soltel.elex.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/consultarBorradas")
    public List<ActuacionesModel> dameActuacionesBorradas() {
        return service.consultarActuacionesBorradas();
    }
    

    @PostMapping("/insertar/{observaciones}/{finalizado}/{fecha}/{usuario}/{responsable1}/{responsable2}/{consejeria}/{idExpediente}")
    public ResponseEntity<?> insertarActuacion(@PathVariable String observaciones,@PathVariable boolean finalizado,@PathVariable LocalDate fecha,@PathVariable String usuario, 
    @PathVariable String responsable1,@PathVariable String responsable2,@PathVariable String consejeria,@PathVariable int idExpediente){

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
    public ResponseEntity<?> actualizarActuacion(@PathVariable int id,@PathVariable String observaciones,@PathVariable boolean finalizado,@PathVariable LocalDate fecha,
    @PathVariable String usuario,@PathVariable String responsable1,@PathVariable String responsable2,@PathVariable String consejeria,@PathVariable int idExpediente) {
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
    public ResponseEntity<?> eliminarActuacion(@PathVariable int id) {
        Optional<ActuacionesModel> actuacionBuscada = service.obtenerActuacionPorId(id);

        if (actuacionBuscada.isPresent()) {
            ActuacionesModel actuacion = actuacionBuscada.get();
            actuacion.setBorrado(true);
            
            ActuacionesModel actuacionGuardada = service.actualizarActuacion(actuacion);
            return ResponseEntity.ok(actuacionGuardada);
            
        }

        return ResponseEntity.badRequest().body("Actuación no existe");
    }
    
    @GetMapping("/consultarPorExpediente/{idExpediente}")
    public List<ActuacionesModel> dameActuacionesPorExpediente(@PathVariable int idExpediente) {
        return service.obtenerTodosLasActuacionesExpediente(idExpediente);
    }

    @GetMapping("/consultarPorUsuarioAndFecha/{usuario}/{fecha}")
    public List<ActuacionesModel> dameActuacionesPorResponsableAndFecha(@PathVariable String usuario,@PathVariable LocalDate fecha) {
        return service.obtenerActuacionesPorResponsableAndFecha(usuario, fecha);
    }

    @GetMapping("/consultarPorId/{id}")
    public ResponseEntity<?> dameActuacionPorId(@PathVariable int id) {
        Optional<ActuacionesModel> actuacion = service.obtenerActuacionPorId(id);

        if (actuacion.isPresent()) {
            return ResponseEntity.ok(actuacion.get());
        }

        return ResponseEntity.badRequest().body("Actuación no existe");
    }

    @PutMapping("/restaurar/{id}")
    public ResponseEntity<?> restaurarActuacion(@PathVariable int id) {
        Optional<ActuacionesModel> actuacionBuscada = service.obtenerActuacionPorId(id);

        if (actuacionBuscada.isPresent()) {
            ActuacionesModel actuacion = actuacionBuscada.get();
            actuacion.setBorrado(false);
            
            ActuacionesModel actuacionGuardada = service.actualizarActuacion(actuacion);
            return ResponseEntity.ok(actuacionGuardada);
            
        }

        return ResponseEntity.badRequest().body("Actuación no existe");
    }
}
