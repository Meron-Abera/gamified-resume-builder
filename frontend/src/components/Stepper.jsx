import React from 'react';

function Stepper({ steps, currentStepId, onStepClick, isStepCompleted }) {

    const isStepLocked = (stepId) => {
        for (let i = 1; i < stepId; i++) {
            if (!isStepCompleted(i)) return true;
        }
        return false;
    };

    return (
        <div className="sidebar dark-theme">
            <div className="sidebar-branding">
                <span className="logo-rx">Rx</span>
                <h1 className="logo-resume">Resume</h1>
                <p className="tagline">Build your professional profile: Complete each step to perfect your resume and level up your career.</p>
            </div>

            <div className="stepper-list">
                {steps.map(step => {
                    const locked = isStepLocked(step.id) && step.id > currentStepId;

                    return (
                        <div
                            key={step.id}
                            className={`step-item ${step.id === currentStepId ? 'active' : ''} ${isStepCompleted(step.id) ? 'completed' : ''} ${locked ? 'locked' : ''}`}
                            onClick={locked ? null : () => onStepClick(step.id)}
                        >
                            <div className="step-title">{step.title}</div>
                            {isStepCompleted(step.id) && <span className="check-icon">✓</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Stepper;