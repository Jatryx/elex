package com.soltel.elex.models;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "documentos")
public class DocumentosModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column (name = "ruta", nullable = false, length = 255)
    private String ruta;

    @Column (name = "precio", nullable = false, precision = 6, scale = 2)
    private BigDecimal precio;

    @Column(name = "nombre_documento", nullable = false, length = 25)
    private String nombreDocumento;

    @Column(name = "descripcion", nullable = false, length = 25)
    private String descripcion;

    @Column(name = "borrado", nullable = false)
    private boolean borrado = false;

    @ManyToOne
    @JoinColumn(name = "expediente", nullable = false)
    private ExpedientesModel expediente;

    @Lob
    @Column(name = "data", nullable = true)
    private byte[] archivoPdf;

    public DocumentosModel() {
    }

    public DocumentosModel(Integer id, String ruta, BigDecimal precio,
                           String nombreDocumento, String descripcion,
                           ExpedientesModel expediente) {
        this.id = id;
        this.ruta = ruta;
        this.precio = precio;
        this.nombreDocumento = nombreDocumento;
        this.descripcion = descripcion;
        this.expediente = expediente;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public String getNombreDocumento() {
        return nombreDocumento;
    }

    public void setNombreDocumento(String nombreDocumento) {
        this.nombreDocumento = nombreDocumento;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public boolean isBorrado() {
        return borrado;
    }

    public void setBorrado(boolean borrado) {
        this.borrado = borrado;
    }

    public ExpedientesModel getExpediente() {
        return expediente;
    }

    public void setExpediente(ExpedientesModel expediente) {
        this.expediente = expediente;
    }

    public byte[] getArchivoPdf() {
        return archivoPdf;
    }

    public void setArchivoPdf(byte[] archivoPdf) {
        this.archivoPdf = archivoPdf;
    }
}
