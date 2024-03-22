package com.soltel.elex.models;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "actuaciones")
public class ActuacionesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column (name = "observaciones", nullable = false, length = 255)
    private String observaciones;

    @Column (name = "finalizado", nullable = false)
    private boolean finalizado;

    @Column (name = "fecha" , nullable = false)
    private LocalDate fecha;

    @Column (name = "usuario", nullable = false, length = 25)
    private String usuario;

    @Column (name = "responsable1", nullable = false, length = 25)
    private String responsable1;

    @Column (name = "responsable2", nullable = false, length = 25)
    private String responsable2;

    @Column (name = "consejeria", nullable = false, length = 25)
    private String consejeria;

    @Column (name = "borrado", nullable = false)
    private boolean borrado = false;

    @ManyToOne
    @JoinColumn (name ="expediente" , nullable = false)
    private ExpedientesModel expediente;

    public ActuacionesModel() {
    }

    public ActuacionesModel(Integer id, String observaciones, boolean finalizado, LocalDate fecha,
                            String usuario, String responsable1, String responsable2, String consejeria,
                            ExpedientesModel expediente) {
        this.id = id;
        this.observaciones = observaciones;
        this.finalizado = finalizado;
        this.fecha = fecha;
        this.usuario = usuario;
        this.responsable1 = responsable1;
        this.responsable2 = responsable2;
        this.consejeria = consejeria;
        this.expediente = expediente;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public boolean isFinalizado() {
        return finalizado;
    }

    public void setFinalizado(boolean finalizado) {
        this.finalizado = finalizado;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getResponsable1() {
        return responsable1;
    }

    public void setResponsable1(String responsable1) {
        this.responsable1 = responsable1;
    }

    public String getResponsable2() {
        return responsable2;
    }

    public void setResponsable2(String responsable2) {
        this.responsable2 = responsable2;
    }

    public String getConsejeria() {
        return consejeria;
    }

    public void setConsejeria(String consejeria) {
        this.consejeria = consejeria;
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
}
