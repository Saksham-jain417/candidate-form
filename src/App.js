import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    experience: "",
    skills: "",
    experienceDetails: "",
    projects: "",
    linkedin: "",
    github: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save data to localStorage
    const existing = JSON.parse(localStorage.getItem("submissions")) || [];
    const updated = [...existing, formData];
    localStorage.setItem("submissions", JSON.stringify(updated));

    alert("Application submitted successfully!");

    // Reset the form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      portfolio: "",
      experience: "",
      skills: "",
      experienceDetails: "",
      projects: "",
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
              <input id="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder="Your full name" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold mb-2">Email Address</label>
              <input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="phone" className="block font-semibold mb-2">Phone Number</label>
              <input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="portfolio" className="block font-semibold mb-2">Portfolio URL</label>
              <input id="portfolio" type="url" value={formData.portfolio} onChange={handleChange} placeholder="https://yourportfolio.com" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b border-indigo-300 pb-2">Experience & Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="experience" className="block font-semibold mb-2">Years of Experience</label>
              <input id="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="3" min="0" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="skills" className="block font-semibold mb-2">Key Skills</label>
              <input id="skills" type="text" value={formData.skills} onChange={handleChange} placeholder="JavaScript, React, Node.js" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="experienceDetails" className="block font-semibold mb-2">Experience Details</label>
              <textarea id="experienceDetails" rows="4" value={formData.experienceDetails} onChange={handleChange} placeholder="Briefly describe your relevant work experience" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none" />
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b border-indigo-300 pb-2">Projects</h2>
          <div>
            <label htmlFor="projects" className="block font-semibold mb-2">Highlight Your Projects</label>
            <textarea id="projects" rows="4" value={formData.projects} onChange={handleChange} placeholder="Describe the key projects you have worked on" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none" />
          </div>
        </section>

        {/* Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b border-indigo-300 pb-2">Social & Professional Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="linkedin" className="block font-semibold mb-2">LinkedIn Profile</label>
              <input id="linkedin" type="url" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="github" className="block font-semibold mb-2">GitHub Profile</label>
              <input id="github" type="url" value={formData.github} onChange={handleChange} placeholder="https://github.com/yourusername" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
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

