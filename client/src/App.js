import React, { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    trigram: "",
    summary: "",
    experiences: [{ years: "", skills: "", details: "", projects: [""] }],
    education: [{ degree: "", institution: "", duration: "" }],
    achievements: [""],
    linkedin: "",
    github: "",
  });

  // Autofill based on trigram
  useEffect(() => {
    if (formData.trigram.length === 3) {
      const savedData = localStorage.getItem(formData.trigram.toUpperCase());
      if (savedData) {
        setFormData(JSON.parse(savedData));
        alert("Data auto-filled based on trigram!");
      }
    }
  }, [formData.trigram]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index][field] = value;
    setFormData((prev) => ({ ...prev, experiences: updatedExperiences }));
  };

  const handleProjectChange = (expIndex, projIndex, value) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[expIndex].projects[projIndex] = value;
    setFormData((prev) => ({ ...prev, experiences: updatedExperiences }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { years: "", skills: "", details: "", projects: [""] },
      ],
    }));
  };

  const addProject = (expIndex) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[expIndex].projects.push("");
    setFormData((prev) => ({ ...prev, experiences: updatedExperiences }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", duration: "" }],
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, education: updated }));
  };

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""],
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

    // Save to local storage using trigram
    if (formData.trigram.length === 3) {
      localStorage.setItem(formData.trigram.toUpperCase(), JSON.stringify(formData));
    }

    alert("Form submitted successfully!");
    console.log("Saved locally:", formData);

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      portfolio: "",
      trigram: "",
      summary: "",
      experiences: [{ years: "", skills: "", details: "", projects: [""] }],
      education: [{ degree: "", institution: "", duration: "" }],
      achievements: [""],
      linkedin: "",
      github: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-10 max-w-5xl w-full">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">Candidate Application Form</h1>

        {/* Personal Info */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input id="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="p-3 border rounded-lg" />
            <input id="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="p-3 border rounded-lg" />
            <input id="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="p-3 border rounded-lg" />
            <input id="portfolio" placeholder="Portfolio Link" value={formData.portfolio} onChange={handleChange} className="p-3 border rounded-lg" />
            <input id="trigram" placeholder="Trigram (Unique Code)" value={formData.trigram} onChange={handleChange} className="p-3 border rounded-lg md:col-span-2" />
          </div>
        </section>

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Brief Summary</h2>
          <textarea id="summary" rows="3" placeholder="Tell us about yourself..." value={formData.summary} onChange={handleChange} className="w-full border rounded-lg p-3" />
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 flex justify-between">
            Education
            <button type="button" onClick={addEducation} className="text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700">+ Add</button>
          </h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(index, "degree", e.target.value)} className="p-3 border rounded-lg" />
              <input placeholder="Institution" value={edu.institution} onChange={(e) => handleEducationChange(index, "institution", e.target.value)} className="p-3 border rounded-lg" />
              <input placeholder="Duration (e.g. 2020-2024)" value={edu.duration} onChange={(e) => handleEducationChange(index, "duration", e.target.value)} className="p-3 border rounded-lg" />
            </div>
          ))}
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 flex justify-between">
            Experience & Projects
            <button type="button" onClick={addExperience} className="text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700">+ Add</button>
          </h2>
          {formData.experiences.map((exp, i) => (
            <div key={i} className="border border-gray-300 p-4 rounded-lg mb-6">
              <input placeholder="Years of Experience" type="number" value={exp.years} onChange={(e) => handleExperienceChange(i, "years", e.target.value)} className="p-3 border rounded-lg w-full mb-4" />
              <input placeholder="Key Skills" value={exp.skills} onChange={(e) => handleExperienceChange(i, "skills", e.target.value)} className="p-3 border rounded-lg w-full mb-4" />
              <textarea placeholder="Experience Details" rows="3" value={exp.details} onChange={(e) => handleExperienceChange(i, "details", e.target.value)} className="p-3 border rounded-lg w-full mb-4" />
              {exp.projects.map((proj, j) => (
                <input key={j} placeholder={`Project ${j + 1}`} value={proj} onChange={(e) => handleProjectChange(i, j, e.target.value)} className="p-3 border rounded-lg w-full mb-2" />
              ))}
              <button type="button" onClick={() => addProject(i)} className="text-sm bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600">+ Add Project</button>
            </div>
          ))}
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 flex justify-between">
            Achievements & Certifications
            <button type="button" onClick={addAchievement} className="text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700">+ Add</button>
          </h2>
          {formData.achievements.map((ach, i) => (
            <input key={i} placeholder={`Achievement or Certification ${i + 1}`} value={ach} onChange={(e) => handleAchievementChange(i, e.target.value)} className="p-3 border rounded-lg w-full mb-4" />
          ))}
        </section>

        {/* Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input id="linkedin" placeholder="LinkedIn Profile URL" value={formData.linkedin} onChange={handleChange} className="p-3 border rounded-lg" />
            <input id="github" placeholder="GitHub Profile URL" value={formData.github} onChange={handleChange} className="p-3 border rounded-lg" />
          </div>
        </section>

        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default App;

