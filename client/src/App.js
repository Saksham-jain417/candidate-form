// Redesigned App.js for professional candidate form with all previous enhancements
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10 space-y-8"
      >
        <h1 className="text-4xl font-bold text-center text-indigo-700">
          Professional Candidate Application
        </h1>

        {/* Personal Info */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          {[
            { id: "fullName", label: "Full Name *" },
            { id: "email", label: "Email *", type: "email" },
            { id: "phone", label: "Phone Number" },
            { id: "portfolio", label: "Portfolio URL" },
            { id: "linkedin", label: "LinkedIn URL" },
            { id: "github", label: "GitHub URL" },
            { id: "trigram", label: "Trigram *" },
          ].map(({ id, label, type = "text" }) => (
            <div key={id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                id={id}
                type={type}
                value={formData[id]}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <textarea
              id="summary"
              rows="4"
              value={formData.summary}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            ></textarea>
          </div>
        </section>

        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Education</h2>
          {Object.entries(formData.education).map(([level, fields]) => (
            <div key={level} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(fields).map(([field, value]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{`${level} - ${field}`}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        education: {
                          ...prev.education,
                          [level]: {
                            ...prev.education[level],
                            [field]: e.target.value,
                          },
                        },
                      }));
                    }}
                    className="w-full border p-3 rounded-lg"
                  />
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Experience */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Work Experience</h2>
          {formData.experiences.map((exp, index) => (
            <div key={index} className="space-y-2 border rounded-lg p-4">
              {["designation", "company", "duration", "summary"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={exp[field]}
                    onChange={(e) => updateArrayField("experiences", index, field, e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Projects in this role</label>
                {exp.projects.map((proj, projIndex) => (
                  <input
                    key={projIndex}
                    type="text"
                    value={proj}
                    onChange={(e) => {
                      const updated = [...formData.experiences];
                      updated[index].projects[projIndex] = e.target.value;
                      setFormData({ ...formData, experiences: updated });
                    }}
                    className="w-full border p-2 rounded mb-2"
                  />
                ))}
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:underline"
                  onClick={() => {
                    const updated = [...formData.experiences];
                    updated[index].projects.push("");
                    setFormData({ ...formData, experiences: updated });
                  }}
                >
                  + Add Project
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-sm text-indigo-600 hover:underline"
            onClick={() =>
              addItem("experiences", {
                designation: "",
                duration: "",
                company: "",
                summary: "",
                projects: [""],
              })
            }
          >
            + Add Experience
          </button>
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Personal Projects</h2>
          {formData.projects.map((proj, index) => (
            <div key={index} className="space-y-2 border rounded-lg p-4">
              {["title", "technologies", "summary", "link"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={proj[field]}
                    onChange={(e) => updateArrayField("projects", index, field, e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            className="text-sm text-indigo-600 hover:underline"
            onClick={() =>
              addItem("projects", {
                title: "",
                technologies: "",
                summary: "",
                link: "",
              })
            }
          >
            + Add Project
          </button>
        </section>

        {/* Achievements */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Achievements</h2>
          {formData.achievements.map((ach, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Achievement #{index + 1}</label>
              <input
                type="text"
                value={ach}
                onChange={(e) => updateSimpleArray("achievements", index, e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            className="text-sm text-indigo-600 hover:underline"
            onClick={() => addItem("achievements", "")}
          >
            + Add Achievement
          </button>
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

