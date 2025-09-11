import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";



const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user || !user.teacher) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">
          ❌ No teacher data available. Please log in.
        </p>
      </div>
    );
  }

  const { name, gmail, teacherId } = user.teacher;

  const handleLogout = async () => {
    await logout(); // clear session
    navigate("/login"); // redirect
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="flex justify-between items-center px-6 py-4 shadow-md"
        style={{ backgroundColor: "#7f56da" }}
      >
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Teacher Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-white text-[#7f56da] font-medium px-4 py-2 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2"
          >
            Logout <IoLogInOutline className="text-lg" />
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="p-6 flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center transition transform hover:scale-105 hover:shadow-xl">
          {/* User Icon */}
          <div className="flex justify-center mb-4">
            <FaUserTie size={80} className="text-[#7f56da]" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{name}</h2>

          {/* Details */}
          <div className="space-y-3 text-left">
            <p>
              <span className="font-medium text-gray-600">Gmail:</span> {gmail}
            </p>
            <p>
              <span className="font-medium text-gray-600">Teacher ID:</span>{" "}
              {teacherId}
            </p>
          </div>

          {/* Manage Students Button */}
          <button
            className="mt-8 w-full font-medium py-2 px-4 rounded-lg transition transform hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "#7f56da", color: "white" }}
            onClick={() => alert("Marksheet upload feature coming soon!")}
          >
            Upload Marksheets
          </button>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
