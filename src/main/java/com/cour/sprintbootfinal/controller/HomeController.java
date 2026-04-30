package com.cour.sprintbootfinal.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<?> home() {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of(
                        "message", "Bienvenue sur l'API SprintBootFinal",
                        "version", "1.0.0",
                        "endpoints", Map.of(
                                "auth", "/api/auth/**",
                                "products", "/api/products/**",
                                "orders", "/api/orders/**",
                                "admin", "/api/admin/**"
                        )
                ));
    }
}
