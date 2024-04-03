package com.soltel.elex.services;

import java.nio.file.Paths;
import java.io.ByteArrayOutputStream;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;


import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.soltel.elex.models.ActuacionesModel;
import com.soltel.elex.models.DocumentosModel;
import com.soltel.elex.models.ExpedientesModel;
import com.soltel.elex.repositories.IActuacionesRepository;
import com.soltel.elex.repositories.IDocumentosRepository;
import com.soltel.elex.repositories.IExpedientesRepository;


@Service
public class DocumentosService {

    @Autowired
    private IDocumentosRepository repository;

    @Autowired
    private IExpedientesRepository expedienteRepository;

    @Autowired
    private IActuacionesRepository actuacionRepository;


    public List<DocumentosModel> consultarDocumentos() {
        return repository.findAllSinBorrar();
    }

    public List<DocumentosModel> consultarDocumentosBorrados() {
        return repository.findAllBorrados();
    }

    public DocumentosModel insertarDocumento(DocumentosModel documento) {
        return repository.save(documento);
    }

    public DocumentosModel actualizarDocumento(DocumentosModel documento) {
        return repository.save(documento);
    }

    public Optional<DocumentosModel> obtenerDocumentoPorId(int id) {
        return repository.findById(id);
    }

    public void generatePdfAndSave(Integer id , Integer idExpediente, Integer idActuacion) {
        DocumentosModel documento = repository.findById(id).orElseThrow(() -> new RuntimeException("Documento no encontrado"));

        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            PdfWriter.getInstance(document, baos);
            document.open();

            Font font = FontFactory.getFont(FontFactory.HELVETICA, 16);

            Paragraph datosDocumentosParagraph = new Paragraph("Datos documentos: ", font);
            datosDocumentosParagraph.setAlignment(Element.ALIGN_CENTER);
            datosDocumentosParagraph.setSpacingAfter(25);
            document.add(datosDocumentosParagraph);

            Paragraph nombreDocumentoParagraph = new Paragraph("Nombre del documento: " + documento.getNombreDocumento(), font);
            nombreDocumentoParagraph.setSpacingAfter(25);
            document.add(nombreDocumentoParagraph);
        
  
            Paragraph idParagraph = new Paragraph("ID: " + String.valueOf(documento.getId()), font);
            idParagraph.setSpacingAfter(25); 
            document.add(idParagraph);
        
  
            Paragraph precioParagraph = new Paragraph("Precio: " + String.valueOf(documento.getPrecio()), font);
            precioParagraph.setSpacingAfter(25); 
            document.add(precioParagraph);

            Paragraph descripcionParagraph = new Paragraph("Descripción: " + documento.getDescripcion(), font);
            descripcionParagraph.setSpacingAfter(25); 
            document.add(descripcionParagraph);

            Paragraph datosExpedienteParagraph = new Paragraph("Datos expediente: ", font);
            datosExpedienteParagraph.setAlignment(Element.ALIGN_CENTER);
            datosExpedienteParagraph.setSpacingAfter(25); 
            document.add(datosExpedienteParagraph);

            Paragraph expedienteParagraph = new Paragraph("Expediente: " + String.valueOf(documento.getExpediente().getNig()), font);
            expedienteParagraph.setSpacingAfter(25); 
            document.add(expedienteParagraph);

            Paragraph fecParagraph = new Paragraph("Fecha: " + String.valueOf(documento.getExpediente().getFecha()), font);
            fecParagraph.setSpacingAfter(25);
            document.add(fecParagraph);

            Paragraph estadoParagraph = new Paragraph("Estado: " + String.valueOf(documento.getExpediente().getEstado()), font);
            estadoParagraph.setSpacingAfter(25);
            document.add(estadoParagraph);

            Paragraph opcionesParagraph = new Paragraph("Opciones: " + String.valueOf(documento.getExpediente().getOpciones()), font);
            opcionesParagraph.setSpacingAfter(25);
            document.add(opcionesParagraph);

            Paragraph descripcionExpedienteParagraph = new Paragraph("Descripción: " + documento.getExpediente().getDescripcion(), font);
            descripcionExpedienteParagraph.setSpacingAfter(25);
            document.add(descripcionExpedienteParagraph);



            if(idActuacion != 0)
            {

                ActuacionesModel actuacion = actuacionRepository.findById(idActuacion).orElseThrow(() -> new RuntimeException("Actuación no encontrada"));

                Paragraph datosActuacionesParagraph = new Paragraph("Datos actuaciones: ", font);
                datosActuacionesParagraph.setSpacingAfter(25); 
                datosActuacionesParagraph.setAlignment(Element.ALIGN_CENTER);
                document.add(datosActuacionesParagraph);

                Paragraph observacionesParagraph = new Paragraph("Observaciones: " + String.valueOf(actuacion.getObservaciones()), font);
                observacionesParagraph.setSpacingAfter(25);
                document.add(observacionesParagraph);

                Paragraph finalizadoParagraph = new Paragraph("Finalizado: " + String.valueOf(actuacion.isFinalizado()), font);
                finalizadoParagraph.setSpacingAfter(25);
                document.add(finalizadoParagraph);

                Paragraph fechaParagraph = new Paragraph("Fecha: " + String.valueOf(actuacion.getFecha()), font);
                fechaParagraph.setSpacingAfter(25);
                document.add(fechaParagraph);

                Paragraph usuarioParagraph = new Paragraph("Usuario: " + String.valueOf(actuacion.getUsuario()), font);
                usuarioParagraph.setSpacingAfter(25);
                document.add(usuarioParagraph);

                Paragraph responsable1Paragraph = new Paragraph("Responsable 1: " + String.valueOf(actuacion.getResponsable1()), font);
                responsable1Paragraph.setSpacingAfter(25);
                document.add(responsable1Paragraph);

                Paragraph responsable2Paragraph = new Paragraph("Responsable 2: " + String.valueOf(actuacion.getResponsable2()), font);
                responsable2Paragraph.setSpacingAfter(25);
                document.add(responsable2Paragraph);

                Paragraph consejeriaParagraph = new Paragraph("Consejería: " + String.valueOf(actuacion.getConsejeria()), font);
                consejeriaParagraph.setSpacingAfter(25);
                document.add(consejeriaParagraph);
                
            }


            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        documento.setArchivoPdf(baos.toByteArray());
        repository.save(documento);
    }
    
