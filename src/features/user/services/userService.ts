import { PORTAL_EXPLORE_ROOMS, USER_URLS } from "../../../config/api.endPoint";
import { axiosInstance } from "../../../services/httpClient";
import type { bookingPayload, ExploreRoomProps } from "../type";

const UserServices ={
    explore : ({page,size,startDate,endDate}:ExploreRoomProps)=>{
        return axiosInstance.get(PORTAL_EXPLORE_ROOMS.GET_EXPLORED_ROOM(page,size,startDate,endDate))
    },
    booking : (data:bookingPayload) =>{
        return axiosInstance.post(USER_URLS.POST_BOOKING,data)
    },
}

// 

export default UserServices