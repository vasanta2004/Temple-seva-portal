package com.temple.backend.repository;

import com.temple.backend.model.Gallery;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GalleryRepository extends MongoRepository<Gallery, String> {
}
