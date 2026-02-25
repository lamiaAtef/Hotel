import { useState } from "react";
import AdminService from "../../services/AdminService";
import { toast } from "react-toastify";

export const useGetAllRooms = () => {
    // implement the hook to get all rooms
     const [loading, setLoading] = useState(false);
     const [rooms, setRooms] = useState([]);

     const getAllRooms = async () => {
         setLoading(true);
         try {
            let response = await AdminService.getAllRooms();
            console.log(response,"rooms");
            setRooms(response.data.data.rooms);

            console.log(response.data.data.rooms);
            
         } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch rooms");
         }
         finally{
            setLoading(false);
         }
     }
     return {loading, rooms, getAllRooms};
}