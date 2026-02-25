import React from 'react'
import HotelStepper from '../components/HotelStepper'
import { Box, Button, Typography } from '@mui/material'
import successImg from "../../../assets/images/success.png"
import { useNavigate } from 'react-router-dom'

export default function PaymentSuccess() {
  let navigate = useNavigate()
  return (
    <>
     <HotelStepper num= {3}/>
     <Typography variant='h2' sx={{textAlign:"center", color:"#152C5B"}}>Yay! Completed</Typography>
      <Box 
        sx={{
          height: "300px", 
          backgroundImage: `url(${successImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: "15px",
          width:"80%",
          margin:"40px auto",

        }} 
      />
     <Typography variant='body2' sx={{color:"#B0B0B0",textAlign:"center"}}>
      We will inform you via email later
      once the transaction has been accepted
     </Typography>
     <Button onClick={()=>navigate("/home")}  variant="contained" sx={{display:"block" , textAlign:"center",margin:"50px auto"}} >Back to Home</Button>

    </>
  )
}
