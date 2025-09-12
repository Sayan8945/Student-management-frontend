import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa6";
import { FileDown, FileText } from "lucide-react";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [marksheetUrl, setMarksheetUrl] = useState(null);
  const [msg, setMsg] = useState("");
  const [showMarksheet, setShowMarksheet] = useState(false);

  if (!user || !user.student) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">❌ No student data available</p>
      </div>
    );
  }

  const { name, year, dept, roll, dob } = user.student;

  const handleLogout = async () => {
    await logout(); // clear session
    navigate("/login"); // redirect to login
  };
  // 🔹 Fetch marksheet when dashboard loads
  useEffect(() => {
    const fetchMarksheet = async () => {
      try {
        const res = await fetch("http://localhost:5000/get-marksheet", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.url) {
          setMarksheetUrl(data.url);
        } else {
          setMsg(data.error || "❌ Marksheet not uploaded yet");
        }
      } catch (err) {
        console.error(err);
        setMsg("❌ Server error");
      }
    };
    fetchMarksheet();
  }, []);

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
              <span className="font-medium text-gray-600">Department:</span>{" "}
              {dept}
            </p>
            <p>
              <span className="font-medium text-gray-600">Roll:</span> {roll}
            </p>
            <p>
              <span className="font-medium text-gray-600">Date of Birth:</span>{" "}
              {new Date(dob).toLocaleDateString()}
            </p>
          </div>

          {/* Show Marksheet Button */}
          {marksheetUrl ? (
            <button
              onClick={() => setShowMarksheet(!showMarksheet)}
              className="mt-6 inline-flex items-center gap-2 bg-[#7f56da] text-white px-5 py-2 rounded-lg hover:scale-105 transition"
            >
              <FileText size={18} />
              {showMarksheet ? "Hide Marksheet" : "Show Marksheet"}
            </button>
          ) : (
            <p className="mt-6 text-gray-600">
              {"❌ Marksheet not uploaded yet"}
            </p>
          )}

          {/* Marksheet Viewer */}
          {showMarksheet && marksheetUrl && (
  <div className="mt-8 w-full">
    <iframe
      src={marksheetUrl}
      title="Student Marksheet"
      className="w-full h-[500px] border rounded-lg shadow"
    ></iframe>
    <a
      href={marksheetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center gap-2 bg-[#7f56da] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
    >
      <FileDown size={18} /> Download Marksheet
    </a>
  </div>
)}

        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
