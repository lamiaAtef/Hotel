

import {  Box, Container, Grid, Rating, Typography} from '@mui/material'
import { useEffect, useState } from 'react'

import { axiosInstance } from '../../../../services/httpClient';
import { REVIEWS_URL } from '../../../../config/api.endPoint';
import { toast } from 'react-toastify';
import family_pc from "../../../../assets/images/family_pic.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function Reviews() {

  const[reviews,setReviews]=useState([]);
  const getAllReviews=async()=>{
    try {
      const response=await axiosInstance.get(REVIEWS_URL.GET_ALL_REVIEWES);
      console.log(response?.data?.data?.roomReviews);

      setReviews(response?.data?.data?.roomReviews);

    } catch (error) {
   toast.error(error?.response?.data?.data?.message||"error occured");
    }
  }
  useEffect(()=>{

    getAllReviews();
  },[])


  return (
    <>
    <Container>
      <Grid container spacing={5} sx={{my:5}}>
        <Grid size={{xs:12,md:3}}>
          <Box
          sx={{
            border:"1px solid gray",
            height:350,
            width:"100%",
            borderRadius:3,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",

          }}
          >
<Box component="img"
src={family_pc}
sx={{
  width:"100%",
  height:"100%",
  objectFit:"cover",
  transform:"translate(20px,20px)"
}}

>

</Box>

          </Box>

        </Grid>
        <Grid size={{xs:12,md:9}}>
   <Box sx={{ paddingBottom: "60px" }}>


          <Swiper
            style={{
              height:350,
         }}

        modules={[Navigation, Pagination,Autoplay]}
        navigation
        autoplay={{
          delay:2000,
          disableOnInteraction:false,
        }}
        loop={true}


      >


{reviews?.map((review)=>(
    <SwiperSlide key={review._id} style={{
      display:"flex",
      alignItems:"center",
      marginLeft:"20px"

    }} >
     <Box sx={{ml:5,color:"rgba(21, 44, 91, 1)"}}  >
      <Typography variant='h5'>{review?.review}</Typography>
      <br/>
      <Rating value={review?.rating} readOnly/>
      <Typography variant="h5">What a great trip with my family and<br/>
I should try again next time soon ...</Typography>
     </Box>
    </SwiperSlide>
))}

</Swiper>


   {/* <Stack className='swiper-prev'>
            <ArrowBackIos/>

          </Stack>
            <Stack className='swiper-prev'>
            <ArrowForwardIos/>

          </Stack> */}

</Box>





        </Grid>


      </Grid>

    </Container>

    </>
  )
}