    public byte[] readPdf(Integer id) {
        DocumentosModel documento = repository.findById(id).orElseThrow(() -> new RuntimeException("Documento no encontrado"));
        return documento.getArchivoPdf();
    }

    @Value("${app.document-dir}")
    private String documentDir;

    public void generatePdfAndSaveToFile(Integer idDocumento, Integer idExpediente, Integer idActuacion) {
        DocumentosModel documento = repository.findById(idDocumento).orElseThrow(() -> new RuntimeException("Documento no encontrado"));
    
        String rutaArchivoBorrar = documento.getRuta();

        if(rutaArchivoBorrar != null)
        {
            try {
                Files.deleteIfExists(Paths.get(rutaArchivoBorrar));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        ExpedientesModel expediente = expedienteRepository.findById(idExpediente).orElseThrow(() -> new RuntimeException("Expediente no encontrado"));

        String ruta = documentDir + "/documento_" + expediente.getNig()+ "_" + idDocumento + ".pdf";

        documento.setRuta(ruta);

        repository.save(documento);
    
        Document document = new Document();
        try {
            PdfWriter.getInstance(document, new FileOutputStream(ruta));
            document.open();

            Font font = FontFactory.getFont(FontFactory.HELVETICA, 16);

            Paragraph datosDocumentosParagraph = new Paragraph("Datos documentos: ", font);
            datosDocumentosParagraph.setAlignment(Element.ALIGN_CENTER);
            datosDocumentosParagraph.setSpacingAfter(25);
            document.add(datosDocumentosParagraph);

            Paragraph nombreDocumentoParagraph = new Paragraph("Nombre del documento: " + documento.getNombreDocumento(), font);
            nombreDocumentoParagraph.setSpacingAfter(25);
            document.add(nombreDocumentoParagraph);
        
  
            Paragraph idParagraph = new Paragraph("ID: " + String.valueOf(documento.getId()), font);
            idParagraph.setSpacingAfter(25); 
            document.add(idParagraph);
        
  
            Paragraph precioParagraph = new Paragraph("Precio: " + String.valueOf(documento.getPrecio()), font);
            precioParagraph.setSpacingAfter(25); 
            document.add(precioParagraph);

            Paragraph descripcionParagraph = new Paragraph("Descripción: " + documento.getDescripcion(), font);
            descripcionParagraph.setSpacingAfter(25); 
            document.add(descripcionParagraph);

            Paragraph datosExpedienteParagraph = new Paragraph("Datos expediente: ", font);
            datosExpedienteParagraph.setAlignment(Element.ALIGN_CENTER);
            datosExpedienteParagraph.setSpacingAfter(25); 
            document.add(datosExpedienteParagraph);

            Paragraph expedienteParagraph = new Paragraph("Expediente: " + String.valueOf(documento.getExpediente().getNig()), font);
            expedienteParagraph.setSpacingAfter(25); 
            document.add(expedienteParagraph);

            Paragraph fecParagraph = new Paragraph("Fecha: " + String.valueOf(documento.getExpediente().getFecha()), font);
            fecParagraph.setSpacingAfter(25);
            document.add(fecParagraph);

            Paragraph estadoParagraph = new Paragraph("Estado: " + String.valueOf(documento.getExpediente().getEstado()), font);
            estadoParagraph.setSpacingAfter(25);
            document.add(estadoParagraph);

            Paragraph opcionesParagraph = new Paragraph("Opciones: " + String.valueOf(documento.getExpediente().getOpciones()), font);
            opcionesParagraph.setSpacingAfter(25);
            document.add(opcionesParagraph);

            Paragraph descripcionExpedienteParagraph = new Paragraph("Descripción: " + documento.getExpediente().getDescripcion(), font);
            descripcionExpedienteParagraph.setSpacingAfter(25);
            document.add(descripcionExpedienteParagraph);



            if(idActuacion != 0)
            {

                ActuacionesModel actuacion = actuacionRepository.findById(idActuacion).orElseThrow(() -> new RuntimeException("Actuación no encontrada"));

                Paragraph datosActuacionesParagraph = new Paragraph("Datos actuaciones: ", font);
                datosActuacionesParagraph.setSpacingAfter(25); 
                datosActuacionesParagraph.setAlignment(Element.ALIGN_CENTER);
                document.add(datosActuacionesParagraph);

                Paragraph observacionesParagraph = new Paragraph("Observaciones: " + String.valueOf(actuacion.getObservaciones()), font);
                observacionesParagraph.setSpacingAfter(25);
                document.add(observacionesParagraph);

                Paragraph finalizadoParagraph = new Paragraph("Finalizado: " + String.valueOf(actuacion.isFinalizado()), font);
                finalizadoParagraph.setSpacingAfter(25);
                document.add(finalizadoParagraph);

                Paragraph fechaParagraph = new Paragraph("Fecha: " + String.valueOf(actuacion.getFecha()), font);
                fechaParagraph.setSpacingAfter(25);
                document.add(fechaParagraph);

                Paragraph usuarioParagraph = new Paragraph("Usuario: " + String.valueOf(actuacion.getUsuario()), font);
                usuarioParagraph.setSpacingAfter(25);
                document.add(usuarioParagraph);

                Paragraph responsable1Paragraph = new Paragraph("Responsable 1: " + String.valueOf(actuacion.getResponsable1()), font);
                responsable1Paragraph.setSpacingAfter(25);
                document.add(responsable1Paragraph);

                Paragraph responsable2Paragraph = new Paragraph("Responsable 2: " + String.valueOf(actuacion.getResponsable2()), font);
                responsable2Paragraph.setSpacingAfter(25);
                document.add(responsable2Paragraph);

                Paragraph consejeriaParagraph = new Paragraph("Consejería: " + String.valueOf(actuacion.getConsejeria()), font);
                consejeriaParagraph.setSpacingAfter(25);
                document.add(consejeriaParagraph);
                
            }

    
            document.close();
        } catch (DocumentException | FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    public List<DocumentosModel> obtenerDocumentosPorExpediente(int idExpediente) {
        return repository.findAllByExpedienteId(idExpediente);
    }

    public List<DocumentosModel> obtenerNombreDocumento(String nombreDocumento) {
        List<DocumentosModel> documentos = repository.findByNombreDocumento(nombreDocumento);
        
        if (documentos.isEmpty()) {
            throw new RuntimeException("No se encontró ningún documento con el nombre: " + nombreDocumento);
        }
        
        return documentos;
    }

    public byte[] readPdfFromFile(Integer idDocumento) {
    DocumentosModel documento = repository.findById(idDocumento).orElseThrow(() -> new RuntimeException("Documento no encontrado"));
    String filePath = documento.getRuta(); 

    try {
        return Files.readAllBytes(Paths.get(filePath));
        
        } catch (IOException e) {
            throw new RuntimeException("Ocurrió un error al leer el archivo: " + e.getMessage(), e);
        }
    }

    public String obtenerRutaArchivo(Integer idDocumento) {
        DocumentosModel documento = repository.findById(idDocumento).orElseThrow(() -> new RuntimeException("Documento no encontrado"));
        String filePath = documento.getRuta(); 
        return filePath;
    }
}
