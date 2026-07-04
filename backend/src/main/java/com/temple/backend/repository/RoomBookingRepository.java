package com.temple.backend.repository;

import com.temple.backend.model.RoomBooking;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RoomBookingRepository extends MongoRepository<RoomBooking, String> {
    List<RoomBooking> findByUserId(String userId);
}
