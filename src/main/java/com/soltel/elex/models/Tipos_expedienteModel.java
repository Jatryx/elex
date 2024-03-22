package com.soltel.elex.models;

import java.util.Set;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipos_expediente")
public class Tipos_expedienteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column (name = "materia", nullable = false, length = 20)
    private String materia;

    @Column (name = "borrado", nullable = false)
    private boolean borrado = false;

    @OneToMany (mappedBy = "tipo")
    private Set<ExpedientesModel> expedientes;

    public Tipos_expedienteModel() {
    }

    public Tipos_expedienteModel(Integer id, String materia, boolean borrado) {
        this.id = id;
        this.materia = materia;
        this.borrado = borrado;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMateria() {
        return materia;
    }

    public void setMateria(String materia) {
        this.materia = materia;
    }

    public boolean isBorrado() {
        return borrado;
    }

    public void setBorrado(boolean borrado) {
        this.borrado = borrado;
    }

}
