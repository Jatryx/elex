package com.soltel.elex.models;

import java.time.LocalDate;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "expedientes")
public class ExpedientesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column (name = "nig", nullable = false, length = 50)
    private String nig;

    @Column (name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column (name = "estado")
    @Enumerated(EnumType.STRING)
    private EnumExpediente estado;

    @Column (name = "opciones" , nullable = false, length = 70)
    private String opciones;

    @Column (name = "descripcion" , nullable = false, length = 255)
    private String descripcion;

    @ManyToOne
    @JoinColumn (name = "tipo", nullable = false)
    private Tipos_expedienteModel tipo;

    @Column (name = "borrado", nullable = false)
    private boolean borrado = false;

    @OneToMany(mappedBy = "expediente")
    private Set<ActuacionesModel> actuaciones;
    
    @OneToMany(mappedBy = "expediente")
    private Set<DocumentosModel> documentos;


    public ExpedientesModel() {
    }

    public ExpedientesModel(Integer id, String nig, LocalDate fecha, EnumExpediente estado,
                            String opciones, String descripcion, Tipos_expedienteModel tipo,
                            boolean borrado) {
        this.id = id;
        this.nig = nig;
        this.fecha = fecha;
        this.estado = estado;
        this.opciones = opciones;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.borrado = borrado;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNig() {
        return nig;
    }

    public void setNig(String nig) {
        this.nig = nig;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public EnumExpediente getEstado() {
        return estado;
    }

    public void setEstado(EnumExpediente estado) {
        this.estado = estado;
    }

    public String getOpciones() {
        return opciones;
    }

    public void setOpciones(String opciones) {
        this.opciones = opciones;
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

    public Tipos_expedienteModel getTipo() {
        return tipo;
    }

    public void setTipo(Tipos_expedienteModel tipo) {
        this.tipo = tipo;
    }
}
