import type { ReactNode } from "react";

export interface AuthHeaderProps{
  title:string;
  isLogin?: boolean;
  
}

export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  confirmPassword:string;
  phoneNumber:number;
  country: string;
  role: "User"|"admin";
  profileImage:File[];

}
// Login 

export interface LoginPayload {
  email: string;
  password: string;
}
export interface User{

    _id: string;
    userName: string;
    role: string;
    email?: string;
}
export interface LoginResponseData {
  token: string;
  user:User;
}
export interface LoginResponse {
  success: boolean;
  message:User;
  data : LoginResponseData;
}
// end login
// start AuthContext 
export interface AuthContextType {
   userData: User | null;
//   loginUser: (user: User, token: string) => void;
    logOut: () => void;
    saveUserData: () => void;
    setUserData: React.Dispatch<React.SetStateAction<User | null>>;
}



export interface AuthContextProviderProps {
  children: ReactNode;
}

// end AuthContext


// Reset password
export interface ResetPayload {
  email: string;
  password: string;
  confirmPassword: string;
  seed:string;
}

export interface ForgetPayload{
  email: string;
}
// route interface
export interface UserRouteProps {
  children: ReactNode;
}
export interface changePayload{
   oldPassword:string;
   newPassworf:string;
   confirmPassword:string;
}