package com.soltel.elex.services;


import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.soltel.elex.models.DocumentosModel;
import com.soltel.elex.repositories.IDocumentosRepository;

@Service
public class DocumentosService {

    @Autowired
    private IDocumentosRepository repository;

    public List<DocumentosModel> consultarDocumentos() {
        return repository.findAll();
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
        
            // Crear una fuente personalizada
            Font font = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.BLUE);
        
            // Crear una tabla
            PdfPTable table = new PdfPTable(2); // 2 columnas
            table.addCell(new PdfPCell(new Phrase("Campo", font)));
            table.addCell(new PdfPCell(new Phrase("Valor", font)));
            table.addCell("ID");
            table.addCell(String.valueOf(documento.getId()));
            table.addCell("Precio");
            table.addCell(String.valueOf(documento.getPrecio()));
            table.addCell("Nombre del documento");
            table.addCell(documento.getNombreDocumento());
            table.addCell("Descripción");
            table.addCell(documento.getDescripcion());
            table.addCell("Expediente");
            table.addCell(String.valueOf(documento.getExpediente().getNig())); // Asume que ExpedientesModel tiene un método getId()
        
            document.add(table);
        
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
    
        Document document = new Document();
    try {
        PdfWriter.getInstance(document, new FileOutputStream(ruta));
        document.open();

        // Crear una fuente personalizada
        Font font = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.BLUE);

        // Crear una tabla
        PdfPTable table = new PdfPTable(2); // 2 columnas
        table.addCell(new PdfPCell(new Phrase("Campo", font)));
        table.addCell(new PdfPCell(new Phrase("Valor", font)));
        table.addCell("ID");
        table.addCell(String.valueOf(documento.getId()));
        table.addCell("Precio");
        table.addCell(String.valueOf(documento.getPrecio()));
        table.addCell("Nombre del documento");
        table.addCell(documento.getNombreDocumento());
        table.addCell("Descripción");
        table.addCell(documento.getDescripcion());
        table.addCell("Expediente");
        table.addCell(String.valueOf(documento.getExpediente().getNig())); // Asume que ExpedientesModel tiene un método getId()

        document.add(table);

        document.close();
    } catch (DocumentException | FileNotFoundException e) {
        e.printStackTrace();
    }
    }

}
