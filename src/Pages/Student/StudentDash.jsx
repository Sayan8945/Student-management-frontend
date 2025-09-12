import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa6";


const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

//   if (!user || !user.student) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-gray-600 text-lg">
//           ❌ No student data available. Please log in.
//         </p>
//       </div>
//     );
//   }

  const { name, year, roll, dob } = user.student;


  const handleLogout = async () => {
    await logout();         // clear session
    navigate("/login");     // redirect to login
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="flex justify-between items-center px-6 py-4 shadow-md"
        style={{ backgroundColor: "#7f56da" }}
      >
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Student Dashboard
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
            <FaUserGraduate size={80} className="text-[#7f56da]" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{name}</h2>

          {/* Details */}
          <div className="space-y-3 text-left">
            <p>
              <span className="font-medium text-gray-600">Year:</span> {year}
            </p>
            <p>
              <span className="font-medium text-gray-600">Roll:</span> {roll}
            </p>
            <p>
              <span className="font-medium text-gray-600">Date of Birth:</span>{" "}
              {new Date(dob).toLocaleDateString()}
            </p>
          </div>

          {/* See Marksheet Button */}
          <button
            className="mt-8 w-full font-medium py-2 px-4 rounded-lg transition transform hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "#7f56da", color: "white" }}
            onClick={() => alert("Marksheets feature coming soon!")}
          >
            Download Marksheet
          </button>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
