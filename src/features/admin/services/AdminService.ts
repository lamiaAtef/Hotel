import { get } from "react-hook-form"
import { ADMIN_URLS } from "../../../config/api.endPoint"
import { axiosInstance } from "../../../services/httpClient"

const AdminService = {
    getAllRooms: () => {
        return axiosInstance.get(ADMIN_URLS.ALL_ROOMS)
    },
    getAllAds: () => {
        return axiosInstance.get(ADMIN_URLS.ALL_ADS)
    },
    getAllFacilities: () => {
        return axiosInstance.get(ADMIN_URLS.ALL_FACILITIES)
    },
    getDashboardStats: () => {
        return axiosInstance.get(ADMIN_URLS.DASHBOARD)
    },
    getAllBookings: () => {
        return axiosInstance.get(ADMIN_URLS.GET_ALL_BOOKINGS)
    },
    getBookingDetails: (bookingId: string) => {
        return axiosInstance.get(ADMIN_URLS.GET_BOOKING_DETAILS(bookingId))
    },

   
}
export default AdminService