import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import type { AuthContextProviderProps, AuthContextType, User } from "../type";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userData, setUserData] = useState<User | null>(null);

  const saveUserData = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decoded = jwtDecode(token) as User;
      setUserData(decoded);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
