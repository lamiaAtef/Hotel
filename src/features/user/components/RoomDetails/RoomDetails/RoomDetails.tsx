import { useParams } from "react-router-dom"


import React, { useEffect, useState } from "react";
import axios from "axios";
import {  Box, Button, Container,  Grid,  Rating,  TextField,  Typography } from "@mui/material";
import big from "../../../../../assets/images/big.png";
import small from "../../../../../assets/images/small.png";
import pc from "../../../../../assets/images/pc.png"
import { toast } from "react-toastify";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import DateRangeSingleInput from "../../MyDatePicker/MyDatePicker";




export default function RoomDetails() {



  const[roomDetails,setRoomDetails]=useState([]);
  const [rate, setRate] = useState(0);
  const{id}=useParams();
  console.log("roomid",id);
  console.log(useParams());
  const[message,setMessage]=useState("");
  const[review,setReview]=useState("");


  const getRoomDetails=async(id:string)=>{
    try {
      const response=await axios.get(`https://upskilling-egypt.com:3000/api/v0/portal/rooms/${id}`,{
        headers:{
          Authorization:` Bearer ${localStorage.getItem("userToken")}`

          }

      });

      console.log("roooom details",response?.data?.data);
      setRoomDetails(response?.data?.data)



    } catch (error) {
      console.log(error);

    }


  }
  const handelSendComment=async()=>{
    console.log("roomid",id);
    console.log(message);
    if(!id) return;
    try {

   const response=await axios.post("https://upskilling-egypt.com:3000/api/v0/portal/room-comments",{
        roomId:id,
        comment:message,
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
      }
    );
      toast.success(response?.data?.message);
      setMessage("");
    } catch (error) {
toast.error(error?.response?.data?.message)

    }

  }
  const handelReview=async()=>{
       console.log("roomid",id);
    console.log(message);
    if(!id) return;
    try {

   const response=await axios.post("https://upskilling-egypt.com:3000/api/v0/portal/room-reviews",{
        roomId:id,
        rating:rate,
     review:review,
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
      }
    );
      toast.success(response?.data?.message);
      setMessage("");
    } catch (error) {
toast.error(error?.response?.data?.message)

    }

  }

  useEffect(()=>{
    if(id){
 getRoomDetails(id);
    }

  },[])
  return (
    <>
    <Container>
      <Typography variant="h4" sx={{textAlign:"center",color:"rgba(21, 44, 91, 1)"}}>{roomDetails?.room?.roomNumber}</Typography>
      <BreadCrumb link1="Home" link2="Room Details"/>
<Grid container spacing={2} sx={{my:3}}>
  <Grid size={{xs:12,md:6}}>
    <Box
    sx={{
  height:400,
  width:"100%",
  borderRadius:2,
  overflow:"hidden",
  backgroundColor: "red",
     backgroundImage: `url(${big})`,
     backgroundSize: "cover",
     backgroundPosition: "center",

}}
    >
    </Box>
  </Grid>
  <Grid size={{xs:12,md:6}}>

    <Grid container spacing ={2}>
        <Grid size={{xs:12,md:12}}>
        <Box
    sx={{
  height:190,
  width:"100%",
  borderRadius:2,
  overflow:"hidden",
  backgroundColor: "red",
     backgroundImage: `url(${small})`,
     backgroundSize: "cover",
     backgroundPosition: "center",

}}>
        </Box>

      </Grid>
       <Grid size={{xs:12,md:12}}>
        <Box
    sx={{
  height:190,
  width:"100%",
  borderRadius:2,
  overflow:"hidden",
  backgroundColor: "red",
     backgroundImage: `url(${pc})`,
     backgroundSize: "cover",
     backgroundPosition: "center",

}}>
        </Box>

      </Grid>
    </Grid>


  </Grid>


</Grid>
{/* start booking */}
<Box sx={{my:3}}>
  <Grid container spacing={2}>
  <Grid size={{md:8,xs:12}}>
paragggggggggggggggggggggggggj
  </Grid>
   <Grid size={{md:4,xs:12}}>
<Box  sx={{border:"1px solid rgba(229, 229, 229, 1)",
borderRadius:"5px"
,padding:5,
overflow:"visible",
position:"relative",
  width:"80%"
  }}>
 <Typography variant="h6"sx={{
  fontWeight:500,
  size:"20px",
  color:"rgba(21, 44, 91, 1)"
 }}> Start Booking</Typography>
 <Typography variant="body1">  ${roomDetails?.room?.price}  Per night</Typography>
  <Typography variant="body1" sx={{color:"rgba(255, 22, 18, 1)"}}> Discount ${roomDetails?.room?.discount}% off</Typography>

<DateRangeSingleInput/>

</Box>
  </Grid>
</Grid>
</Box>
{/* end booking */}
{/* start comment and rate */}
<Grid container spacing={2}>
  <Grid size={{xs:12,md:6}}>
 <Box sx={{my:3}}>
     <Typography variant="h5" sx={{color:"rgba(21, 44, 91, 1)"}}>Rate</Typography>
    <Rating
  value={rate}
  precision={0.5}
   onChange={(e)=>{
    setRate(e.target.value)
  }}
/>
<Typography variant="h6" sx={{color:"rgba(21, 44, 91, 1)"}}>Message</Typography>
     <TextField

value={review}
  multiline
  rows={2}
  onChange={(e)=>{
    setReview(e.target.value)
  }}

sx={{
  width:300,
  display:"flex",
  justifyContent:"center",

  "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#f9fafb", // لون الخلفية
      "& fieldset": {
        borderColor: "rgba(21, 44, 91, 1)", // لون البوردر
      },

      "&.Mui-focused fieldset": {
        borderColor: "rgba(21, 44, 91, 1)", // لون البوردر وقت الفوكس
      },
    },

}}
/>
<Button variant="contained"
size="small"
 sx={{backgroundColor:"rgba(50, 82, 223, 1)",color:"white",my:2 ,textTransform:"none",
  width:"120px",
 }}
  onClick={handelReview}>Rate</Button>
 </Box>
  </Grid>
  <Grid size={{xs:12,md:6}}>
 <Box sx={{my:3,

 }}>
     <Typography variant="h6" sx={{color:"rgba(21, 44, 91, 1)"}}>Add your comment</Typography>
     <TextField
value={message}
  multiline
  rows={2}
  onChange={(e)=>{
    setMessage(e.target.value)
  }}

sx={{
  width:300,
  mt:5,

  "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#f9fafb", // لون الخلفية
      "& fieldset": {
        borderColor: "rgba(21, 44, 91, 1)", // لون البوردر
      },

      "&.Mui-focused fieldset": {
        borderColor: "rgba(21, 44, 91, 1)", // لون البوردر وقت الفوكس
      },
    },

}}
/>
<br/>
<Button
size="small"
variant="contained"  sx={{backgroundColor:"rgba(50, 82, 223, 1)",color:"white",my:2,width:"120px",

  textTransform:"none",

}}
onClick={handelSendComment}> send</Button>

 </Box>
  </Grid>

</Grid>
    </Container>

    </>
  )
}