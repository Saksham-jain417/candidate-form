// Enhanced App.js with full sections, validation, and UI improvements
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

  const handleChange = async (e) => {
    const { id, value } = e.target;

    if (id === "trigram") {
      const trigram = value.trim();
      setFormData((prev) => ({ ...prev, trigram: value }));

      if (trigram) {
        try {
          const response = await axios.get(`https://candidate-form-backend-k8cm.onrender.com/api/form/${trigram}`);
          if (response.data) {
            setFormData(response.data);
          }
        } catch (error) {
          console.warn("No existing data found for this trigram.");
          // Keep only trigram and reset other fields
          setFormData((prev) => ({
            ...prev,
            trigram,
          }));
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };


  const handleEducationChange = (level, field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...prev.education[level],
          [field]: value,
        },
      },
    }));
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
    const trigramRegex = /^[A-Za-z]{1,3}\d{0,2}$/;

    if (!formData.fullName || !formData.trigram || !formData.email) {
      alert("Full Name, Trigram, and Email are mandatory.");
      return;
    }

    if (
      formData.trigram.length < 3 ||
      formData.trigram.length > 5 ||
      !trigramRegex.test(formData.trigram)
    ) {
      alert("Trigram must be 3 to 5 characters long, starting with 1–3 letters followed by up to 2 digits.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      await axios.post("https://candidate-form-backend-k8cm.onrender.com/api/form", formData);
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

        {/* Trigram */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trigram *</label>
          <input
            id="trigram"
            type="text"
            value={formData.trigram}
            onChange={handleChange}
            className={`w-full border p-3 rounded-lg ${formData.trigram.length >= 3 &&
                formData.trigram.length <= 5 &&
                /^[A-Za-z]{1,3}\d{0,2}$/.test(formData.trigram)
                ? 'bg-green-100'
                : 'bg-red-100'
              }`}
            placeholder="Enter your trigram (1–3 letters + up to 2 digits)"
          />

        </div>

        {/* Personal Info */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          {['fullName', 'email', 'phone', 'portfolio', 'linkedin', 'github'].map((field) => (
            <div key={field}>
              <label className="block text-sm text-gray-700 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')} {['fullName', 'email'].includes(field) && '*'}</label>
              <input
                id={field}
                type="text"
                value={formData[field]}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg ${field === 'email' ? (emailValid(formData.email) ? 'bg-green-100' : 'bg-red-100') : isValid(formData[field]) ? 'bg-green-100' : 'bg-red-100'}`}
              />
            </div>
          ))}
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

        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Education</h2>
          {Object.entries(formData.education).map(([level, data]) => (
            <div key={level} className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h3 className="text-lg font-medium capitalize">{level.replace(/([A-Z])/g, ' $1')}</h3>
              {Object.entries(data).map(([field, value]) => (
                <div key={field}>
                  <label className="block text-sm text-gray-700 capitalize">{field}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleEducationChange(level, field, e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Experiences */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Experience</h2>
          {formData.experiences.map((exp, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg space-y-2">
              {['designation', 'duration', 'company', 'summary'].map((field) => (
                <div key={field}>
                  <label className="block text-sm text-gray-700 capitalize">{field}</label>
                  <input
                    type="text"
                    value={exp[field]}
                    onChange={(e) => updateArrayField('experiences', idx, field, e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm text-gray-700">Projects</label>
                {exp.projects.map((proj, pIdx) => (
                  <input
                    key={pIdx}
                    type="text"
                    value={proj}
                    onChange={(e) => {
                      const updated = [...formData.experiences];
                      updated[idx].projects[pIdx] = e.target.value;
                      setFormData((prev) => ({ ...prev, experiences: updated }));
                    }}
                    className="w-full border p-2 rounded my-1"
                  />
                ))}
              </div>
              <button type="button" onClick={() => removeItem('experiences', idx)} className="text-red-600 text-sm">Remove Experience</button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('experiences', { designation: '', duration: '', company: '', summary: '', projects: [''] })} className="text-blue-600 text-sm">Add Experience</button>
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Projects</h2>
          {formData.projects.map((proj, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg space-y-2">
              {['title', 'technologies', 'summary', 'link'].map((field) => (
                <div key={field}>
                  <label className="block text-sm text-gray-700 capitalize">{field}</label>
                  <input
                    type="text"
                    value={proj[field]}
                    onChange={(e) => updateArrayField('projects', idx, field, e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              ))}
              <button type="button" onClick={() => removeItem('projects', idx)} className="text-red-600 text-sm">Remove Project</button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('projects', { title: '', technologies: '', summary: '', link: '' })} className="text-blue-600 text-sm">Add Project</button>
        </section>

        {/* Achievements */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Achievements</h2>
          {formData.achievements.map((ach, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="text"
                value={ach}
                onChange={(e) => updateSimpleArray('achievements', idx, e.target.value)}
                className="w-full border p-2 rounded"
              />
              <button type="button" onClick={() => removeItem('achievements', idx)} className="text-red-600 text-sm">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('achievements', '')} className="text-blue-600 text-sm">Add Achievement</button>
        </section>

        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default App;




