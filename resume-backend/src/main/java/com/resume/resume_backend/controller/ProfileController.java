package com.resume.resume_backend.controller;

import com.resume.resume_backend.model.Profile;
import com.resume.resume_backend.service.ProfileStorageService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final ProfileStorageService storageService;

    public ProfileController(ProfileStorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping
    public Profile getProfile() {
        return storageService.loadProfile();
    }

    @PostMapping
    public Profile saveProfile(@RequestBody Profile profile) {
        storageService.saveProfile(profile);
        return profile;
    }
}
