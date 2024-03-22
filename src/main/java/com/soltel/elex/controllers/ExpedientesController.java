package com.soltel.elex.controllers;

import java.time.LocalDate;
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

import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.models.Tipos_expedienteModel;
import com.soltel.elex.services.ExpedientesService;
import com.soltel.elex.services.Tipos_expedienteService;

@RestController
@RequestMapping("/api/expedientes")
public class ExpedientesController {

    @Autowired
    private ExpedientesService servicioExpediente;

    @Autowired
    private Tipos_expedienteService servicioTiposExpediente;

    @GetMapping("/consultarExistentes")
    public List<ExpedientesModel> dameExpedientesExistentes() {
        return servicioExpediente.consultarExpedientesExistentes();
    }

    @PostMapping("/insertar/{nig}/{fecha}/{estado}/{opciones}/{descripcion}/{idTiposExpediente}")
    public ResponseEntity<?> insertarExpediente(@PathVariable String nig, @PathVariable LocalDate fecha, @PathVariable String estado,
    @PathVariable String opciones, @PathVariable String descripcion, @PathVariable int idTiposExpediente)
    {
        ExpedientesModel expediente = new ExpedientesModel();
        Optional<Tipos_expedienteModel> tipoBuscado = servicioTiposExpediente.obtenerTipoPorId(idTiposExpediente);
        

        if(tipoBuscado.isPresent())
        {
        Tipos_expedienteModel tipo = tipoBuscado.get();

        expediente.setNig(nig);
        expediente.setFecha(fecha);
        expediente.setEstado(estado);
        expediente.setOpciones(opciones);
        expediente.setDescripcion(descripcion);
        expediente.setTipo(tipo);

        ExpedientesModel expedienteGuardado = servicioExpediente.insertarExpediente(expediente);
        return ResponseEntity.ok(expedienteGuardado);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de expediente no existe");

    }

    @PutMapping("/actualizar/{id}/{nig}/{fecha}/{estado}/{opciones}/{descripcion}/{idTiposExpediente}")
    public ResponseEntity<?> updateExpediente (@PathVariable Integer id, @PathVariable String nig, @PathVariable LocalDate fecha, @PathVariable String estado,
    @PathVariable String opciones, @PathVariable String descripcion, @PathVariable int idTiposExpediente)
    {
        Optional<ExpedientesModel> expedienteBuscado = servicioExpediente.obtenerExpedientePorId(id);
        Optional<Tipos_expedienteModel> tipoBuscado = servicioTiposExpediente.obtenerTipoPorId(idTiposExpediente);

        if (!tipoBuscado.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de expediente no existe!");
        } else if (expedienteBuscado.isPresent()){
            Tipos_expedienteModel tipo = tipoBuscado.get();
            ExpedientesModel expedienteActualizado = expedienteBuscado.get();

            expedienteActualizado.setNig(nig);
            expedienteActualizado.setFecha(fecha);
            expedienteActualizado.setEstado(estado);
            expedienteActualizado.setOpciones(opciones);
            expedienteActualizado.setDescripcion(descripcion);
            expedienteActualizado.setTipo(tipo);

            ExpedientesModel expedienteGuardado = servicioExpediente.insertarExpediente(expedienteActualizado);
            return ResponseEntity.ok(expedienteGuardado);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Expediente no existe");
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> borrarExpediente(@PathVariable int id){
        Optional<ExpedientesModel> expedienteBuscado = servicioExpediente.obtenerExpedientePorId(id);

        if (expedienteBuscado.isPresent()){

            ExpedientesModel expedienteBorrado = expedienteBuscado.get();

            expedienteBorrado.setBorrado(true);

            ExpedientesModel expedienteGuardado = servicioExpediente.insertarExpediente(expedienteBorrado);
            return ResponseEntity.ok(expedienteGuardado);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Expediente no existe");
    }

}
