"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load user from localStorage on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("userInformation");
        if (storedData) {
          setUser(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("userInformation", JSON.stringify(userData));
        localStorage.removeItem("adminPasskey");
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }
  };

  const logOutUser = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("userInformation");
      } catch (error) {
        console.error("Error removing from localStorage:", error);
      }
    }
    router.push("/");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logOutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
