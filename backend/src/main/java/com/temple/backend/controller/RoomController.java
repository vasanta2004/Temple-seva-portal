package com.temple.backend.controller;

import com.temple.backend.model.Room;
import com.temple.backend.model.RoomBooking;
import com.temple.backend.repository.RoomBookingRepository;
import com.temple.backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    @Autowired
    RoomRepository roomRepository;

    @Autowired
    RoomBookingRepository bookingRepository;

    @Autowired
    com.temple.backend.repository.UserRepository userRepository;

    @Autowired
    com.temple.backend.service.EmailService emailService;

    @GetMapping("/bookings/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<RoomBooking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/all")
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookRoom(@RequestBody RoomBooking booking) {
        booking.setStatus("CONFIRMED"); // Simulating instant confirmation
        bookingRepository.save(booking);

        // Fetch User and trigger dynamic stay confirmation email
        try {
            userRepository.findById(booking.getUserId()).ifPresent(user -> {
                String email = user.getEmail();
                String name = user.getName();
                
                String checkInStr = "Not Specified";
                String checkOutStr = "Not Specified";
                java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("dd MMM yyyy");
                if (booking.getCheckInDate() != null) {
                    checkInStr = sdf.format(booking.getCheckInDate());
                }
                if (booking.getCheckOutDate() != null) {
                    checkOutStr = sdf.format(booking.getCheckOutDate());
                }

                emailService.sendBookingConfirmationEmail(
                    email, 
                    name, 
                    booking.getRoomName(), 
                    checkInStr, 
                    checkOutStr, 
                    booking.getTotalAmount()
                );
            });
        } catch (Exception e) {
            System.err.println("Failed to send stay booking confirmation email: " + e.getMessage());
        }

        return ResponseEntity.ok(booking);
    }

    @GetMapping("/user/{userId}")
    public List<RoomBooking> getUserBookings(@PathVariable String userId) {
        return bookingRepository.findByUserId(userId);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addRoom(@RequestBody Room room) {
        if (room.getImageUrl() == null || room.getImageUrl().trim().isEmpty()) {
            room.setImageUrl("https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600");
        }
        room.setAvailable(true);
        roomRepository.save(room);
        return ResponseEntity.ok(room);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateRoom(@PathVariable String id, @RequestBody Room roomDetails) {
        return roomRepository.findById(id).map(room -> {
            room.setName(roomDetails.getName());
            room.setType(roomDetails.getType());
            room.setPrice(roomDetails.getPrice());
            room.setCapacity(roomDetails.getCapacity());
            room.setDescription(roomDetails.getDescription());
            if (roomDetails.getImageUrl() != null && !roomDetails.getImageUrl().trim().isEmpty()) {
                room.setImageUrl(roomDetails.getImageUrl());
            }
            roomRepository.save(room);
            return ResponseEntity.ok(room);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteRoom(@PathVariable String id) {
        roomRepository.deleteById(id);
        return ResponseEntity.ok("Room deleted successfully!");
    }
}
