package com.temple.backend.controller;

import com.temple.backend.model.Booking;
import com.temple.backend.repository.BookingRepository;
import com.temple.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    EmailService emailService;

    @PostMapping("/book")
    public ResponseEntity<?> bookSevas(@RequestBody BookingRequest request) {
        String bookingId = "BK-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        
        // Save to MongoDB
        if (request.getSevas() != null) {
            for (SevaItem item : request.getSevas()) {
                Booking booking = new Booking();
                booking.setUserId(request.getUserId());
                booking.setPoojaId(item.getId());
                booking.setPoojaName(item.getTitle());
                booking.setBookingDate(new Date());
                booking.setAmount(item.getPrice());
                booking.setStatus("CONFIRMED");
                bookingRepository.save(booking);
            }
        }

        // Send Email Confirmation
        try {
            if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
                StringBuilder poojasSummary = new StringBuilder();
                if (request.getSevas() != null) {
                    for (int i = 0; i < request.getSevas().size(); i++) {
                        poojasSummary.append(request.getSevas().get(i).getTitle());
                        if (i < request.getSevas().size() - 1) {
                            poojasSummary.append(", ");
                        }
                    }
                }

                emailService.sendSevaConfirmationEmail(
                    request.getEmail(),
                    request.getUserName(),
                    bookingId,
                    poojasSummary.toString(),
                    request.getSevaDate(),
                    request.getGotra(),
                    request.getNakshatra(),
                    request.getTotalAmount()
                );
            }
        } catch (Exception e) {
            System.err.println("Failed to send seva booking confirmation email: " + e.getMessage());
        }

        return ResponseEntity.ok(request);
    }

    public static class BookingRequest {
        private String userId;
        private String email;
        private String userName;
        private String gotra;
        private String nakshatra;
        private String rashi;
        private String sevaDate;
        private String timeSlot;
        private List<SevaItem> sevas;
        private double totalAmount;

        public BookingRequest() {}

        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getUserName() { return userName; }
        public void setUserName(String userName) { this.userName = userName; }
        public String getGotra() { return gotra; }
        public void setGotra(String gotra) { this.gotra = gotra; }
        public String getNakshatra() { return nakshatra; }
        public void setNakshatra(String nakshatra) { this.nakshatra = nakshatra; }
        public String getRashi() { return rashi; }
        public void setRashi(String rashi) { this.rashi = rashi; }
        public String getSevaDate() { return sevaDate; }
        public void setSevaDate(String sevaDate) { this.sevaDate = sevaDate; }
        public String getTimeSlot() { return timeSlot; }
        public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }
        public List<SevaItem> getSevas() { return sevas; }
        public void setSevas(List<SevaItem> sevas) { this.sevas = sevas; }
        public double getTotalAmount() { return totalAmount; }
        public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    }

    public static class SevaItem {
        private String id;
        private String title;
        private double price;

        public SevaItem() {}

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
    }
}
