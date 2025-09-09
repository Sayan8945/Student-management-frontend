import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function SearchStudent() {
  const [formData, setFormData] = useState({
    name: "",
    className: "",
    rollNumber: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const res = await axios.post("https://student-management-backend-nine.vercel.app/search", formData);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">🔍 Search Marksheet</h1>

        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="number"
            name="className"
            placeholder="Enter Class"
            value={formData.className}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="number"
            name="rollNumber"
            placeholder="Enter Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
          >
            Search
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold text-lg">📜 Marksheet</h2>
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>Class:</strong> {result.className}</p>
            <p><strong>Roll No:</strong> {result.rollNumber}</p>
            <p><strong>Math:</strong> {result.marks?.math}</p>
            <p><strong>Science:</strong> {result.marks?.science}</p>
            <p><strong>English:</strong> {result.marks?.english}</p>
          </div>
        )}

        <button
          onClick={() => (window.location.href = "/admin")}
          className="w-full mt-6 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
        >
        <Link to="/admin">➕ Go to Admin Panel</Link>
        </button>
      </div>
    </div>
  );
}

export default SearchStudent;
