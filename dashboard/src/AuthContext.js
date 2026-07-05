import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3002/auth/verify", {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (err) {
        setUser(null);
        // Redirect unauthenticated users to the login page of the frontend
        window.location.href = "http://localhost:3000/login";
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading Dashboard...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
