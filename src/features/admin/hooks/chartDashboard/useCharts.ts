import { useState } from "react";
import AdminService from "../../services/AdminService";
import { toast } from "react-toastify";

export const useCharts = () => {
    // implement the hook to get all facilities
     const [loading, setLoading] = useState(false);
     const [chart, setChart] = useState([]);

     const getAllChart = async () => {
         setLoading(true);
         try {
            let response = await AdminService.getDashboardStats();
            console.log(response,"chart");
            setChart(response.data.data);
            console.log(response.data.data);
            
         } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch data in Chart");
         }
         finally{
            setLoading(false);
         }
     }
     return {loading, chart, getAllChart};
}