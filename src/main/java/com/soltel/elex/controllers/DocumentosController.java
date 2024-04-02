package com.soltel.elex.controllers;



import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import org.springframework.http.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
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
    public ResponseEntity<?> insertarDocumento(@PathVariable BigDecimal precio,@PathVariable String nombreDocumento,@PathVariable String descripcion,@PathVariable Integer idExpediente) {
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

    @PutMapping("/actualizar/{id}/{precio}/{nombreDocumento}/{descripcion}/{idExpediente}/{idActuacion}")
    public ResponseEntity<?> actualizarDocumento(@PathVariable int id,@PathVariable BigDecimal precio,@PathVariable String nombreDocumento,@PathVariable String descripcion,@PathVariable int idExpediente,@PathVariable int idActuacion) {
        
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

            service.generatePdfAndSaveToFile(id, idExpediente, idActuacion);
            service.generatePdfAndSave(id, idExpediente, idActuacion);

            return ResponseEntity.ok(documentoGuardado);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Expediente no existe");
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarDocumento(@PathVariable int id) {
        
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

    @PostMapping("/generatePdfPorBlop/{id}/{idExpediente}/{idActuacion}")
    public ResponseEntity<Void> generatePdfAndSave(@PathVariable Integer id, @PathVariable Integer idExpediente, @PathVariable Integer idActuacion) {
        service.generatePdfAndSave(id, idExpediente, idActuacion);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/readPdf/{id}")
    public ResponseEntity<byte[]> readPdf(@PathVariable Integer id) {
        byte[] data = service.readPdf(id);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(data);
    }

    @PostMapping("/generatePdfPorRuta/{idDocumento}/{idExpediente}/{idActuacion}")
    public void generatePdfAndSave1(@PathVariable Integer idDocumento, @PathVariable Integer idExpediente, @PathVariable Integer idActuacion) {
        service.generatePdfAndSaveToFile(idDocumento, idExpediente, idActuacion);
    }

    @GetMapping("/readPdfPorRuta/{idDocumento}")
    public ResponseEntity<byte[]> readPdf1(@PathVariable Integer idDocumento) {
        byte[] data = service.readPdfFromFile(idDocumento);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(data);
    }

    @GetMapping("/documentosExpediente/{idExpediente}")
    public List<DocumentosModel> dameDocumentosPorExpediente(@PathVariable int idExpediente) {
        return service.obtenerDocumentosPorExpediente(idExpediente);
    }

    @GetMapping("/documentosNombre/{nombreDocumento}")
    public List<DocumentosModel> dameDocumentosPorNombre(@PathVariable String nombreDocumento) {
        return service.obtenerNombreDocumento(nombreDocumento);
    }

    @GetMapping("/descargar/{idDocumento}")
    public ResponseEntity<?> descargarArchivo(@PathVariable Integer idDocumento) {
        try {
            String rutaArchivo = service.obtenerRutaArchivo(idDocumento);

            
            Resource resource = new FileSystemResource(rutaArchivo);


            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=" + resource.getFilename())
                .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se pudo leer el archivo " + idDocumento);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al descargar el archivo: " + e.getMessage());
        }
    }

    @GetMapping("/obtenerPorId/{id}")
    public ResponseEntity<?> obtenerDocumentoPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.obtenerDocumentoPorId(id));
    }
    
}
