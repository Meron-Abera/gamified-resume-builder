import React from 'react';

function StepContent({ stepTitle, currentText, onTextChange }) {
    return (
        <div className="step-content">
            <label htmlFor={`textarea-${stepTitle}`}>
                Text for {stepTitle}:
            </label>
            <textarea
                id={`textarea-${stepTitle}`}
                rows="15"
                placeholder={`Enter details for the ${stepTitle} here...`}
                value={currentText}
                onChange={onTextChange}
            />
        </div>
    );
}

export default StepContent;