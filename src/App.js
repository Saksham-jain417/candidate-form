import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    experiences: [
      {
        years: "",
        skills: "",
        details: "",
        projects: "",
      },
    ],
    linkedin: "",
    github: "",
  });

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

    setFormData((prev) => ({
      ...prev,
      experiences: updatedExperiences,
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          years: "",
          skills: "",
          details: "",
          projects: "",
        },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("submissions")) || [];
    const updated = [...existing, formData];
    localStorage.setItem("submissions", JSON.stringify(updated));

    alert("Application submitted successfully!");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      portfolio: "",
      experiences: [
        {
          years: "",
          skills: "",
          details: "",
          projects: "",
        },
      ],
      linkedin: "",
      github: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-10 max-w-4xl w-full">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">Candidate Application Form</h1>

        {/* Personal Info */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b border-indigo-300 pb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block font-semibold mb-2">Full Name</label>
              <input id="fullName" type="text" value={formData.fullName} onChange={handleChange} className="w-full border rounded-lg p-3" />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold mb-2">Email</label>
              <input id="email" type="email" value={formData.email} onChange={handleChange} className="w-full border rounded-lg p-3" />
            </div>
            <div>
              <label htmlFor="phone" className="block font-semibold mb-2">Phone</label>
              <input id="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full border rounded-lg p-3" />
            </div>
            <div>
              <label htmlFor="portfolio" className="block font-semibold mb-2">Portfolio</label>
              <input id="portfolio" type="url" value={formData.portfolio} onChange={handleChange} className="w-full border rounded-lg p-3" />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b border-indigo-300 pb-2 flex justify-between items-center">
            Experience & Projects
            <button type="button" onClick={addExperience} className="text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700">+ Add</button>
          </h2>

          {formData.experiences.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border border-gray-300 rounded-lg p-4">
              <div>
                <label className="block font-semibold mb-2">Years of Experience</label>
                <input
                  type="number"
                  value={exp.years}
                  onChange={(e) => handleExperienceChange(index, "years", e.target.value)}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Skills</label>
                <input
                  type="text"
                  value={exp.skills}
                  onChange={(e) => handleExperienceChange(index, "skills", e.target.value)}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold mb-2">Experience Details</label>
                <textarea
                  rows="3"
                  value={exp.details}
                  onChange={(e) => handleExperienceChange(index, "details", e.target.value)}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold mb-2">Projects</label>
                <textarea
                  rows="3"
                  value={exp.projects}
                  onChange={(e) => handleExperienceChange(index, "projects", e.target.value)}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b border-indigo-300 pb-2">Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="linkedin" className="block font-semibold mb-2">LinkedIn</label>
              <input id="linkedin" type="url" value={formData.linkedin} onChange={handleChange} className="w-full border rounded-lg p-3" />
            </div>
            <div>
              <label htmlFor="github" className="block font-semibold mb-2">GitHub</label>
              <input id="github" type="url" value={formData.github} onChange={handleChange} className="w-full border rounded-lg p-3" />
            </div>
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
