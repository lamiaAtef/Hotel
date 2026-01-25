import axios from 'axios'
import { baseURL } from '../config/api.endPoint'

const axiosInstance=axios.create({
    baseURL:baseURL,
    timeout:5000,
})
// const axiosUserInstance=axios.create({
//     baseURL:baseURL,
//     timeout:5000,
// })
axiosInstance.interceptors.request.use(
    (config)=>{
        const token =localStorage.getItem('userToken')
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error)=>Promise.reject(error)
)
axiosInstance.interceptors.response.use(
    (response)=>response,
    (error)=>{
        const status=error.response?.status;
        if(status==401){
            // AuthService.handelUnauthorization(error)
            // ممكن هنا تستدعي logout

        }
         return Promise.reject(error);
 
        
    }
    
)
export  {axiosInstance, axiosUserInstance};
