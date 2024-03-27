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

import com.soltel.elex.models.EnumExpediente;
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

    @GetMapping("/consultarBorrados")
    public List<ExpedientesModel> dameExpedientesBorrados() {
        return servicioExpediente.consultarExpedientesBorrados();
    }

    @PostMapping("/insertar/{fecha}/{estado}/{opciones}/{descripcion}/{idTiposExpediente}")
    public ResponseEntity<?> insertarExpediente(@PathVariable LocalDate fecha, @PathVariable EnumExpediente estado,
    @PathVariable String opciones, @PathVariable String descripcion, @PathVariable int idTiposExpediente)
    {
        ExpedientesModel expediente = new ExpedientesModel();

        Optional<Tipos_expedienteModel> tipoBuscado = Optional.ofNullable(servicioTiposExpediente.obtenerTipoPorId(idTiposExpediente)
            .orElseThrow(() -> new IllegalArgumentException("Tipo de expediente no existe")));
        

        if(tipoBuscado.isPresent())
        {
        Tipos_expedienteModel tipo = tipoBuscado.get();
        String materia = tipo.getMateria();
        String nigConstruido = "";

        String materiaTresLetras = materia.substring(0, 3);
        String materiaMayusculas = materiaTresLetras.toUpperCase();

        nigConstruido = materiaMayusculas;

        int año = fecha.getYear();

        Long cantidadExpedientes = servicioExpediente.contarPorTipoExpediente(idTiposExpediente);
        int numeroExpediente = cantidadExpedientes.intValue() + 1;

        String nig = nigConstruido + "-" + año + "-" + numeroExpediente;

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

    @PutMapping("/actualizar/{id}/{fecha}/{estado}/{opciones}/{descripcion}/{idTiposExpediente}")
    public ResponseEntity<?> updateExpediente (@PathVariable Integer id, @PathVariable LocalDate fecha, @PathVariable EnumExpediente estado,
    @PathVariable String opciones, @PathVariable String descripcion, @PathVariable int idTiposExpediente)
    {
        Optional<ExpedientesModel> expedienteBuscado = servicioExpediente.obtenerExpedientePorId(id);
        Optional<Tipos_expedienteModel> tipoBuscado = servicioTiposExpediente.obtenerTipoPorId(idTiposExpediente);

        if (!tipoBuscado.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de expediente no existe!");
        } else if (expedienteBuscado.isPresent()){
            Tipos_expedienteModel tipo = tipoBuscado.get();
            ExpedientesModel expedienteActualizado = expedienteBuscado.get();

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

    @GetMapping("/consultarPorTipo/{idTipo}")
    public List<ExpedientesModel> dameExpedientesPorTipo(@PathVariable int idTipo){
        return servicioExpediente.obtenerExpedientesPorTipoExpediente(idTipo);
    }

    @GetMapping("/consultarPorEstadoYFecha/{estado}/{fecha}")
    public List<ExpedientesModel> dameExpedientesPorEstadoYFecha(@PathVariable String estado, @PathVariable LocalDate fecha){
        return servicioExpediente.obtenerExpedientesPorEstadoYFecha(estado, fecha);
    }

    @GetMapping("/consultarPorNig/{nip}")
    public ResponseEntity<?> dameExpedientePorNig(@PathVariable String nip){
        ExpedientesModel expediente = servicioExpediente.obtenerExpedientePorNig(nip);
        return ResponseEntity.ok(expediente);
    }

}
