import React, { useState } from 'react';
import Stepper from './components/Stepper.jsx';
import StepContent from './StepContent.jsx';
import CompletionAnimation from './components/CompletionAnimation.jsx';
import './app.css';

const steps = [
    { id: 1, title: 'Profile' },
    { id: 2, title: 'Summary' },
    { id: 3, title: 'Education' },
    { id: 4, title: 'Skills' },
    { id: 5, title: 'Experience' },
    { id: 6, title: 'Projects' },
    { id: 7, title: 'Affiliations' },
    { id: 8, title: 'Interests' },
];

function App() {
    const [currentStep, setCurrentStep] = useState(4);
    const [showAnimation, setShowAnimation] = useState(false);

    const [formData, setFormData] = useState({
        1: 'John Doe',
        2: 'Highly motivated...',
        3: 'University of...',
        4: 'HTML, CSS, JavaScript, React, Node.js, Python, MongoDB',
        5: '', 6: '', 7: '', 8: '',
    });

    const [resumeStatus, setResumeStatus] = useState({
        backend: 'Backend is running!',
        level: 1,
        xp: 80,
        xpMax: 100,
    });


    const isStepCompleted = (stepId) => {
        return formData[stepId] && formData[stepId].trim() !== '';
    };

    const triggerCompletionAnimation = () => {
        setShowAnimation(true);
        setTimeout(() => {
            setShowAnimation(false);
            setResumeStatus(prev => ({ ...prev, xp: prev.xp + 10 > prev.xpMax ? prev.xpMax : prev.xp + 10 }));
        }, 3000);
    };

    const handleTextChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [currentStep]: e.target.value,
        }));
    };


    const handleNext = () => {
        if (currentStep < steps.length) {
            if (!isStepCompleted(currentStep)) {
                alert('Please enter content in the current section before moving Next!');
                return;
            }

            setCurrentStep(currentStep + 1);
            triggerCompletionAnimation();
        }
    };

    const handleStepClick = (stepId) => {
        if (stepId === currentStep) return;

        if (isStepCompleted(stepId) || stepId < currentStep) {
            setCurrentStep(stepId);
            return;
        }

        if (stepId === currentStep + 1 && isStepCompleted(currentStep)) {
            setCurrentStep(stepId);
            triggerCompletionAnimation();
            return;
        }

        alert("Please complete the previous sections before jumping ahead!");
    };


    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const activeStep = steps.find(s => s.id === currentStep);

    return (
        <div className="app-container">
            <Stepper
                steps={steps}
                currentStepId={currentStep}
                onStepClick={handleStepClick}
                isStepCompleted={isStepCompleted}
            />

            <div className="main-content-wrapper">
                {showAnimation && <CompletionAnimation />}

                <div className="form-card">
                    <div className="status-header">
                        <p>Backend Status: <strong>{resumeStatus.backend}</strong></p>
                        <div className="level-info">
                            <span>Level {resumeStatus.level}</span>
                            <span className="level-percent">{Math.round((resumeStatus.xp / resumeStatus.xpMax) * 100)}%</span>
                        </div>
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{ width: `${(resumeStatus.xp / resumeStatus.xpMax) * 100}%` }}
                            ></div>
                        </div>
                        <span className="xp-text">XP: {resumeStatus.xp} / {resumeStatus.xpMax} to next level</span>
                    </div>

                    <h2 style={{ marginTop: '20px' }}>{activeStep.title}</h2>

                    <StepContent
                        stepTitle={activeStep.title}
                        currentText={formData[currentStep]}
                        onTextChange={handleTextChange}
                    />

                    <div className="navigation-buttons">
                        {currentStep > 1 && (
                            <button
                                onClick={handlePrevious}
                                className="btn-secondary"
                            >
                                Previous Level
                            </button>
                        )}

                        {currentStep < steps.length ? (
                            <button
                                onClick={handleNext}
                                className="btn-primary"
                            >
                                Next Level
                            </button>
                        ) : (
                            <button
                                onClick={() => console.log('Final JSON Data:', JSON.stringify(formData, null, 2))}
                                className="btn-save"
                            >
                                Save Final JSON
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;