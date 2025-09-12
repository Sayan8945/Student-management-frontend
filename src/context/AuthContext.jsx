import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext(null);

// Loading Spinner Component
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-12 h-12 border-4 border-[#7f56da] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Login
  const login = async (role, credentials) => {
    const endpoint =
      role === "student"
        ? `http://localhost:5000/login/student`
        : `http://localhost:5000/login/teacher`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user); // ✅ will now update immediately
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error("Login failed:", err);
      return { success: false, error: "Server error" };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await fetch(`http://localhost:5000/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  // 🔹 Show Loading Spinner until session check finishes
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
