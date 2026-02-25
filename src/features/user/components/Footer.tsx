import {  Box, Container, Grid, Typography } from "@mui/material";


export default function Footer() {
  return (
    <>
   <Container>
       <Grid container
       spacing={2}
       sx={{textAlign:{xs:"center",md:"left"},mt:"40px"}}
      >
   <Grid size={{xs:12,md:3,sm:6}}>
    <Typography variant="h6"  sx={{mb:"5px"}}>
      <span style={{color:"black"}}>Stay</span><span style={{color:" rgba(32, 63, 199, 1)"}}>cation</span>
    </Typography>
    <Typography variant="body2" sx={{lineHeight:"1.8",color:"rgba(176, 176, 176, 1)"}}>
        We kaboom your beauty<br/> holiday
instantly and memorable.
    </Typography>
   </Grid>
   <Grid size={{xs:12,md:3,sm:6}}>
    <Typography variant="h6"  sx={{mb:"5px",color:"rgba(21, 44, 91, 1)"}}>
  For Beginners
    </Typography>
    <Typography variant="body2" sx={{lineHeight:"1.8",color:"rgba(176, 176, 176, 1)"}}>

New Account<br/>
Start Booking a Room<br/>
Use Payments

    </Typography>

   </Grid>
     <Grid size={{xs:12,md:3,sm:6}}>
    <Typography variant="h6"  sx={{mb:"5px",color:"rgba(21, 44, 91, 1)"}}>
Explore Us
    </Typography>
    <Typography variant="body2" sx={{lineHeight:"1.8",color:"rgba(176, 176, 176, 1)"}}>

Our Careers<br/>
Privacy<br/>
Terms & Conditions

    </Typography>

   </Grid>
      <Grid size={{xs:12,md:3,sm:6}}>
    <Typography variant="h6"  sx={{mb:"5px",color:"rgba(21, 44, 91, 1)"}}>
Connect Us
    </Typography>
    <Typography variant="body2" sx={{lineHeight:"1.8",color:'rgba(176, 176, 176, 1)'}}>

support@staycation.id<br/>
021 - 2208 - 1996<br/>
Staycation, Kemang, Jakarta

    </Typography>

   </Grid>



    </Grid>
    <Box>
        <Typography variant="body2" sx={{color:"rgba(176, 176, 176, 1)",textAlign:"center",mt:"35px"}}>
            Copyright 2019 • All rights reserved • Staycation
        </Typography>
    </Box>

   </Container>


    </>
  )
}