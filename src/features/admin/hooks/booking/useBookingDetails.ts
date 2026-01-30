import { useState } from "react";
import AdminService from "../../services/AdminService";
import { toast } from "react-toastify";

const useBookingDetails = () => {
  // Placeholder for booking details logic
  const[bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const fetchBookingDetails = async (bookingId: string) => {
    setLoading(true);   
    try {
        let response = await AdminService.getBookingDetails(bookingId)
        setBookingDetails(response.data.data.booking)

    } catch (error:any) {
        toast.error(error.response?.message || `there is no booking with #_id: ${bookingId}`)

    }
    finally{
        setLoading(false)
    }
  }
  return {bookingDetails, fetchBookingDetails};
}
export { useBookingDetails };