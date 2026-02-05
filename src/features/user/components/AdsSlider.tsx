import { useEffect, useState } from 'react'
import type { MyAdsPayload } from '../type';
import { USER_URLS, publicAxios } from '../../../config/api.endPoint';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Box } from '@mui/material';

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


export default function AdsSlider() {

    const [adsList, setAdsList] = useState<MyAdsPayload []>([]);

    const getAllAds =async ()=>{
        try {
          const response = await publicAxios.get(USER_URLS.GET_ALL_ADS);
            setAdsList(response.data.data.ads);
            
        } catch (error) {
            console.log(error);         
        }
    }

    useEffect(()=>{
        getAllAds();

    },[]);
  return (
    <>

    <Box component="div" sx={{marginX: "20px", marginBottom:"20px"}}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Ads
        </Typography>
    </Box>

    <Box sx={{position:"relative"}}>    
    <Swiper
    slidesPerView={4}
    spaceBetween={20}
    loop={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next"
    }}
    modules={[Autoplay, Pagination, Navigation]}
    breakpoints={{
        320:{slidesPerView: 1},
        768: {slidesPerView: 2},
        1024: {slidesPerView: 4}
      }}
    className="mySwiper">

   {adsList.filter(ad => ad.isActive).map((ads)=>(
    <Box sx={{marginX: "3rem"}}>
        <SwiperSlide key={ads._id}>
            <Card sx={{  width:"100%" ,border:"none", boxShadow:"none",marginBottom:"5px" }}>
                <CardMedia
                    sx={{ height: 180 }}
                    image={ads.room.images[0]}
                    title="room image"   
                />
                <CardContent>
                    <Typography variant="h6">
                    <strong>Room:</strong> {ads.room.roomNumber}
                    </Typography>
                    <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary' }}>
                      <strong>Capacity:</strong> {ads.room.capacity}
                    </Typography>
                </CardContent>
            </Card>

        </SwiperSlide>
    </Box>

    ))}

    </Swiper>

    {/* Custom Navigation */}
      <ArrowBackIosNewIcon
        className="custom-prev"
        sx={{
          position: "absolute",
          top: "30%",
          left: 20,
          zIndex: 10,
          cursor: "pointer",
          color: "black",
          fontSize: 30,
          transform: "translateY(-50%)",
        }}
      />
      <ArrowForwardIosIcon
        className="custom-next"
        sx={{
          position: "absolute",
          top: "30%",
          right: 20,
          zIndex: 10,
          cursor: "pointer",
          color: "black",
          fontSize: 30,
          transform: "translateY(-50%)",
        }}
      />

     </Box>
      
    </>
  )
}
