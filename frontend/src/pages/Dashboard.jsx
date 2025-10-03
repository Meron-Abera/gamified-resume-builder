import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import Stepper from "../components/Stepper";
import ProfileForm from "./ProfileForm";
import "../styles/wizard.css";
import SectionProgress from "../components/SectionProgress";
import SkillsForm from "../components/SkillsForm";

const sections = [
    { key: "profile", title: "Profile" },
    { key: "summary", title: "Summary" },
    { key: "education", title: "Education" },
    { key: "skills", title: "Skills" },
    { key: "experience", title: "Experience" },
    { key: "projects", title: "Projects" },
    { key: "affiliations", title: "Affiliations" },
    { key: "interests", title: "Interests" },
];

export default function Dashboard() {
    const [progress, setProgress] = useState({ xp: 0, level: 0, completedSections: [] });
    const [activeKey, setActiveKey] = useState("profile");
    const [backendStatus, setBackendStatus] = useState("Checking backend...");

    const fetchProgress = async () => {
        try {
            const res = await fetch("http://localhost:8080/progress");
            const data = await res.json();
            setProgress(data);
            // if current active is locked, move to next unlocked
            const unlockedIndex = data.completedSections ? data.completedSections.length : 0;
            setActiveKey(sections[Math.min(unlockedIndex, sections.length - 1)].key);
            setBackendStatus("Backend is running!");
        } catch (err) {
            console.error(err);
            setBackendStatus("Error connecting to backend");
        }
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    const handleSidebarSelect = (key) => {
        // compute locked state
        const idx = sections.findIndex(s => s.key === key);
        const prevKey = sections[idx - 1]?.key;
        const unlockedIndex = progress.completedSections ? progress.completedSections.length : 0;
        // allow only if idx <= unlockedIndex (completed + next)
        if (idx <= unlockedIndex) {
            setActiveKey(key);
        } else {
            alert("Locked: complete earlier sections first.");
        }
    };

    const handleSaved = (updatedProgress) => {
        // when ProfileForm saves it calls onSaved with returned progress (if available)
        if (updatedProgress) {
            setProgress(updatedProgress);
            // pick next section unlocked
            const nextIndex = (updatedProgress.completedSections || []).length;
            if (nextIndex < sections.length) {
                setActiveKey(sections[nextIndex].key);
            }
        } else {
            fetchProgress();
        }
    };

    return (
        <div className="app-wrapper">
            <Sidebar sections={sections} completedSections={progress.completedSections} onSelect={handleSidebarSelect} activeSection={activeKey} />

            <main className="main">
                <div className="backend-status">Backend Status: {backendStatus}</div>

                <SectionProgress sections={sections} completedSections={progress.completedSections} activeKey={activeKey} />
                <ProgressBar xp={progress.xp} level={progress.level} />

                <div className="form-card">
                    <div className="title">{sections.find(s => s.key === activeKey)?.title}</div>
                    <div className="desc">You are currently working on this step.</div>

                    <Stepper sections={sections} completedSections={progress.completedSections} activeKey={activeKey} />

                    <div style={{marginTop: 22}}>
                        {activeKey === "profile" && <ProfileForm onSaved={handleSaved} />}
                        {activeKey === "skills" && <SkillsForm onSaved={handleSaved} />}
                        {activeKey !== "profile" && activeKey !== "skills" && (
                            <div>
                                <textarea className="textarea" placeholder={`Write your ${activeKey} details here...`} />
                                <div className="footer-nav">
                                    <div className="hint">Complete the form and click Next</div>
                                    <div>
                                        <button className="btn btn-ghost" onClick={() => {
                                            const curIndex = sections.findIndex(s => s.key === activeKey);
                                            if (curIndex > 0) setActiveKey(sections[curIndex-1].key);
                                        }}>Previous</button>

                                        <button className="btn btn-primary" onClick={async () => {
                                            try {
                                                const res = await fetch("http://localhost:8080/progress/complete", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ section: activeKey })
                                                });
                                                const updated = await res.json();
                                                setProgress(updated);
                                                const nextIndex = (updated.completedSections || []).length;
                                                if (nextIndex < sections.length) setActiveKey(sections[nextIndex].key);
                                            } catch (err) {
                                                console.error(err);
                                                alert("Save failed — check backend.");
                                            }
                                        }}>Next →</button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}
