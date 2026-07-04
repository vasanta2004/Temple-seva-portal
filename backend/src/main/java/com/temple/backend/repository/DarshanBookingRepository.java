package com.temple.backend.repository;

import com.temple.backend.model.DarshanBooking;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DarshanBookingRepository extends MongoRepository<DarshanBooking, String> {
    List<DarshanBooking> findByUserId(String userId);
    long countByBookingDateAndSlotTime(String bookingDate, String slotTime);
}
