import { useState } from "react";

function AdminPanel() {
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    className: "",
    math: "",
    science: "",
    english: "",
    computer: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rollNumber: form.rollNumber,
          name: form.name,
          className: form.className,
          marks: {
            math: parseInt(form.math) || 0,
            science: parseInt(form.science) || 0,
            english: parseInt(form.english) || 0,
            computer: parseInt(form.computer) || 0,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message}`);
      } else {
        setMessage(`✅ ${data.message}`);
        setForm({
          name: "",
          rollNumber: "",
          className: "",
          math: "",
          science: "",
          english: "",
          computer: "",
        });
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          📋 Admin Panel - Add Student
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            className="border-2 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 w-full p-3 rounded-lg outline-none transition"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number (e.g., 03)"
            className="border-2 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 w-full p-3 rounded-lg outline-none transition"
            value={form.rollNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="className"
            placeholder="Class (e.g., 10)"
            className="border-2 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 w-full p-3 rounded-lg outline-none transition"
            value={form.className}
            onChange={handleChange}
            required
          />

          {/* Marks Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="number"
              name="math"
              placeholder="Math Marks"
              className="border-2 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 p-3 rounded-lg outline-none transition"
              value={form.math}
              onChange={handleChange}
            />
            <input
              type="number"
              name="science"
              placeholder="Science Marks"
              className="border-2 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 p-3 rounded-lg outline-none transition"
              value={form.science}
              onChange={handleChange}
            />
            <input
              type="number"
              name="english"
              placeholder="English Marks"
              className="border-2 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 p-3 rounded-lg outline-none transition"
              value={form.english}
              onChange={handleChange}
            />
            <input
              type="number"
              name="computer"
              placeholder="Computer Marks"
              className="border-2 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 p-3 rounded-lg outline-none transition"
              value={form.computer}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white font-semibold w-full py-3 rounded-lg hover:bg-green-700 transition"
          >
            ➕ Add Student
          </button>
          <button
          onClick={() => (window.location.href = "/")}
          className="w-full mt-6 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
        >
          ➕ Go to Student Panel
        </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
