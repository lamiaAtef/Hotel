import { useState } from "react";
import AdminService from "../../services/AdminService";
import { toast } from "react-toastify";

export const useAds = () => {
    // implement the hook to get all ads
     const [loading, setLoading] = useState(false);
     const [ads, setAds] = useState([]);

     const getAllAds = async () => {
         setLoading(true);
         try {
            let response = await AdminService.getAllAds();
            console.log(response,"ads");
            setAds(response.data.data.ads);

            console.log(response.data.data.ads);
            
         } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch ads");
            console.log(error);
        }
         finally{
            setLoading(false);
         }
     }
     return {loading, ads, getAllAds};
}