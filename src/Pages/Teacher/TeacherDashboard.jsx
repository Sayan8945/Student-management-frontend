import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import { Upload, Loader2 } from "lucide-react";

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    year: "",
    dept: "",
    roll: "",
  });

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

  const [file, setFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadMsg("");
    setUploading(true);

    const fd = new FormData();
    fd.append("year", formData.year);
    fd.append("dept", formData.dept);
    fd.append("roll", formData.roll);
    fd.append("marksheet", file);

    try {
      const res = await fetch("https://student-management-backend-nine.vercel.app/upload-marksheet", {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setUploadMsg(data.message || "✅ Marksheet uploaded successfully!");
        console.log("File URL:", data.url);
      } else {
        setUploadMsg(data.error || "❌ Upload failed");
      }
    } catch (err) {
      console.error(err);
      setUploadMsg("❌ Server error");
    } finally {
      setUploading(false);
    }
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
        </div>
        <div className="p-6">
          <form
            onSubmit={handleUpload}
            className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
          >
            <select
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            >
              <option value="">Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>

            <select
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, dept: e.target.value })
              }
            >
              <option value="">Select Dept</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="ME">ME</option>
              <option value="CE">CE</option>
            </select>

            <input
              type="text"
              placeholder="Roll Number"
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, roll: e.target.value })
              }
            />

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
            />
            {uploadMsg && (
              <p
                className={`text-center mt-2 text-sm font-medium ${
                  uploadMsg.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {uploadMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="flex items-center justify-center gap-2 w-full py-2 rounded bg-[#7f56da] text-white hover:shadow-lg hover:scale-105 transition disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} /> Upload Marksheet
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
