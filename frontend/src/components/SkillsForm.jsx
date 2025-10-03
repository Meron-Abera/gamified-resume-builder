import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SkillsForm = ({ onSaved }) => {
    const [skills, setSkills] = useState([
        { name: "React", level: 70 },
        { name: "Node.js", level: 65 },
        { name: "Spring Boot", level: 60 },
        { name: "SQL", level: 75 },
    ]);

    const handleSave = async () => {
        await fetch("http://localhost:8080/progress/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ section: "skills" }),
        });
        if (onSaved) onSaved();
        alert("Skills saved & progress updated!");
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Your Skills</h2>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={skills}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="level" fill="#6366F1" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>

            <button
                onClick={handleSave}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500 font-semibold shadow-md transition-colors duration-200"
            >
                Save & Complete
            </button>
        </div>
    );
};

export default SkillsForm;
