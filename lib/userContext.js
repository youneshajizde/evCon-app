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
      const storedData = localStorage.getItem("userInformation");
      if (storedData) {
        setUser(JSON.parse(storedData));
      }
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      localStorage.setItem("userInformation", JSON.stringify(userData));
      localStorage.removeItem("adminPasskey");
    }
  };

  const logOutUser = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("userInformation");
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
