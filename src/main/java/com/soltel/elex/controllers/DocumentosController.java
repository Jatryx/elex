package com.soltel.elex.controllers;



import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.springframework.http.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.models.DocumentosModel;
import com.soltel.elex.services.DocumentosService;
import com.soltel.elex.services.ExpedientesService;

@RestController
@RequestMapping("/api/documentos")
public class DocumentosController {

    @Autowired
    private DocumentosService service;

    @Autowired
    private ExpedientesService expedienteService;
    
    @GetMapping("/consultarExistentes")
    public List<DocumentosModel> dameDocumentosExistentes() {
        return service.consultarDocumentos();
    }

    @GetMapping("/consultarBorrados")
    public List<DocumentosModel> dameDocumentosBorrados() {
        return service.consultarDocumentosBorrados();
    }

    @PostMapping("/insertar/{precio}/{nombreDocumento}/{descripcion}/{idExpediente}")
    public ResponseEntity<?> insertarDocumento(BigDecimal precio, String nombreDocumento, String descripcion, int idExpediente) {
        
        DocumentosModel documento = new DocumentosModel();
        Optional<ExpedientesModel> expediente = expedienteService.obtenerExpedientePorId(idExpediente);

        if(expediente.isPresent())
        {
            documento.setPrecio(precio);
            documento.setNombreDocumento(nombreDocumento);
            documento.setDescripcion(descripcion);
            documento.setExpediente(expediente.get());

            DocumentosModel documentoGuardado = service.insertarDocumento(documento);
            return ResponseEntity.ok(documentoGuardado);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Expediente no existe");
    }

    @PutMapping("/actualizar/{id}/{precio}/{nombreDocumento}/{descripcion}/{idExpediente}")
    public ResponseEntity<?> actualizarDocumento(int id, BigDecimal precio, String nombreDocumento, String descripcion, int idExpediente) {
        
        Optional<DocumentosModel> documentoBuscado = service.obtenerDocumentoPorId(id);
        Optional<ExpedientesModel> expediente = expedienteService.obtenerExpedientePorId(idExpediente);

        if(documentoBuscado.isPresent() && expediente.isPresent())
        {
            DocumentosModel documento = documentoBuscado.get();
            documento.setPrecio(precio);
            documento.setNombreDocumento(nombreDocumento);
            documento.setDescripcion(descripcion);
            documento.setExpediente(expediente.get());

            DocumentosModel documentoGuardado = service.actualizarDocumento(documento);
            return ResponseEntity.ok(documentoGuardado);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Expediente no existe");
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarDocumento(int id) {
        
        Optional<DocumentosModel> documentoBuscado = service.obtenerDocumentoPorId(id);

        if(documentoBuscado.isPresent())
        {
            DocumentosModel documento = documentoBuscado.get();
            documento.setBorrado(true);

            DocumentosModel documentoGuardado = service.actualizarDocumento(documento);
            return ResponseEntity.ok(documentoGuardado);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Documento no existe");
    }

    @PostMapping("/generatePdfPorBlop/{id}")
    public ResponseEntity<Void> generatePdfAndSave(@PathVariable Integer id) {
        service.generatePdfAndSave(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/readPdf/{id}")
    public ResponseEntity<byte[]> readPdf(@PathVariable Integer id) {
        byte[] data = service.readPdf(id);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(data);
    }

    @PostMapping("/generatePdfPorRuta/{id}")
    public void generatePdfAndSave1(@PathVariable Integer id) {
        service.generatePdfAndSaveToFile(id);
    }

    @GetMapping("/documentosExpediente/{idExpediente}")
    public List<DocumentosModel> dameDocumentosPorExpediente(@PathVariable int idExpediente) {
        return service.obtenerDocumentosPorExpediente(idExpediente);
    }

    @GetMapping("/documentosNombre/{nombreDocumento}")
    public List<DocumentosModel> dameDocumentosPorNombre(@PathVariable String nombreDocumento) {
        return service.obtenerNombreDocumento(nombreDocumento);
    }
}
