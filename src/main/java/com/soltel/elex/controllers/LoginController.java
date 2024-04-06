package com.soltel.elex.controllers;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;


@RestController
@RequestMapping("/api")
public class LoginController {
    
    @PostMapping("/loginUsuario")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String usuario = credentials.get("usuario");
        String password = credentials.get("password");
    
        if(usuario != null && password != null && usuario.equals("soltel") && password.equals("admin")) {
            // Generar el token
            Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
            String jws = Jwts.builder().setSubject(usuario).setIssuedAt(new Date())
                    .signWith(key, SignatureAlgorithm.HS256).compact();
    
            // Crear la respuesta
            Map<String, String> response = new HashMap<>();
            response.put("token", jws);
    
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("login");
        }
    }
}


