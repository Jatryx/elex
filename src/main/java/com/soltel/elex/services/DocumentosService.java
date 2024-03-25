package com.soltel.elex.services;


import java.io.ByteArrayOutputStream;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
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

import com.soltel.elex.models.DocumentosModel;
import com.soltel.elex.repositories.IDocumentosRepository;


@Service
public class DocumentosService {

    @Autowired
    private IDocumentosRepository repository;

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

    public void generatePdfAndSave(Integer id) {
        DocumentosModel documento = repository.findById(id).orElseThrow(() -> new RuntimeException("Documento no encontrado"));

        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            PdfWriter.getInstance(document, baos);
            document.open();

            Font font = FontFactory.getFont(FontFactory.HELVETICA, 16);
        
            Paragraph nombreDocumentoParagraph = new Paragraph("Nombre del documento: " + documento.getNombreDocumento(), font);
            nombreDocumentoParagraph.setAlignment(Element.ALIGN_CENTER);
            nombreDocumentoParagraph.setSpacingAfter(25);
            document.add(nombreDocumentoParagraph);

            Paragraph idDocumentoParagraph = new Paragraph("ID: " + String.valueOf(documento.getId()), font);
            nombreDocumentoParagraph.setSpacingAfter(25);
            document.add(idDocumentoParagraph);

            Paragraph precioDocumentoParagraph = new Paragraph("Precio: " + String.valueOf(documento.getPrecio()), font);
            nombreDocumentoParagraph.setSpacingAfter(25);
            document.add(precioDocumentoParagraph);

            Paragraph descripcionDocumentoParagraph = new Paragraph("Descripción: " + documento.getDescripcion(), font);
            nombreDocumentoParagraph.setSpacingAfter(25);
            document.add(descripcionDocumentoParagraph);

            Paragraph expedienteDocumentoParagraph = new Paragraph("Expediente: " + String.valueOf(documento.getExpediente().getNig()), font);
            nombreDocumentoParagraph.setSpacingAfter(25);
            document.add(expedienteDocumentoParagraph);

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

    public void generatePdfAndSaveToFile(Integer id) {
        DocumentosModel documento = repository.findById(id).orElseThrow(() -> new RuntimeException("Documento no encontrado"));
    
        String ruta = documentDir + "/documento_" + id + ".pdf";

        documento.setRuta(ruta);

        repository.save(documento);
    
        Document document = new Document();
        try {
            PdfWriter.getInstance(document, new FileOutputStream(ruta));
            document.open();
        
            
            Font font = FontFactory.getFont(FontFactory.HELVETICA, 16);
        
            
            Paragraph nombreDocumentoParagraph = new Paragraph("Nombre del documento: " + documento.getNombreDocumento(), font);
            nombreDocumentoParagraph.setAlignment(Element.ALIGN_CENTER);
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

            Paragraph expedienteParagraph = new Paragraph("Expediente: " + String.valueOf(documento.getExpediente().getNig()), font);
            expedienteParagraph.setSpacingAfter(25); 
            document.add(expedienteParagraph);

    
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
}
