package com.temple.backend.controller;

import com.temple.backend.model.Prasad;
import com.temple.backend.repository.PrasadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/prasad")
public class PrasadController {
    @Autowired
    PrasadRepository prasadRepository;

    @GetMapping("/all")
    public List<Prasad> getAllPrasad() {
        return prasadRepository.findAll();
    }
}
