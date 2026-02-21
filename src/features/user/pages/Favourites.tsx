import { useEffect, useState } from "react";
import { axiosInstance } from "../../../services/httpClient";
import { FAVOURITES_URL } from "../../../config/api.endPoint";
import { Box, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { RiseLoader } from "react-spinners";
import { FavoriteBorder } from "@mui/icons-material";
import { toast } from "react-toastify";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";


export default function Favourites() {
  const [favRooms,setFavRooms]=useState([]);

  const[loading,setLoading]=useState(false);
  const gteFavRooms=async()=>{
    setLoading(true)
    try {
      const response=await axiosInstance.get(FAVOURITES_URL.GET_MY_FAV_ROOMS);
      console.log("fav",response?.data?.data?.favoriteRooms[0].rooms);
      setFavRooms(response?.data?.data?.favoriteRooms[0].rooms);
      console.log("favvvvvvvvvvvvv");


    } catch (error) {
      console.log(error);

    }
    finally{
      setLoading(false);
    }
  }
  const removeFav=async(id:string)=>{
    console.log(id);

try {
  const response= await axiosInstance.delete(FAVOURITES_URL.DELET_FAV(id),{
   data:{
     roomId:id
   }
   }
   );
   gteFavRooms();
   toast.success(response?.data?.message||"room remove from favvv")
}
catch (error) {
 toast.error(error?.response?.data?.message||"error occured")

}


  }
  useEffect(()=>{
    gteFavRooms();
  },[])
    if(loading)  return <Stack sx={{display:"flex", justifyContent:"center",
       alignItems:"center", height:"50vh"}}>
        <RiseLoader color="blue" />
        </Stack>
  return (
    <>
    <Container>
      <Box>
        <Typography variant="h5" sx={{textAlign:"center",my:2,color:"rgba(21, 44, 91, 1)"}}>Your Favourites</Typography>
      </Box>
      <BreadCrumb link1="Home" link2="Favourites"/>
         <Box>
        <Typography variant="h5" sx={{my:2,color:"rgba(21, 44, 91, 1)"}}>All Rooms</Typography>
      </Box>
      <Grid container spacing={3}>

{favRooms?.map((favRoom:any)=>(

    <Grid size={{md:3,xs:12}} key={favRoom?._id}>
      <Box
      sx={{
        position:"relative",
        width:"100%",
        height:250,
        borderRadius:2,
         mb:2,
         backgroundImage:`url(${favRoom?.images?.[0]})`,
         cursor:"pointer",
         backgroundSize:"cover",



      }}
      >

      </Box>
       <IconButton  onClick={()=>removeFav(favRoom?._id)} sx={{textAlign:"center"}}>
  <FavoriteBorder/>
</IconButton>
<IconButton></IconButton>

    </Grid>



))}



      </Grid>

    </Container>

    </>
  )
}
