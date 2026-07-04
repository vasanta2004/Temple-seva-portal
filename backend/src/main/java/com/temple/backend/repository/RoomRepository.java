package com.temple.backend.repository;

import com.temple.backend.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RoomRepository extends MongoRepository<Room, String> {
    List<Room> findByType(String type);
    List<Room> findByAvailable(boolean available);
}
