package com.resume.resume_backend.model;

import java.util.HashSet;
import java.util.Set;

public class Progress {
    private int xp;
    private int level;
    private Set<String> completedSections;

    public Progress() {
        this.xp = 0;
        this.level = 0;
        this.completedSections = new HashSet<>();
    }

    public Progress(int xp, int level, Set<String> completedSections) {
        this.xp = xp;
        this.level = level;
        this.completedSections = completedSections;
    }

    public int getXp() { return xp; }
    public int getLevel() { return level; }
    public Set<String> getCompletedSections() { return completedSections; }

    public void setXp(int xp) { this.xp = xp; }
    public void setLevel(int level) { this.level = level; }
    public void setCompletedSections(Set<String> completedSections) { this.completedSections = completedSections; }
}
