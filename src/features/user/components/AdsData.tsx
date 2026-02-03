import { useEffect, useState } from "react";
import { ADS_URLS } from "../../../config/api.endPoint"
import { axiosInstance } from "../../../services/httpClient"
import { Box, Typography } from "@mui/material";
import type { MyAdsPayload } from "../type";


export default function AdsData() {

    const [adsList,setAdsList]= useState<MyAdsPayload []>([]);

    const getAllAds =async()=>{
        try {
            const response = await axiosInstance.get(ADS_URLS.GET_ALL_ADS);
            // console.log(response.data.data.ads[1].room.images[0]);
            setAdsList(response.data.data.ads);
            
            
        } catch (error) {
            console.error(error);
            
        }

    }

    useEffect(()=>{
        getAllAds();

    },[])


    const images: string[] = [];
    adsList.forEach((ad) => {
        if (ad.isActive) {
        images.push(...ad.room.images);
        }
    });

  return (
    <>

    {/* <Grid container spacing={2}>
      {adsList.map((ads) => (
        <Grid key={ads._id}>
            {ads.isActive &&(
          ads.room.images.length > 0 ? (
            ads.room.images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt="room"
                sx={{
                  width: "100%",
                  height: 300,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            ))
          ): (
            <Box
              sx={{
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#eee",
                borderRadius: 2,
              }}
            >
              No Image
            </Box>
          ))}
        </Grid>
      ))}
    </Grid> */}
   <Box component="div" sx={{margin:3}}>
    <Typography variant="h5"> Most popular ads</Typography>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gridTemplateRows: "repeat(2, 200px)",
        gap: 2,
      }}>
      {/* العمود الأول صورة كبيرة */}
      {images[0] && (
        <Box
          component="img"
          src={images[0]}
          alt="room"
          sx={{
            gridRow: "span 2",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 2,
          }}
        />
      )}

      {/* العمود الثاني */}
      {images[1] && (
        <Box
          component="img"
          src={images[1]}
          alt="room"
          sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
        />
      )}
      {images[2] && (
        <Box
          component="img"
          src={images[2]}
          alt="room"
          sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
        />
      )}

      {/* العمود الثالث */}
      {images[3] && (
        <Box
          component="img"
          src={images[3]}
          alt="room"
          sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
        />
      )}
      {images[4] && (
        <Box
          component="img"
          src={images[4]}
          alt="room"
          sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
        />
      )}
    </Box>

    </Box>


   
    </>
  )
}
