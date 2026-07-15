import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  // Re-usable so both the initial mount AND a fresh login can trigger it
  let fetchUser = useCallback(async function fetchUser() {
    try {
      let res = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/user/user-details`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  async function logout() {
    try {
      await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  let context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}