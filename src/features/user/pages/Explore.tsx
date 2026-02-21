import { useEffect, useState } from "react";
import { axiosInstance } from "../../../services/httpClient";

import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Box, Container, Grid } from "@mui/material";


export default function Explore() {
  const[bookingRoom,setBookingRoom]=useState([]);
    const [searchParams] = useSearchParams();

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const getAllRooms=async()=>{
     if (!startDate || !endDate) return;
try {
    const response=await axios.get("https://upskilling-egypt.com:3000/api/v0/portal/rooms/available?",{
    params:{
      page:1,
      size:10,
      startDate:startDate,
      endDate:endDate,
    }
  });
console.log(response);
setBookingRoom(response?.data?.data?.rooms)

} catch (error) {
console.log(error);

}


  }
  useEffect(()=>{
    getAllRooms();
  },[])
  return (
    <>
  <Container>
    <Grid container spacing={2}>
   {bookingRoom?.map((room)=>(
        <Grid size={{md:3,xs:12}} key={room?._id}>
          <Box
          sx={{
            position:"relative",
            width:"100%",
            height:250,
            borderRadius:2,
             mb:2,
             backgroundImage:`url(${room?.images?.[0]})`,
             cursor:"pointer",
             backgroundSize:"cover",



          }}
          >

          </Box>
          </Grid>
   ))}

    </Grid>

  </Container>

    </>
  )
}
