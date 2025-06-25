// Enhanced App.js with remove buttons for experience, projects, achievements
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
    education: {
      secondary: { school: "", board: "", year: "" },
      seniorSecondary: { school: "", board: "", year: "" },
      graduation: { degree: "", institution: "", year: "" },
      postGraduation: { degree: "", institution: "", year: "" },
    },
    experiences: [
      {
        designation: "",
        duration: "",
        company: "",
        summary: "",
        projects: [""],
      },
    ],
    projects: [
      {
        title: "",
        technologies: "",
        summary: "",
        link: "",
      },
    ],
    achievements: [""],
    linkedin: "",
    github: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
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

  const updateArrayField = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const updateSimpleArray = (section, index, value) => {
    const updated = [...formData[section]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const addItem = (section, template) => {
    setFormData((prev) => ({ ...prev, [section]: [...prev[section], template] }));
  };

  const removeItem = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullName || !formData.trigram || !formData.email) {
      alert("Full Name, Trigram, and Email are mandatory.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/form", formData);
      if (formData.trigram.trim()) {
        localStorage.setItem(formData.trigram.trim(), JSON.stringify(formData));
      }
      alert("Form submitted!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }
  };

  const isValid = (value) => value.trim() !== "";
  const emailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10 space-y-8"
      >
        <h1 className="text-4xl font-bold text-center text-indigo-700">
          Candidate Application Form
        </h1>

        {/* Trigram first */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trigram *</label>
          <input
            id="trigram"
            type="text"
            value={formData.trigram}
            onChange={handleChange}
            className={`w-full border p-3 rounded-lg ${!isValid(formData.trigram) ? 'bg-red-100' : 'bg-green-100'}`}
            placeholder="Enter your trigram first"
          />
        </div>

        {/* Personal Info */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Personal Information</h2>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Full Name *</label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg ${!isValid(formData.fullName) ? "bg-red-100" : "bg-green-100"}`}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email *</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg ${!emailValid(formData.email) ? "bg-red-100" : "bg-green-100"}`}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone</label>
            <input
              id="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Portfolio</label>
            <input
              id="portfolio"
              type="text"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="https://yourportfolio.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">LinkedIn</label>
            <input
              id="linkedin"
              type="text"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">GitHub</label>
            <input
              id="github"
              type="text"
              value={formData.github}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="https://github.com/yourhandle"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Summary</label>
            <textarea
              id="summary"
              rows="3"
              value={formData.summary}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Brief summary about yourself"
            />
          </div>
        </section>


        {/* Education section remains */}

        {/* Experiences */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Work Experience</h2>
          {formData.experiences.map((exp, i) => (
            <div key={i} className="border p-4 rounded space-y-2">
              {["designation", "duration", "company", "summary"].map((field) => (
                <div key={field}>
                  <label className="block text-sm text-gray-700 capitalize">{field}</label>
                  <input
                    value={exp[field]}
                    onChange={(e) => updateArrayField("experiences", i, field, e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => removeItem("experiences", i)}
                className="bg-red-500 text-white px-4 py-1 rounded mt-2"
              >Remove</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("experiences", { designation: "", duration: "", company: "", summary: "", projects: [""] })}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >Add Experience</button>
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Projects</h2>
          {formData.projects.map((proj, i) => (
            <div key={i} className="border p-4 rounded space-y-2">
              {["title", "technologies", "summary", "link"].map((field) => (
                <div key={field}>
                  <label className="block text-sm text-gray-700 capitalize">{field}</label>
                  <input
                    value={proj[field]}
                    onChange={(e) => updateArrayField("projects", i, field, e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => removeItem("projects", i)}
                className="bg-red-500 text-white px-4 py-1 rounded mt-2"
              >Remove</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("projects", { title: "", technologies: "", summary: "", link: "" })}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >Add Project</button>
        </section>

        {/* Achievements */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Achievements</h2>
          {formData.achievements.map((a, i) => (
            <div key={i} className="flex gap-4 items-center">
              <input
                value={a}
                onChange={(e) => updateSimpleArray("achievements", i, e.target.value)}
                className="w-full border p-2 rounded"
              />
              <button
                type="button"
                onClick={() => removeItem("achievements", i)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >Remove</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("achievements", "")}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >Add Achievement</button>
        </section>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default App;


