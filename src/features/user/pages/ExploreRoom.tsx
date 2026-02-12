import { Box, Grid, Typography } from '@mui/material';
import { useExplore } from '../hooks/useExplore';
import { useEffect, useState } from 'react';
import altImage from "../../../assets/images/explore/exploreImg.png"
import CustomPagination from '../../admin/shared/CustomPagination';
import { useSearchParams } from 'react-router-dom';

export default function ExploreRoom() {
    // const location = useLocation();
    // const data = location?.state;
    const [searchParams] = useSearchParams();
      // Pagination state
    const [page, setPage] = useState(0); 
    const [rowsPerPage] = useState(9);
    // const [totalCount, setTotalCount] = useState(0);


    const startDate = searchParams.get("startDate")??"";
    const endDate = searchParams.get("endDate")??"";
    // const page = Number(searchParams.get("page")?? 1);
    const size = Number(searchParams.get("size")?? 9);



    const {fetchAllExplored,exploredRoom,totalCount} = useExplore();

    useEffect(()=>{
        if (!startDate || !endDate) return;
        fetchAllExplored(page,size,startDate,endDate);
    },[exploredRoom])

    // if(loading)  return <Stack sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"50vh"}}><RiseLoader color="blue" /></Stack>

  return (
    <>
      <Box sx={{marginBlock:"50px"}}> 
      <Typography className='section_title' variant='h4'>All Rooms</Typography>
        <Grid container spacing={3} >
        {   
            exploredRoom?.length > 0 &&
            (exploredRoom.map(room=>(
                <Grid  key={room._id} size={{md:4 , sm:6}}sx={{position:"relative"}}  className="cardInExplore">
                  <Box
                   component="img"
                   src={room.images[0]|| altImage}

                   alt="room image"
                  sx={{
                    borderRadius:"15px",
                    width:"100%",
                    height:"250px",
                    objectFit:"cover",
                   
                  }}
                   ></Box>
                   <Typography
                    sx={{
                      position:"absolute",
                      bottom: "10px" ,
                      left:"10px",
                      color:"#fff",
                      fontWeight:"bold",
                      textShadow: "0 2px 5px rgba(0,0,0,0.6)",




                    }}
                    variant='body1'
                    >
                    {room.roomNumber}
                   </Typography>
                   <Box 
                    sx={{
                      backgroundColor:" #FF498B",
                      color:"#fff",
                      position:"absolute",
                      top:0,
                      right:0,
                      padding:"10px",
                      borderBottomLeftRadius:"15px",
                      borderTopRightRadius:"15px",
                      width:"25%",
                      height:"40px",


                    }}>
                    <Typography variant='body1'>{room.discount}</Typography>
                   </Box>

                </Grid>
              //  <Typography>{room?.roomNumber}</Typography>

               
            )))
        }
        </Grid>
        <CustomPagination
                page={page}
                rowsPerPage={rowsPerPage}
                rowCount={totalCount}
                onPageChange={(newPage) => setPage(newPage)}
              />
        
      </Box>
    </>
  )
}

