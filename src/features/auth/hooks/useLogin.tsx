import { useState } from "react";
import AuthService from "../services/auth.service";
import type { LoginPayload } from "../type";
import { useAuth } from "./useAuth";

export const useLogin = () => {
  const { setUserData } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(data);
      const { user, token } = response.data.data;

      localStorage.setItem("userToken", token.replace("Bearer ", ""));
      setUserData(user);

      return user;
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};
