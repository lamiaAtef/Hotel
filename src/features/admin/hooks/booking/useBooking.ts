import { useState } from "react"
import AdminService from "../../services/AdminService"
import { toast } from "react-toastify"



export const useBooking =  () => {
 let [booking, setBooking] = useState([])
 let [loading, setLoading] = useState(false)

 const fetchBookings = async() => {
 setLoading(true)
 try{
    let response = await AdminService.getAllBookings()
    setBooking(response.data.data.booking)   
    console.log("booking data",response.data.data.booking)

 }
 catch(error:any){
    console.log("Error while fetching booking data", error)
    toast.error("Error while fetching booking data")
  }
   finally{ setLoading(false)}

 }
return {booking, loading, fetchBookings}   
}