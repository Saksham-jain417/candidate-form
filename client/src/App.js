import React, { useState } from "react";
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    trigram: "",
    summary: "",
    education: {
      secondary: { school: "", board: "", year: "" },
      seniorSecondary: { school: "", board: "", year: "" },
      graduation: { degree: "", institution: "", year: "" },
      postGraduation: { degree: "", institution: "", year: "" }
    },
    experiences: [{ years: "", skills: "", details: "", projects: [""] }],
    achievements: [""],
    linkedin: "",
    github: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "trigram") {
      const savedData = localStorage.getItem(value.trim());
      if (savedData) {
        setFormData(JSON.parse(savedData));
      } else {
        setFormData((prev) => ({
          ...prev,
          [id]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleEducationChange = (level, field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...prev.education[level],
          [field]: value
        }
      }
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experiences];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, experiences: updated }));
  };

  const handleProjectChange = (expIndex, projIndex, value) => {
    const updated = [...formData.experiences];
    updated[expIndex].projects[projIndex] = value;
    setFormData((prev) => ({ ...prev, experiences: updated }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { years: "", skills: "", details: "", projects: [""] }]
    }));
  };

  const addProject = (expIndex) => {
    const updated = [...formData.experiences];
    updated[expIndex].projects.push("");
    setFormData((prev) => ({ ...prev, experiences: updated }));
  };

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""]
    }));
  };

  const handleAchievementChange = (index, value) => {
    const updated = [...formData.achievements];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, achievements: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/form', formData);
      if (formData.trigram.trim()) {
        localStorage.setItem(formData.trigram.trim(), JSON.stringify(formData));
      }
      alert("Form submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        portfolio: "",
        trigram: "",
        summary: "",
        education: {
          secondary: { school: "", board: "", year: "" },
          seniorSecondary: { school: "", board: "", year: "" },
          graduation: { degree: "", institution: "", year: "" },
          postGraduation: { degree: "", institution: "", year: "" }
        },
        experiences: [{ years: "", skills: "", details: "", projects: [""] }],
        achievements: [""],
        linkedin: "",
        github: ""
      });
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Error submitting form.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-10 max-w-5xl w-full space-y-6">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-indigo-700">Candidate Application Form</h1>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-sm text-gray-700">Full Name *</label>
            <input id="fullName" value={formData.fullName} onChange={handleChange} className="p-3 border rounded-lg w-full" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">Email *</label>
            <input id="email" type="email" value={formData.email} onChange={handleChange} className="p-3 border rounded-lg w-full" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">Phone Number</label>
            <input id="phone" value={formData.phone} onChange={handleChange} className="p-3 border rounded-lg w-full" placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">Portfolio URL</label>
            <input id="portfolio" value={formData.portfolio} onChange={handleChange} className="p-3 border rounded-lg w-full" placeholder="https://yourportfolio.com" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium text-sm text-gray-700">Trigram *</label>
            <input id="trigram" value={formData.trigram} onChange={handleChange} className="p-3 border rounded-lg w-full" placeholder="ABC" />
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block font-medium text-sm text-gray-700">Summary</label>
          <textarea id="summary" rows="3" value={formData.summary} onChange={handleChange} className="w-full border rounded-lg p-3" placeholder="Tell us about yourself..." />
        </div>

        {/* Education */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Education *</h2>
          {Object.entries(formData.education).map(([level, info]) => (
            <div key={level} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input placeholder={`${level[0].toUpperCase() + level.slice(1)} - School/College`} value={info.school || info.degree || ""} onChange={(e) => handleEducationChange(level, info.school !== undefined ? 'school' : 'degree', e.target.value)} className="p-3 border rounded-lg" />
              <input placeholder="Board/Institution" value={info.board || info.institution || ""} onChange={(e) => handleEducationChange(level, info.board !== undefined ? 'board' : 'institution', e.target.value)} className="p-3 border rounded-lg" />
              <input type="text" placeholder="Year/Duration" value={info.year || info.duration || ""} onChange={(e) => handleEducationChange(level, info.year !== undefined ? 'year' : 'duration', e.target.value)} className="p-3 border rounded-lg" />
            </div>
          ))}
        </div>

        {/* Additional fields like Experience, Projects, Achievements, Socials would be appended here in same pattern */}

        <div className="pt-4">
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
