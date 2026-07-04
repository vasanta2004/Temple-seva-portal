package com.temple.backend.util;

import com.temple.backend.model.*;
import com.temple.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private PoojaRepository poojaRepository;

    @Autowired
    private PrasadRepository prasadRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed Admin User
        System.out.println(">> Total Users in DB: " + userRepository.count());
        userRepository.findAll().forEach(u -> System.out.println(">> User found: Name=" + u.getName() + ", Email=" + u.getEmail() + ", Roles=" + u.getRoles()));

        if (userRepository.count() == 0 || !userRepository.existsByEmail("admin@temple.com")) {
            User admin = new User();
            admin.setName("High Priest");
            admin.setEmail("admin@temple.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhone("9999999999");
            admin.setRoles(new HashSet<>(Arrays.asList("ROLE_ADMIN", "ROLE_USER")));
            userRepository.save(admin);
            System.out.println(">> Seeded Admin User: admin@temple.com / admin123");
        }

        // Seed Devotee User for confirmation testing
        if (!userRepository.existsByEmail("vasanta11223@gmail.com")) {
            User devotee = new User();
            devotee.setName("Vasanta M");
            devotee.setEmail("vasanta11223@gmail.com");
            devotee.setPassword(passwordEncoder.encode("vasanta123"));
            devotee.setPhone("9876543210");
            devotee.setRoles(new HashSet<>(Arrays.asList("ROLE_USER")));
            userRepository.save(devotee);
            System.out.println(">> Seeded Devotee User: vasanta11223@gmail.com / vasanta123");
        }
        // Delete duplicate buggy SHIVARATRI event if exists
        eventRepository.findAll().stream()
            .filter(e -> "SHIVARATRI".equals(e.getTitle()))
            .forEach(e -> {
                eventRepository.delete(e);
                System.out.println(">> Cleaned up duplicate SHIVARATRI event");
            });

        // Seed or Update Events
        java.util.List<Event> existingEvents = eventRepository.findAll();
        Event e1 = existingEvents.stream().filter(e -> "Mahashivratri Brahmotsava".equals(e.getTitle())).findFirst().orElse(null);
        if (e1 == null) {
            e1 = new Event();
            e1.setTitle("Mahashivratri Brahmotsava");
            e1.setDescription("The grand celestial celebration of the Great Night of Shiva.");
            e1.setActive(true);
        }
        e1.setImageUrl("/shiva.png");
        eventRepository.save(e1);

        Event e2 = existingEvents.stream().filter(e -> "Guru Purnima".equals(e.getTitle())).findFirst().orElse(null);
        if (e2 == null) {
            e2 = new Event();
            e2.setTitle("Guru Purnima");
            e2.setDescription("Honoring the lineage of Swami Siddharoodha.");
            e2.setActive(true);
        }
        e2.setImageUrl("/guru.png");
        eventRepository.save(e2);

        // Seed all the requested spiritual temple events
        String[][] eventSeeds = {
            {"Navratri Celebrations", "Nine nights of divine dance, music, and sacred devotion to Adi Parashakti.", "/events/navratri.png"},
            {"Diwali Pujas", "The festival of lights, featuring Lakshmi Puja, oil lamps, and spiritual enlightenment.", "/events/diwali.png"},
            {"Brahmotsavam Days", "A multi-day celestial cleansing festival celebrating the temple deity's purification rituals.", "/siddharoodh_ajja/1.jpg"},
            {"Temple Anniversaries", "Annual celebration marking the consecration of the temple and establishment of sacred shrines.", "/siddharoodh_ajja/3.jpg"},
            {"Full Moon or Amavasya Events", "Fortnightly rituals aligning the temple chants and fire ceremonies with lunar phases.", "/siddharoodh_ajja/WhatsApp Image 2026-06-01 at 6.54.23 PM.jpeg"},
            {"Monthly Satsangs or Guru Discourses", "Gatherings for devotional singing, sacred discourses, and communal wisdom sharing.", "/siddharoodh_ajja/WhatsApp Image 2026-06-01 at 6.54.36 PM.jpeg"},
            {"Youth or Cultural Programs", "Traditional music concerts, Vedic recitations, and classical dances performed by young scholars.", "/siddharoodh_ajja/WhatsApp Image 2026-06-01 at 6.54.36 PM (1).jpeg"},
            {"Special Puja Days", "Devotional pujas dedicated to specific deities on auspicious astrological alignments.", "/siddharoodh_ajja/WhatsApp Image 2026-06-01 at 6.54.54 PM.jpeg"},
            {"Tilak and Sacred Item Offerings", "Preparation and distribution of sacred vermillion, sandalwood paste, and protective threads.", "/siddharoodh_ajja/WhatsApp Image 2026-06-01 at 6.55.06 PM.jpeg"},
            {"Prasad Distribution Days", "Serving consecrated sanctum sweets and community meals to thousands of devotees daily.", "/siddharoodh_ajja/WhatsApp Image 2026-06-01 at 6.55.20 PM.jpeg"},
            {"Weekly or Daily Special Prayer Services", "Daily morning fire rituals and continuous evening prayers for world peace.", "/siddharoodh_ajja/WhatsApp Image 2026-06-01 at 6.55.34 PM.jpeg"},
            {"Charity or Sponsorship Events", "Fundraising galas and sponsorship drives to support free education and medicine.", "/siddharoodh_ajja/WhatsApp Image 2026-06-01 at 6.55.48 PM.jpeg"},
            {"Seasonal Festivals", "Traditional harvest celebrations of Sankranti, Pongal, and spring welcoming ceremonies.", "/siddharoodh_ajja/WhatsApp Image 2026-06-01 at 6.56.12 PM.jpeg"}
        };

        for (String[] seed : eventSeeds) {
            final String title = seed[0];
            Event ev = existingEvents.stream().filter(e -> title.equals(e.getTitle())).findFirst().orElse(null);
            if (ev == null) {
                ev = new Event();
                ev.setTitle(title);
                ev.setDescription(seed[1]);
                ev.setActive(true);
            }
            ev.setImageUrl(seed[2]);
            eventRepository.save(ev);
        }

        System.out.println(">> Seeded and Updated All Sacred Events");

        // Seed Rooms
        long countOfAcNonAc = roomRepository.findAll().stream()
            .filter(r -> "AC".equals(r.getType()) || "Non-AC".equals(r.getType()))
            .count();
        boolean hasOldNames = roomRepository.findAll().stream()
            .anyMatch(r -> r.getName().startsWith("Normal Room"));
        boolean hasOldImages = roomRepository.findAll().stream()
            .anyMatch(r -> r.getImageUrl().contains("unsplash.com"));
        if (roomRepository.count() == 0 || countOfAcNonAc > 0 || hasOldNames || hasOldImages) {
            roomRepository.deleteAll();
            java.util.List<Room> normalRooms = new java.util.ArrayList<>();
            for (int i = 1; i <= 15; i++) {
                Room room = new Room();
                room.setName("Room " + (100 + i));
                room.setType("Normal");
                room.setPrice(500); // Standard flat contribution per day
                room.setCapacity(2);
                room.setAvailable(true);
                room.setDescription("A serene, comfortable room for seekers and devotees.");
                
                // Alternate serene local room images for beautiful visual rendering
                if (i % 3 == 1) {
                    room.setImageUrl("/rooms/room_one.png");
                } else if (i % 3 == 2) {
                    room.setImageUrl("/rooms/room_two.png");
                } else {
                    room.setImageUrl("/rooms/room_three.png");
                }
                normalRooms.add(room);
            }
            roomRepository.saveAll(normalRooms);
            System.out.println(">> Seeded 15 Normal Rooms");
        }

        // Seed Sevas (Poojas)
        if (poojaRepository.count() == 0) {
            Pooja p1 = new Pooja();
            p1.setName("Divine Maha Aarti");
            p1.setPrice(101);
            p1.setDescription("Morning fire ritual with sacred chants.");
            
            Pooja p2 = new Pooja();
            p2.setName("Vedic Rudrabhishek");
            p2.setPrice(501);
            p2.setDescription("A powerful Vedic ritual involving holy offerings.");
            
            poojaRepository.saveAll(Arrays.asList(p1, p2));
            System.out.println(">> Seeded Poojas");
        }

        // Seed Prasad
        prasadRepository.deleteAll();
        Prasad s1 = new Prasad();
        s1.setName("Mahaprasad Laddu");
        s1.setPrice(150);
        s1.setDescription("Sacred laddu made with pure ghee.");
        s1.setImageUrl("/siddharoodh_ajja/WhatsApp Image 2026-06-01 at 6.56.29 PM.jpeg");
        
        prasadRepository.saveAll(Arrays.asList(s1));
        System.out.println(">> Seeded Prasad");
    }
}
