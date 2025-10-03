package com.resume.resume_backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.resume_backend.model.Profile;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class ProfileStorageService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File storageFile;

    public ProfileStorageService() {
        this.storageFile = new File(System.getProperty("user.dir"), "profile.json");
        System.out.println("Profile file at: " + storageFile.getAbsolutePath());
    }

    public Profile loadProfile() {
        try {
            if (!storageFile.exists()) {
                Profile empty = new Profile();
                saveProfile(empty);
                return empty;
            }
            return objectMapper.readValue(storageFile, Profile.class);
        } catch (IOException e) {
            throw new RuntimeException("Error reading profile.json", e);
        }
    }

    public void saveProfile(Profile profile) {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(storageFile, profile);
        } catch (IOException e) {
            throw new RuntimeException("Error writing profile.json", e);
        }
    }
}
