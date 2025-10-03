import React from "react";

const Sidebar = ({ sections, completedSections = [], onSelect, activeSection }) => {
    const completedSet = new Set(completedSections || []);

    return (
        <aside className="sidebar">
            <div>
                <div className="brand">Rx<br/>Resume</div>
                <p className="subtitle">Build your professional profile:</p>
                <p className="desc">Complete each step to perfect your resume and level up your career.</p>

                <ul className="side-list" aria-label="sections">
                    {sections.map((s, idx) => {
                        const prevKey = sections[idx - 1]?.key;
                        const isLocked = idx > 0 && !completedSet.has(prevKey);
                        const isComplete = completedSet.has(s.key);
                        return (
                            <li key={s.key}>
                                <button
                                    onClick={() => { if (!isLocked) onSelect(s.key); }}
                                    className={isLocked ? "locked" : ""}
                                    aria-disabled={isLocked}
                                    title={isLocked ? "Locked: complete previous step" : s.title}
                                >
                                    {s.title} {isComplete && " ✅"}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div>
                <button className="save-exit">Save & Exit</button>
            </div>
        </aside>
    );
};

export default Sidebar;
