// Enhanced App.js with mandatory field labels, validation, education levels, and UI improvements
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    trigram: "",
    summary: "",
    experiences: [{ years: "", skills: "", details: "", projects: [""] }],
    education: [
      { level: "Secondary", institution: "", duration: "" },
      { level: "Senior Secondary", institution: "", duration: "" },
      { level: "Graduation", institution: "", duration: "" },
      { level: "Post Graduation", institution: "", duration: "" }
    ],
    achievements: [""],
    linkedin: "",
    github: "",
  });

  const [validation, setValidation] = useState({ email: true });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setValidation((prev) => ({ ...prev, email: isValid }));
    }

    if (id === "trigram") {
      const saved = localStorage.getItem(value.trim());
      if (saved) {
        setFormData(JSON.parse(saved));
      } else {
        setFormData((prev) => ({ ...prev, [id]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleExperienceChange = (i, field, value) => {
    const updated = [...formData.experiences];
    updated[i][field] = value;
    setFormData((prev) => ({ ...prev, experiences: updated }));
  };

  const handleProjectChange = (expIdx, projIdx, value) => {
    const updated = [...formData.experiences];
    updated[expIdx].projects[projIdx] = value;
    setFormData((prev) => ({ ...prev, experiences: updated }));
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, education: updated }));
  };

  const handleAchievementChange = (i, value) => {
    const updated = [...formData.achievements];
    updated[i] = value;
    setFormData((prev) => ({ ...prev, achievements: updated }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { years: "", skills: "", details: "", projects: [""] }],
    }));
  };

  const addProject = (expIdx) => {
    const updated = [...formData.experiences];
    updated[expIdx].projects.push("");
    setFormData((prev) => ({ ...prev, experiences: updated }));
  };

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation.email) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/form", formData);
      if (formData.trigram.trim()) {
        localStorage.setItem(formData.trigram.trim(), JSON.stringify(formData));
      }
      alert("Form submitted successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-10 max-w-5xl w-full space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700">Candidate Application Form</h1>

        {/* Personal Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Full Name <span className="text-red-500">*</span></label>
              <input id="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="p-3 border rounded-lg w-full" required />
            </div>
            <div>
              <label className="block font-medium mb-1">Email <span className="text-red-500">*</span></label>
              <input id="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" className={`p-3 rounded-lg w-full border ${validation.email ? "border-green-400" : "border-red-500"}`} required />
            </div>
            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input id="phone" value={formData.phone} onChange={handleChange} placeholder="+91 1234567890" className="p-3 border rounded-lg w-full" />
            </div>
            <div>
              <label className="block font-medium mb-1">Portfolio</label>
              <input id="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://yourportfolio.com" className="p-3 border rounded-lg w-full" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Trigram <span className="text-red-500">*</span></label>
              <input id="trigram" value={formData.trigram} onChange={handleChange} placeholder="Enter trigram" className="p-3 border rounded-lg w-full" required />
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Education Details <span className="text-red-500">*</span></h2>
          <div className="space-y-4">
            {formData.education.map((edu, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium mb-1">{edu.level}</label>
                  <input value={edu.institution} onChange={(e) => handleEducationChange(i, "institution", e.target.value)} placeholder="Institution" className="p-3 border rounded-lg w-full" required />
                </div>
                <div>
                  <label className="block font-medium mb-1">Duration</label>
                  <input value={edu.duration} onChange={(e) => handleEducationChange(i, "duration", e.target.value)} type="text" placeholder="e.g. 2020-2024" className="p-3 border rounded-lg w-full" required />
                </div>
                <div>
                  <label className="block font-medium mb-1">Degree</label>
                  <input value={edu.degree} onChange={(e) => handleEducationChange(i, "degree", e.target.value)} placeholder="e.g. B.Tech" className="p-3 border rounded-lg w-full" required />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Button */}
        <div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;


