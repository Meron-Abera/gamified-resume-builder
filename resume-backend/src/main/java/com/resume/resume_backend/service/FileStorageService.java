package com.resume.resume_backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.resume_backend.model.Progress;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class FileStorageService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File storageFile;

    public FileStorageService() {
        this.storageFile = new File(System.getProperty("user.dir"), "progress.json");
        System.out.println("Progress file will be stored at: " + storageFile.getAbsolutePath());
    }

    public Progress loadProgress() {
        try {
            if (!storageFile.exists()) {
                Progress initial = new Progress();
                saveProgress(initial);
                return initial;
            }
            return objectMapper.readValue(storageFile, Progress.class);
        } catch (IOException e) {
            throw new RuntimeException("Error reading progress.json", e);
        }
    }

    public void saveProgress(Progress progress) {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(storageFile, progress);
            System.out.println("Progress saved to: " + storageFile.getAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException("Error writing progress.json", e);
        }
    }
}
