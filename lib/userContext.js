"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  localStorage.setItem("userInfo1", user);

  const router = useRouter();
  useEffect(() => {
    const storedData = localStorage.getItem("userInformation");

    if (storedData) {
      setUser(JSON.parse(storedData));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("userInformation", JSON.stringify(userData));
    localStorage.removeItem("adminPasskey");
  };

  const logOutUser = () => {
    setUser(null);
    localStorage.removeItem("userInformation");
    router.push("/");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logOutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
