package com.temple.backend.repository;

import com.temple.backend.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByActive(boolean active);
}
