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
    if (!formData.fullName || !formData.trigram || !formData.email) {
      alert("Full Name, Trigram, and Email are mandatory.");
      return;
    }

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
      window.location.reload();
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Error submitting form.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-10 max-w-5xl w-full space-y-6 overflow-y-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-indigo-700">Candidate Application Form</h1>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: "fullName", label: "Full Name *", placeholder: "Enter your name" },
            { id: "email", label: "Email *", placeholder: "you@example.com", type: "email" },
            { id: "phone", label: "Phone Number", placeholder: "+91 98765 43210" },
            { id: "portfolio", label: "Portfolio URL", placeholder: "https://yourportfolio.com" },
            { id: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/yourname" },
            { id: "github", label: "GitHub URL", placeholder: "https://github.com/yourname" },
          ].map(({ id, label, placeholder, type = "text" }) => (
            <div key={id}>
              <label className="block font-medium text-sm text-gray-700">{label}</label>
              <input
                id={id}
                type={type}
                value={formData[id]}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                placeholder={placeholder}
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="block font-medium text-sm text-gray-700">Trigram *</label>
            <input
              id="trigram"
              value={formData.trigram}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
              placeholder="ABC"
            />
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
              <input placeholder="Year" value={info.year || ""} onChange={(e) => handleEducationChange(level, 'year', e.target.value)} className="p-3 border rounded-lg" />
            </div>
          ))}
        </div>

        {/* Experiences */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Experience</h2>
          {formData.experiences.map((exp, i) => (
            <div key={i} className="space-y-2 border p-4 rounded-lg bg-gray-50">
              <input placeholder="Years (e.g., 2)" value={exp.years} onChange={(e) => handleExperienceChange(i, 'years', e.target.value)} className="p-2 border rounded-lg w-full" />
              <input placeholder="Skills used (comma-separated)" value={exp.skills} onChange={(e) => handleExperienceChange(i, 'skills', e.target.value)} className="p-2 border rounded-lg w-full" />
              <input placeholder="Details" value={exp.details} onChange={(e) => handleExperienceChange(i, 'details', e.target.value)} className="p-2 border rounded-lg w-full" />
              {exp.projects.map((proj, j) => (
                <input key={j} placeholder={`Project ${j + 1}`} value={proj} onChange={(e) => handleProjectChange(i, j, e.target.value)} className="p-2 border rounded-lg w-full my-1" />
              ))}
              <button type="button" onClick={() => addProject(i)} className="text-sm text-indigo-600 underline">+ Add Project</button>
            </div>
          ))}
          <button type="button" onClick={addExperience} className="text-sm text-indigo-600 underline">+ Add Experience</button>
        </div>

        {/* Achievements */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Achievements</h2>
          {formData.achievements.map((a, i) => (
            <input key={i} placeholder={`Achievement ${i + 1}`} value={a} onChange={(e) => handleAchievementChange(i, e.target.value)} className="p-2 border rounded-lg w-full" />
          ))}
          <button type="button" onClick={addAchievement} className="text-sm text-indigo-600 underline">+ Add Achievement</button>
        </div>

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
