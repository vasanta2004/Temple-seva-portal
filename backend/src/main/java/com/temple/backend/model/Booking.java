package com.temple.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "bookings")
public class Booking {
    @Id
    private String id;
    private String userId;
    private String poojaId;
    private String poojaName;
    private Date bookingDate;
    private Date sevaDate;
    private double amount;
    private String status;

    public Booking() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getPoojaId() { return poojaId; }
    public void setPoojaId(String poojaId) { this.poojaId = poojaId; }
    public String getPoojaName() { return poojaName; }
    public void setPoojaName(String poojaName) { this.poojaName = poojaName; }
    public Date getBookingDate() { return bookingDate; }
    public void setBookingDate(Date bookingDate) { this.bookingDate = bookingDate; }
    public Date getSevaDate() { return sevaDate; }
    public void setSevaDate(Date sevaDate) { this.sevaDate = sevaDate; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
