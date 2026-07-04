package com.temple.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "darshan_bookings")
public class DarshanBooking {
    @Id
    private String id;
    private String userId;
    private String devoteeName;
    private String email;
    private String bookingDate;
    private String slotTime;
    private String gotra;
    private int groupSize;
    private String status;

    public DarshanBooking() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getDevoteeName() { return devoteeName; }
    public void setDevoteeName(String devoteeName) { this.devoteeName = devoteeName; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getBookingDate() { return bookingDate; }
    public void setBookingDate(String bookingDate) { this.bookingDate = bookingDate; }
    
    public String getSlotTime() { return slotTime; }
    public void setSlotTime(String slotTime) { this.slotTime = slotTime; }
    
    public String getGotra() { return gotra; }
    public void setGotra(String gotra) { this.gotra = gotra; }
    
    public int getGroupSize() { return groupSize; }
    public void setGroupSize(int groupSize) { this.groupSize = groupSize; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
