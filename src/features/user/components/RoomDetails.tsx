import { useEffect, useMemo, useState } from "react"
import { ROOM_URLS, USER_URLS, publicAxios} from "../../../config/api.endPoint";
import type { bookingPayload, ExploreRoomFormValues, MyRoomData } from "../type";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import imgFacility1 from "../../../assets/images/roomDetails/ic_bedroom.png";
import imgFacility2 from "../../../assets/images/roomDetails/ic_bathroom.png";
import imgFacility3 from "../../../assets/images/roomDetails/ic_diningroom.png";
import imgFacility4 from "../../../assets/images/roomDetails/ic_livingroom.png";
import imgFacility5 from "../../../assets/images/roomDetails/ic_wifi.png";
import imgFacility6 from "../../../assets/images/roomDetails/ic_ac.png";
import imgFacility7 from "../../../assets/images/roomDetails/ic_ref.png";
import imgFacility8 from "../../../assets/images/roomDetails/ic_tv.png";
import { Controller, useForm } from "react-hook-form";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UserServices from "../services/userService";
import altRoomImg from "../../../assets/images/altRoomImg.png"
import { useAuth } from "../../auth/hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";



export default function RoomDetails() {

  const [roomdetails, setRoomDetails] = useState<MyRoomData | null>(null);
      const { userData } = useAuth();
  
  const navigate = useNavigate()
  const location = useLocation();
  const {roomId} = useParams();
    const {
    control,
    handleSubmit,
    formState:{errors},
    
  } = useForm<ExploreRoomFormValues>({})
  // useMemo
  // بعد const [roomdetails, setRoomDetails] = useState<MyRoomData | null>(null);
const displayImages = useMemo(() => {
  const images = roomdetails?.images || [];
  const totalImages = images.length;
  const result = [];
  
  for (let i = 0; i < 3; i++) {
    if (i < totalImages) {
      result.push(images[i]);
    } else {
      result.push(altRoomImg);
    }
  }
  return result;
}, [roomdetails]);
  // end useMemo
  
    let onSubmit = (data:any) => {
      if(!userData && userData?.role !== "user" ) {
        Swal.fire({
      title: "To continue with your booking, you need to sign up or log in to your account first.",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Login",
      denyButtonText: `Register`
}).then((result) => {
  if (result.isConfirmed) {
    navigate("/auth/login" ,{ state: { from: location }})
  } else if (result.isDenied) {
    navigate("/auth/register",{ state: { from: location }})
    
  }
})
        
}
else{ 

       const [start, end] = data.dateRange; 
        let price = roomdetails?.price || 100;

       
      
       let startDate= start.toISOString().split("T")[0];
       let endDate =  end.toISOString().split("T")[0];
        let days_number =  Math.ceil((end - start) / (1000 * 60 * 60 * 24));

       console.log(days_number,"days_number")

       const payload = {
        startDate: startDate,
        endDate: endDate,
        room :roomdetails?._id, 
        totalPrice : (price * days_number) * ((roomdetails?.discount || 20)/100),
       
      };
      
     
  
    console.log(payload,"payload");
    createBooking(payload);
    
  }
}

  let createBooking = async(data:bookingPayload) => {
     try{
      let response = await UserServices.booking(data)
      console.log(response,"response")
      navigate(`/hotel-booking?roomId=${roomId}&startDate=${data.startDate}&endDate=${data.endDate}&price=${ roomdetails?.price }&discount=${roomdetails?.discount}&totalPrice=${data.totalPrice}`,{state:{bookingId:  response.data.data.booking._id}} )

    }
    catch(error)
    {
      console.log(error)
    }
  }


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
  }}
>
  {displayImages.map((img, index) => (
    <Box
      key={index}
      component="img"
      src={img}
      sx={{
        gridRow: index === 0 ? "span 2" : "auto",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 2
      }}
    />
  ))}
</Box>
         
           

          <Grid container spacing={2} sx={{my:5}} >
            <Grid size={{lg:8 , md:12}}>
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

            <Grid container  >
              <Grid size={{md:3,xs:6}} sx={{marginBlock:"15px"}} >
                <Box component="img" src={imgFacility1} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">5 bedroom</Typography>
              </Grid>

              <Grid size={{md:3,xs:6}} sx={{marginBlock:"15px"}} >
                <Box component="img" src={imgFacility4} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">1 living room</Typography>
              </Grid>

              <Grid size={{md:3,xs:6}} sx={{marginBlock:"15px"}} >
                <Box component="img" src={imgFacility2} sx={{width:"50px",height:"50px"}}  alt="facility image"/>
                <Typography variant="body1" className="textGray">3 bathroom</Typography>
              </Grid>

              <Grid size={{md:3,xs:6}} sx={{marginBlock:"15px"}} >
                <Box component="img" src={imgFacility3} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">1 dining room</Typography>
              </Grid>

              <Grid size={{md:3,xs:6}} sx={{marginBlock:"15px"}}>
                <Box component="img" src={imgFacility5} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">10 mbp/s</Typography>
              </Grid>

              <Grid size={{md:3,xs:6}} sx={{marginBlock:"15px"}}>
                <Box component="img" src={imgFacility6} sx={{width:"50px",height:"50px"}} alt="facility image"/>
                <Typography variant="body1" className="textGray">7 unit ready</Typography>
              </Grid>
              
            </Grid>
            </Grid>
            {/* end images and start booking */}
            <Grid size={{lg:4 ,md:12}} sx={{border:"1px solid #ccc",padding:"30px",borderRadius:"15px"}}>
              <Typography variant="h5">
                Start Booking
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{my:2}}>
                <Typography variant="h4" color="primary">$ {roomdetails?.price}</Typography>
                <Typography variant="h4" color="textDisabled">per night</Typography>
              </Stack>
              <Typography variant="h6" color="error"> Discount {roomdetails?.discount} % off</Typography>
             <Box component="form" onSubmit={handleSubmit(onSubmit)} >
                   <Typography className='section_title'>Pick a Date</Typography>
                    <Box sx={{width:"50%",display:"flex"}}>
                         {/* <DateRangePicker minDate={dayjs()} onChange={onChange} value={value} />
                          */}
                          <Typography variant='caption' sx={{background: "#152C5B",color:"#fff",display:"inline-block",height:"auto",padding:"8px"}}>
                            <CalendarMonthIcon/>
                          </Typography>
                      <Controller
                          name="dateRange"
                          control={control}
                          
                          rules={{
                            required: "Date range is required",
                          
                          }}
                       render={({ field }) => (
                        <DateRangePicker
                          {...field}
                          minDate={new Date()}
                          onChange={field.onChange}
                          value={field.value}
                          className="custom_width"
                          
                          
                      />
                      )}
                    />
                    </Box>
                    {errors.dateRange && (
                      <Typography color="error" variant="body2" >
                        {errors.dateRange.message}
                      </Typography>
                    )}
                  
                {/* end date controller */}

                    
                   

                    <Button type="submit" variant="contained" sx={{width:"80%",display:"inline-block",marginBlock:"20px"}}>Continue Book</Button> 



                </Box>
            </Grid>
            
          </Grid>
         

      </Box>
    </>
  )
}

