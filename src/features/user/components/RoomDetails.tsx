import { useEffect, useState } from "react"
import { ROOM_URLS, publicAxios} from "../../../config/api.endPoint";
import type { MyRoomData } from "../type";
import { useParams } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";

import imgFacility1 from "../../../assets/images/roomDetails/ic_bedroom.png";
import imgFacility2 from "../../../assets/images/roomDetails/ic_bathroom.png";
import imgFacility3 from "../../../assets/images/roomDetails/ic_diningroom.png";
import imgFacility4 from "../../../assets/images/roomDetails/ic_livingroom.png";
import imgFacility5 from "../../../assets/images/roomDetails/ic_wifi.png";
import imgFacility6 from "../../../assets/images/roomDetails/ic_ac.png";
import imgFacility7 from "../../../assets/images/roomDetails/ic_ref.png";
import imgFacility8 from "../../../assets/images/roomDetails/ic_tv.png";


export default function RoomDetails() {

  const [roomdetails, setRoomDetails] = useState<MyRoomData | null>(null);
  const {roomId} = useParams();


   const getRoomDetails =async()=>{
    try {
      const response = await publicAxios.get(ROOM_URLS.GET_ROOM_DETAILS(roomId!));
      console.log(response.data?.data?.room);
      
      setRoomDetails(response.data?.data?.room);
      
    } catch (error) {
      console.log(error); 
      
    }
   }

   useEffect(()=>{

    getRoomDetails();

   },[])
  return (
    <>
      <Box component="div" sx={{ marginY: 3, mx:5 }}>
        <Typography variant="h5" sx={{mb:2, fontWeight:"bold"}}> Room Details</Typography>
        <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gridTemplateRows: "repeat(2, 200px)",
                    gap: 2,
        }}>
          {roomdetails?.images.slice(0,3).map((img,index)=>(
            <Box key={index} component="img" src={img} alt="roomImage"
            sx={{gridRow: index ===0 ? "span 2" : "auto", 
            width: "100%", height:"100%", objectFit:"cover", borderRadius:2}}/>

          ))}
           </Box>

          <Grid container spacing={2} sx={{my:5}} >
            <Grid size={8}>
            <Typography variant="body1" className="textGray">
            Minimal techno is a minimalist subgenre of techno music. 
            It is characterized by a stripped-down aesthetic that exploits
            the use of repetition and understated development. Minimal techno 
            is thought to have been originally developed in the early 1990s by 
            Detroit-based producers Robert Hood and Daniel Bell.
            </Typography>
            <Typography variant="body1" className="textGray" sx={{my:2}}>
             Such trends saw the demise of the soul-infused techno that typified
             the original Detroit sound. Robert Hood has noted that he and Daniel
              Bell both realized something was missing from techno in the post-rave era.
            </Typography>
            <Typography variant="body1" className="textGray">
             Design is a plan or specification for the construction of an object or system
             or for the implementation of an activity or process, or the result of that plan
             or specification in the form of a prototype, product or process. The national agency
             for design: enabling Singapore to use design for economic growth and to make lives better.
            </Typography>

            <Stack direction="row" spacing={12} m={4}>
              <Stack spacing={1}>
                <Box component="img" src={imgFacility1} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">5 bedroom</Typography>
              </Stack>

              <Stack spacing={1}>
                <Box component="img" src={imgFacility4} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">1 living room</Typography>
              </Stack>

              <Stack spacing={1}>
                <Box component="img" src={imgFacility2} sx={{width:"50px",height:"50px"}}  alt="facility image"/>
                <Typography variant="body1" className="textGray">3 bathroom</Typography>
              </Stack>

              <Stack spacing={1}>
                <Box component="img" src={imgFacility3} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">1 dining room</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={12} m={4}>

              <Stack spacing={1}>
                <Box component="img" src={imgFacility5} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">10 mbp/s</Typography>
              </Stack>

              <Stack spacing={1}>
                <Box component="img" src={imgFacility6} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">7 unit ready</Typography>
              </Stack>

              <Stack spacing={1}>
                <Box component="img" src={imgFacility7} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">2 refigrator</Typography>
              </Stack>

              <Stack spacing={1}>
                <Box component="img" src={imgFacility8} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">4 television</Typography>
              </Stack>
            </Stack>
            </Grid>

            <Grid size={4} sx={{border:"1px solid #ccc",padding:"30px",borderRadius:"15px"}}>
              <Typography variant="h5">
                Start Booking
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{my:2}}>
                <Typography variant="h4" color="primary">$ {roomdetails?.price}</Typography>
                <Typography variant="h4" color="textDisabled">per night</Typography>
              </Stack>
              <Typography variant="h6" color="error"> Discount {roomdetails?.discount} % off</Typography>
            </Grid>
          </Grid>

      </Box>
    </>
  )
}

