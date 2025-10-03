import React, { useState } from "react";

const SectionView = ({ keyName, label, unlocked, completed, onProgressUpdate }) => {
    const [formValue, setFormValue] = useState("");
    const [saving, setSaving] = useState(false);

    if (!unlocked) {
        return (
            <div className="p-6 text-gray-700">
                <h3 className="text-lg font-semibold mb-2">{label}</h3>
                <p>This section is locked. Complete previous sections to unlock it.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">{label}</h3>

            <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Enter details</label>
                <textarea
                    rows="6"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    className="w-full p-3 border rounded"
                    placeholder={`Write your ${label.toLowerCase()} here...`}
                />
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={async () => {
                        setSaving(true);
                        try {
                            const res = await fetch("http://localhost:8080/progress/complete", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ section: keyName }),
                            });
                            const updated = await res.json();
                            onProgressUpdate(updated);
                            alert(`${label} saved and marked complete!`);
                        } catch (err) {
                            console.error(err);
                            alert("Error saving — check backend console");
                        } finally {
                            setSaving(false);
                        }
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    {saving ? "Saving..." : completed ? "Update" : "Save & Complete"}
                </button>

                <button
                    onClick={() => {
                        setFormValue("");
                    }}
                    className="px-3 py-2 border rounded"
                >
                    Clear
                </button>

                {completed && <div className="text-sm text-green-600">Completed ✓</div>}
            </div>
        </div>
    );
};

export default SectionView;
