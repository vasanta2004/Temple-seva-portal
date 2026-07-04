package com.temple.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "poojas")
public class Pooja {
    @Id
    private String id;
    private String name;
    private String description;
    private double price;
    private String timings;
    private String category;

    public Pooja() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getTimings() { return timings; }
    public void setTimings(String timings) { this.timings = timings; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
