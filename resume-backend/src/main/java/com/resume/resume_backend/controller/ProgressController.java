package com.resume.resume_backend.controller;

import com.resume.resume_backend.model.Progress;
import com.resume.resume_backend.service.FileStorageService;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/progress")
@CrossOrigin(origins = "http://localhost:5173")
public class ProgressController {

    private final FileStorageService storageService;

    public ProgressController(FileStorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping
    public Progress getProgress() {
        return storageService.loadProgress();
    }

    @PostMapping("/complete")
    public Progress completeSection(@RequestBody Map<String, String> body) {
        String section = body.get("section");

        Progress progress = storageService.loadProgress();

        if (!progress.getCompletedSections().contains(section)) {
            progress.getCompletedSections().add(section);
            progress.setXp(progress.getXp() + 50);

            progress.setLevel(progress.getXp() / 100);
        }

        storageService.saveProgress(progress);
        return progress;
    }
}
