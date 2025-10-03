import React from "react";

const ProgressBar = ({ xp = 0, level = 0 }) => {
    const xpForLevel = 100;
    const percent = Math.min(100, Math.round((xp % xpForLevel) / xpForLevel * 100));
    return (
        <div className="progress-card">
            <div className="progress-left">
                <div className="level-title">Level {level}</div>
                <div className="xp-small">XP: {xp} / {xpForLevel * Math.max(1, level)}</div>
                <div className="progress-bar-wrap">
                    <div className="progress-bar-inner" style={{ width: `${percent}%` }} />
                </div>
            </div>
            <div className="progress-right center">
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{percent}%</div>
                    <div className="small">to next level</div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
