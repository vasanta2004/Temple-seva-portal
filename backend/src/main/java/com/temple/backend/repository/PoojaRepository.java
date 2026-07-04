package com.temple.backend.repository;

import com.temple.backend.model.Pooja;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PoojaRepository extends MongoRepository<Pooja, String> {
}
