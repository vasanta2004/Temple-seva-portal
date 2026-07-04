package com.temple.backend.controller;

import com.temple.backend.model.Pooja;
import com.temple.backend.repository.PoojaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/poojas")
public class PoojaController {
    @Autowired
    PoojaRepository poojaRepository;

    @GetMapping("/all")
    public List<Pooja> getAllPoojas() {
        return poojaRepository.findAll();
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addPooja(@RequestBody Pooja pooja) {
        poojaRepository.save(pooja);
        return ResponseEntity.ok("Pooja added successfully!");
    }
}
