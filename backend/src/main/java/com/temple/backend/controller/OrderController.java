package com.temple.backend.controller;

import com.temple.backend.model.Order;
import com.temple.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    com.temple.backend.service.EmailService emailService;

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("SUCCESS"); // Simulating successful payment
        Order savedOrder = orderRepository.save(order);

        // Send Order Confirmation Email
        try {
            if (savedOrder.getUserEmail() != null && !savedOrder.getUserEmail().trim().isEmpty()) {
                // Construct a readable summary of the ordered items
                StringBuilder itemsSummary = new StringBuilder();
                if (savedOrder.getItems() != null) {
                    for (int i = 0; i < savedOrder.getItems().size(); i++) {
                        Order.OrderItem item = savedOrder.getItems().get(i);
                        itemsSummary.append(item.getName())
                                    .append(" (Qty: ")
                                    .append(item.getQuantity())
                                    .append(")");
                        if (i < savedOrder.getItems().size() - 1) {
                            itemsSummary.append(", ");
                        }
                    }
                }

                emailService.sendOrderConfirmationEmail(
                    savedOrder.getUserEmail(),
                    savedOrder.getUserName(),
                    savedOrder.getId(),
                    itemsSummary.toString(),
                    savedOrder.getTotalAmount(),
                    savedOrder.getAddress()
                );
            }
        } catch (Exception e) {
            System.err.println("Failed to send order confirmation email: " + e.getMessage());
        }

        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable String userId) {
        return orderRepository.findByUserId(userId);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
