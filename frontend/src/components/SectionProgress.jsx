import React from "react";

const SectionProgress = ({ sections, completedSections = [], activeKey }) => {
    const completedSet = new Set(completedSections || []);

    return (
        <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
            {sections.map((s, idx) => {
                const isCompleted = completedSet.has(s.key);
                const isActive = activeKey === s.key;

                return (
                    <div key={s.key} style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                border: "2px solid",
                                borderColor: isCompleted ? "green" : isActive ? "blue" : "lightgray",
                                background: isCompleted ? "green" : "white",
                                color: isCompleted ? "white" : "black",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: "bold",
                            }}
                        >
                            {isCompleted ? "✓" : idx + 1}
                        </div>

                        {idx < sections.length - 1 && (
                            <div
                                style={{
                                    width: 60,
                                    height: 3,
                                    background: completedSet.has(sections[idx + 1]?.key) ? "green" : "lightgray",
                                }}
                            ></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default SectionProgress;
