import React from "react";
import { Link } from "react-router-dom";
import Students from "../assets/students.svg";

const Homepage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        {/* Left side - image */}
        <div className="flex items-center justify-center">
          <img
            src={Students}
            alt="students"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right side - content */}
        <div className="flex flex-col justify-center p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-snug">
            Welcome to <br />
            College Management <br />
            System
          </h1>

          <p className="mt-6 mb-6 text-gray-600 leading-relaxed">
            Streamline college students' marksheets, teachers' portal Management
          </p>

          <div className="flex flex-col items-center gap-4">
            {/* Login Button */}
            <Link to="/login" className="w-full">
              <button className="w-full bg-[#7f56da] hover:bg-[#7a1ccb] text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                Login
              </button>
            </Link>

            {/* Login as Guest Button */}
            <Link to="/signup" className="w-full">
              <button className="w-full border border-[#7f56da] text-[#7f56da] hover:bg-[#f3eaff] font-medium py-2 px-4 rounded-lg transition duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
