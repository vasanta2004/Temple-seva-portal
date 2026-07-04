package com.temple.backend.repository;

import com.temple.backend.model.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DonationRepository extends MongoRepository<Donation, String> {
    List<Donation> findByUserId(String userId);
}
