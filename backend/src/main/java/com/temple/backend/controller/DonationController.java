package com.temple.backend.controller;

import com.temple.backend.model.Donation;
import com.temple.backend.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/donations")
public class DonationController {
    @Autowired
    DonationRepository donationRepository;

    @Autowired
    com.temple.backend.service.EmailService emailService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createDonation(@RequestBody Donation donation) {
        donation.setDate(new Date());
        donation.setStatus("SUCCESS"); // Simulating successful payment
        donation.setTransactionId("TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        donation.setReceiptId("REC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        
        donationRepository.save(donation);

        // Send Donation Confirmation Email
        try {
            if (donation.getEmail() != null && !donation.getEmail().trim().isEmpty()) {
                emailService.sendDonationConfirmationEmail(
                    donation.getEmail(),
                    donation.getName(),
                    donation.getPurpose(),
                    donation.getAmount(),
                    donation.getTransactionId(),
                    donation.getReceiptId()
                );
            }
        } catch (Exception e) {
            System.err.println("Failed to send donation confirmation email: " + e.getMessage());
        }

        return ResponseEntity.ok(donation);
    }

    @GetMapping("/user/{userId}")
    public List<Donation> getUserDonations(@PathVariable String userId) {
        return donationRepository.findByUserId(userId);
    }
}
