package com.temple.backend.controller;

import com.temple.backend.model.DarshanBooking;
import com.temple.backend.repository.DarshanBookingRepository;
import com.temple.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/darshan")
public class DarshanBookingController {

    @Autowired
    private DarshanBookingRepository darshanRepository;

    @Autowired
    private EmailService emailService;

    // Checks slot capacity for a given date and slot
    @GetMapping("/availability")
    public ResponseEntity<?> checkAvailability(@RequestParam String date, @RequestParam String slot) {
        long bookedCount = darshanRepository.countByBookingDateAndSlotTime(date, slot);
        long maxCapacity = 100; // Limit is 100 pilgrims per hour
        
        Map<String, Object> response = new HashMap<>();
        response.put("booked", bookedCount);
        response.put("capacity", maxCapacity);
        response.put("available", Math.max(0, maxCapacity - bookedCount));
        
        return ResponseEntity.ok(response);
    }

    // Books a Darshan slot
    @PostMapping("/book")
    public ResponseEntity<?> bookSlot(@RequestBody DarshanBooking booking) {
        // Generate a recognizable check-in ID starting with 'DS-'
        String checkInId = "DS-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        booking.setId(checkInId);
        booking.setStatus("CONFIRMED");
        
        // Save to MongoDB
        DarshanBooking saved = darshanRepository.save(booking);

        // Dispatch receipt email
        try {
            if (booking.getEmail() != null && !booking.getEmail().trim().isEmpty()) {
                emailService.sendDarshanPassEmail(
                    booking.getEmail(),
                    booking.getDevoteeName(),
                    checkInId,
                    booking.getBookingDate(),
                    booking.getSlotTime(),
                    booking.getGotra() != null ? booking.getGotra() : "Not Specified",
                    booking.getGroupSize() > 0 ? booking.getGroupSize() : 1
                );
            }
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }

        return ResponseEntity.ok(saved);
    }

    // Fetches all slots booked by a specific user
    @GetMapping("/user/{userId}")
    public List<DarshanBooking> getUserBookings(@PathVariable String userId) {
        return darshanRepository.findByUserId(userId);
    }

    // Scanning Endpoint: Devotee check-in confirmation
    @PostMapping("/checkin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> checkInDevotee(@PathVariable String id) {
        return darshanRepository.findById(id).map(booking -> {
            if ("USED".equalsIgnoreCase(booking.getStatus())) {
                return ResponseEntity.badRequest().body("Error: This ticket pass has already been used!");
            }
            booking.setStatus("USED");
            darshanRepository.save(booking);
            return ResponseEntity.ok("Check-in successful! Pass processed.");
        }).orElse(ResponseEntity.notFound().build());
    }

    // Admin endpoint: Fetch all darshan bookings
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<DarshanBooking> getAllBookings() {
        return darshanRepository.findAll();
    }
}
