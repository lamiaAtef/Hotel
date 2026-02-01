import  React, { useEffect } from 'react'
import { useBooking } from '../hooks/booking/useBooking'
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import SectionHeader from '../shared/SectionHeader'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {RiseLoader} from "react-spinners"
import CustomDialog from '../components/CustomDialog';
import { useBookingDetails } from '../hooks/booking/useBookingDetails';

export default function Booking() {
  //view modal
  const [viewModal, setviewModal] =  React.useState(false);
  let {booking, loading, fetchBookings} = useBooking()
  let {bookingDetails, fetchBookingDetails} = useBookingDetails()

  useEffect(() => {

    fetchBookings()
    console.log("booking data in page", booking)
  }, [])


  let handleViewDetails = (bookingId: string) => {
    fetchBookingDetails(bookingId)
    setviewModal(true)
    
  }
   if(loading)  return <Stack sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"50vh"}}><RiseLoader color="blue" /></Stack>
  
  return (
    <>
       <SectionHeader title="Booking Table Details" subtitle="You can check all details"/>
        <TableContainer component={Paper} sx={{marginTop:"20px"}}>
        <Table aria-label="booking table">
          <TableHead sx={{backgroundColor:"#ccc"}}>
            <TableRow>
              <TableCell>room Number</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>start Date</TableCell>
              <TableCell>end Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>action</TableCell>
            </TableRow>
          </TableHead>

    <TableBody>
      {booking && booking.length > 0 ? (
        booking.map((row,index) => (
          <TableRow key={row._id} sx={{backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white", // striped effect
          "&:hover": { backgroundColor: "#e0e0e0" }}}>
            <TableCell>{row?.room?.roomNumber}</TableCell>
            <TableCell>{row?.totalPrice}</TableCell>
            <TableCell>{row?.startDate}</TableCell>
            <TableCell>{row?.endDate}</TableCell>
            <TableCell>{row?.user?.userName}</TableCell>
            <TableCell>
              <Stack direction="row" 
                spacing={1} 
                 sx={{cursor:"pointer"}}
                 onClick={() => handleViewDetails(row._id)}
                 
                 >
                <Typography variant='caption' sx={{
                    
                      color:"blue",
                      border: "0.2px solid #203FC7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px", 
                      borderRadius: "50%",
                      }}  >
                  <VisibilityOutlinedIcon fontSize='small'/>
                  
                </Typography>
                <Typography variant='caption'>View</Typography>
              </Stack>
            </TableCell>
            
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3} align="center">
            No Bookings Found
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>

 
</TableContainer>
<CustomDialog open={viewModal} onClose={() => setviewModal(false)} title="Booking Details" maxWidth="md">
 { bookingDetails && console.log("booking details in modal", bookingDetails) }
  {bookingDetails ?
  <Stack spacing={2} >
    <Typography><strong>Room Number:</strong> {bookingDetails?.room?.roomNumber}</Typography>
    <Typography><strong>Price:</strong> {bookingDetails?.totalPrice}</Typography> 
    <Typography><strong>Start Date:</strong> {bookingDetails?.startDate}</Typography>
    <Typography><strong>End Date:</strong> {bookingDetails?.endDate}</Typography>
    <Typography><strong>User Name:</strong> {bookingDetails?.user?.userName}</Typography>
    </Stack>
   :<RiseLoader  color="blue"/>}
</CustomDialog>
</>
  )
}
