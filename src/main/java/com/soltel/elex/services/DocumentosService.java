package com.soltel.elex.services;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    
}
