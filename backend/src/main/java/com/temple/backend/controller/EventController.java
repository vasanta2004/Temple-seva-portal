package com.temple.backend.controller;

import com.temple.backend.model.Event;
import com.temple.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    EventRepository eventRepository;

    @GetMapping("/active")
    public List<Event> getActiveEvents() {
        return eventRepository.findByActive(true);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addEvent(@RequestBody Event event) {
        eventRepository.save(event);
        return ResponseEntity.ok("Event added successfully!");
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteEvent(@PathVariable String id) {
        eventRepository.deleteById(id);
        return ResponseEntity.ok("Event deleted successfully!");
    }
}
