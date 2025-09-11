import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Students from "../assets/students.svg"; // replace with your illustration
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    year: "",
    dept: "",
    roll: "",
    dob: "",
    gmail: "",
    teacherId: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState(true);
  let textColor = "";
  if (errorMsg) {
    textColor = "text-red-500";
  } else {
    textColor = "text-green-700";
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "student") {
        navigate("/student-dashboard");
      } else if (user.role === "teacher") {
        navigate("/teacher-dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (role === "student") {
      if (!formData.year) newErrors.year = "Year is required";
      if (!formData.dept) newErrors.dept = "Department is required";
      if (!formData.roll.trim()) newErrors.roll = "Roll number is required";
      if (!formData.dob) newErrors.dob = "Date of Birth is required";
    } else {
      if (!formData.gmail.trim()) newErrors.gmail = "Gmail is required";
      else if (!/\S+@\S+\.\S+/.test(formData.gmail))
        newErrors.gmail = "Enter a valid email";
      if (!formData.teacherId.trim())
        newErrors.teacherId = "Teacher ID is required";
    }
    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const result = await login(role, formData);
    if (result.success) {
      if (role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/teacher-dashboard");
      }
    } else {
      setMessage(result.error || "❌ Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gray-50 items-center justify-center p-6">
          <img
            src={Students}
            alt="login illustration"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Right form section */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
              Login to Your Account
            </h1>
            <p className="text-gray-500 text-center mb-6">
              Access as Student or Teacher
            </p>

            {/* Role Switch */}
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`px-4 py-2 rounded-l-lg ${
                  role === "student"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`px-4 py-2 rounded-r-lg ${
                  role === "teacher"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Teacher
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {role === "student" ? (
                <>
                  {/* Year */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <select
                      name="year"
                      className="w-full border rounded-lg px-3 py-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.year}
                      onChange={handleChange}
                    >
                      <option value="">Select Year</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                    {errors.year && (
                      <p className="text-red-500 text-sm">{errors.year}</p>
                    )}
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <select
                      name="dept"
                      className="w-full border rounded-lg px-3 py-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.dept}
                      onChange={handleChange}
                    >
                      <option value="">Select Department</option>
                      <option value="CSE">Computer Science (CSE)</option>
                      <option value="ECE">
                        Electronics & communication (ECE)
                      </option>

                      <option value="EEE">Electrical (EEE)</option>
                      <option value="ME">Mechanical (ME)</option>
                      <option value="CE">Civil (CE)</option>
                    </select>
                    {errors.dept && (
                      <p className="text-red-500 text-sm">{errors.dept}</p>
                    )}
                  </div>

                  {/* Roll */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      name="roll"
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.roll}
                      onChange={handleChange}
                    />
                    {errors.roll && (
                      <p className="text-red-500 text-sm">{errors.roll}</p>
                    )}
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-sm">{errors.dob}</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Gmail */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gmail
                    </label>
                    <input
                      type="email"
                      name="gmail"
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.gmail}
                      onChange={handleChange}
                    />
                    {errors.gmail && (
                      <p className="text-red-500 text-sm">{errors.gmail}</p>
                    )}
                  </div>

                  {/* Teacher ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Teacher ID
                    </label>
                    <input
                      type="text"
                      name="teacherId"
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.teacherId}
                      onChange={handleChange}
                    />
                    {errors.teacherId && (
                      <p className="text-red-500 text-sm">{errors.teacherId}</p>
                    )}
                  </div>
                </>
              )}
              {/* Message */}
              {message && (
                <p
                  className={`mt-4 text-center text-sm font-medium ${textColor}`}
                >
                  {message}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="flex justify-center">
              <p>
                Back to{" "}
                <Link to="/" className="text-purple-700 underline">
                  Home Page
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
