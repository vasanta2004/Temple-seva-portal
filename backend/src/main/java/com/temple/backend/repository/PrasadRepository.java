package com.temple.backend.repository;

import com.temple.backend.model.Prasad;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PrasadRepository extends MongoRepository<Prasad, String> {
}
