import { Box, Button, Grid, Rating, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../auth/hooks/useAuth';

export default function CommentsRates() {
 const[roomDetails,setRoomDetails]=useState([]);
  const [rate, setRate] = useState(0);
  const {roomId} = useParams();
    const { userData } = useAuth();
  

  const[message,setMessage]=useState("");
  const[review,setReview]=useState("");

  console.log("roomid",roomId);

  console.log(useParams());

  const handelSendComment=async()=>{
    console.log("roomidddddddd",roomId);
    console.log(message);
    if(!roomId) return;
    try {

   const response=await axios.post("https://upskilling-egypt.com:3000/api/v0/portal/room-comments",{
        roomId:roomId,
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
       console.log("roomid",roomId);
    console.log(message);
    if(!roomId) return;
    try {

   const response = await axios.post("https://upskilling-egypt.com:3000/api/v0/portal/room-reviews",{
        roomId:roomId,
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
 if (!userData && userData?.role !== "user") return <></>
  return (
    <>
    
    <Grid container spacing={2} >
  <Grid size={{xs:12,md:6}} >
 <Box sx={{marginLeft:"50px"}}>
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
  width:"70%",
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
 <Box sx={{my:3,marginLeft:"50px"

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
  width:"70%",
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
      
    </>

  )
}
