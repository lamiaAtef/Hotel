import { useState } from "react";
import AdminService from "../../services/AdminService";
import { toast } from "react-toastify";

export const useFacility = () => {
    // implement the hook to get all facilities
     const [loading, setLoading] = useState(false);
     const [facility, setFacility] = useState([]);

     const getAllFacility = async () => {
         setLoading(true);
         try {
            let response = await AdminService.getAllFacilities();
            console.log(response,"facility");
            setFacility(response.data.data.facilities);

            console.log(response.data.data.facilities);
            
         } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch facilities");
         }
         finally{
            setLoading(false);
         }
     }
     return {loading, facility, getAllFacility};
}