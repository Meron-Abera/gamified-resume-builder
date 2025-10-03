import React from 'react';

function CompletionAnimation() {
    return (
        <div className="animation-overlay">
            <div className="animation-box">
                <span className="cheering-character">🎉</span>
                <h3>SECTION COMPLETE!</h3>
                <p>Leveling up your profile and gaining XP...</p>

                <div className="confetti-container">
                    <div className="confetti" style={{'--x': '100px', backgroundColor: '#3498db'}}></div>
                    <div className="confetti" style={{'--x': '-150px', backgroundColor: '#f1c40f'}}></div>
                    <div className="confetti" style={{'--x': '50px', backgroundColor: '#e74c3c'}}></div>
                    <div className="confetti" style={{'--x': '-200px', backgroundColor: '#9b59b6'}}></div>
                    <div className="confetti" style={{'--x': '150px', backgroundColor: '#1abc9c'}}></div>
                </div>
            </div>
        </div>
    );
}

export default CompletionAnimation;