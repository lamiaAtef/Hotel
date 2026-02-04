import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";
import type { AuthContextProviderProps, AuthContextType, User } from "../type";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userData, setUserData] = useState<User | null>(()=>{
    const token = localStorage.getItem("userToken");
    if (!token) return null;

    try {
      return jwtDecode<User>(token);
    } catch (err) {
      localStorage.removeItem("userToken");
      return null;
    }
  });

  const saveUserData = () => {
   try {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    const decoded = jwtDecode<User>(token);
    setUserData(decoded);
  } catch (error) {
    console.error("Invalid token");
    logOut();
  }
  };
  // useCallback in logout "improve our code "
  // الـ function دي مش محتاجة أي قيم متغيرة من براها
// فـ نخلقها مرة واحدة ونحتفظ بنفس المرجع طول عمر الـ componen
  const logOut = useCallback(() => {
    setUserData(null);
    localStorage.removeItem("userToken");
  },[])

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData,logOut, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
}