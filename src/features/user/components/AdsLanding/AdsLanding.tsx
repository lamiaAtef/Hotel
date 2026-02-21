import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../../../services/httpClient";
import { ADS_URLS, FAVOURITES_URL } from "../../../../config/api.endPoint";
import { RiseLoader } from "react-spinners";
import { FavoriteBorder, Visibility } from "@mui/icons-material";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/context/AuthContext";



export default function AdsLanding() {
  const{userData}=useContext(AuthContext);
  console.log("userdata",userData);

  const [ads,setAds]=useState([]);

  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const getAllAds=async()=>{
    setLoading(true);
    try {

      const response=await axiosInstance.get(ADS_URLS.GET_ALL_ADS);
      console.log("adssssss",response?.data?.data?.ads);
      setAds(response?.data?.data?.ads);

    } catch (error) {
      console.log(error);

    }
    finally{
      setLoading(false);
    }
  }

  const addToFav=async(id:string)=>{

  console.log(id);


    try {
const response=await axiosInstance.post(FAVOURITES_URL.ADD_TO_FAV,{
  roomId:id
});


console.log(response);
toast.success(response.data.message);
// navigate("/favourites")


}
     catch (error:unknown) {
    toast.error(error.response?.data?.message)

    }

  }

  useEffect(()=>{
    getAllAds();
  },[])
    if(loading)  return <Stack sx={{display:"flex", justifyContent:"center",
     alignItems:"center", height:"50vh"}}>
      <RiseLoader color="blue" />
      </Stack>
  return (
    <>
<Box sx={{my:5}} >
  <Typography variant="h6" sx={{color:"rgba(21, 44, 91, 1)"}}>
  Most popular ads
</Typography>
<Box sx={{my:3}}>
  <Grid container spacing={2}>
<Grid size={{xs:12,md:4}}>
  <Box
sx={{
  height:400,
  width:"100%",
  borderRadius:2,
  overflow:"hidden",
  backgroundColor: "red",
     backgroundImage: `url(${ads[0]?.room?.images?.[0]})`,
     backgroundSize: "cover",
     backgroundPosition: "center",
     position:"relative"
}}
  >
    <Box
    sx={{
      position:"absolute",
      inset:0,
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"rgba(0,0,0,0.4)",
      opacity:0,
      transition:"0.5s",
      "&:hover":{
        opacity:1
      }

    }}
    >


<IconButton  onClick={()=>addToFav(ads[0]?.room?._id)}>
  <FavoriteBorder sx={{color:"white"}}
 />
</IconButton>
<IconButton>
  <Visibility  sx={{color:"white"}}/>
</IconButton>





    </Box>
    </Box>


</Grid>
<Grid size={{xs:12,md:8}}>
  <Box>
<Grid container spacing={2}>
 {ads?.slice(1,5).map((ad)=>(
   <Grid size={{md:6,xs:6}}>
  <Box
  sx={{
  height:190,
  width:"100%",
  borderRadius:2,
  overflow:"hidden",
  backgroundColor: "red",
     backgroundImage: `url(${ad?.room?.images?.[0]})`,
     backgroundSize: "cover",
     backgroundPosition: "center",
     position:"relative"

}}
  >
     <Box
    sx={{
      position:"absolute",
      inset:0,
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"rgba(0,0,0,0.4)",
      opacity:0,
      transition:"0.5s",
      "&:hover":{
        opacity:1
      }

    }}
    >

<IconButton>
  <FavoriteBorder onClick={()=>addToFav(ad?.room?._id)}  sx={{color:"white"}}/>
</IconButton>
<IconButton >
  <Visibility onClick={()=>navigate(`/room_details/${ad?.room?._id}`)} sx={{Color:"white"}}/>
</IconButton>
    </Box>

    </Box>


  </Grid>
 ))}



</Grid>
  </Box>


</Grid>

  </Grid>
</Box>
</Box>
    </>
  )
}
