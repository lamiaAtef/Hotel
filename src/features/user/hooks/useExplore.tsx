import { useState } from "react";
import UserServices from "../services/userService";
import type { ExploreRoomProps } from "../type";
import { toast } from "react-toastify";

export const useExplore = () => {
     const [loading, setLoading] = useState(false);
     const[exploredRoom,setExploredRoom] = useState([]);
     const[totalCount,setTotalCount] = useState(0)

     const fetchAllExplored = async(page:number,size:number,startDate:string|Date,endDate:string|Date) => {
        setLoading(true)
        console.log("ana in fetchAllExplored",page,size,startDate,endDate)
        try{
            let response = await UserServices.explore({page,size,startDate,endDate})
             setExploredRoom(response.data.data.rooms)
            setTotalCount(response.data.data.totalCount)

        }
        catch(error:any){
            console.log(error,"error")
            toast.error(error?.response?.data?.message || "error in loading");
        }
        finally{
            setLoading(false)
        }
     }
     return {fetchAllExplored,loading,exploredRoom,totalCount}

}