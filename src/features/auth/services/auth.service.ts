import { AUTH_URLS } from "../../../config/api.endPoint"
import { axiosInstance } from "../../../services/httpClient"
import type { LoginPayload, LoginResponse, RegisterPayload } from "../type"

const AuthService =  {
    login : (data:LoginPayload)  => {
        return axiosInstance.post<LoginResponse>(AUTH_URLS.LOGIN,data)    
    },
    register : (data:RegisterPayload) => {
        return axiosInstance.post(AUTH_URLS.REGISTER,data)    

    }
    
    // change_password : (data) => {
    //     return axiosInstance.post(AUTH_URLS.CHANGE_PASSWORD,data)    

    // }
    //  forget_password : (data) => {
    //     return axiosInstance.post(AUTH_URLS.FORGET_PASSWORD,data)    

    // }
    // reset_password : (data) =>{
    //     return axiosInstance.post(AUTH_URLS.RESET_PASSWORD,data)    

    // }
    //  faceBook_Auth : (data) =>{
    //     return axiosInstance.post(AUTH_URLS.FACEBOOK_AUTH,data)    

    // }
    // google_Auth: (data) =>{
    //     return axiosInstance.post(AUTH_URLS.GOOGLE_AUTH,data)    

    // }
    // profile: (id) =>{
    //     return axiosInstance.post(AUTH_URLS.PROFILE(id))  

    // }

    
}
export default AuthService