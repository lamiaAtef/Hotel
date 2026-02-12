import { PORTAL_EXPLORE_ROOMS } from "../../../config/api.endPoint";
import { axiosInstance } from "../../../services/httpClient";
import type { ExploreRoomProps } from "../type";

const UserServices ={
    explore : ({page,size,startDate,endDate}:ExploreRoomProps)=>{
        return axiosInstance.get(PORTAL_EXPLORE_ROOMS.GET_EXPLORED_ROOM(page,size,startDate,endDate))
    }
}

// 

export default UserServices