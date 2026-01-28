import { Box, Grid, Typography } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useGetAllRooms } from '../hooks/rooms/useGetAllRooms';
import { useEffect } from 'react';
import { useFacility } from '../hooks/facility/useFacility';
import { useAds } from '../hooks/ads/useAds';
import { useCharts } from '../hooks/chartDashboard/useCharts';
import RoomChart from '../components/RoomChart';
import UserChart from '../components/UserChart';

export default function AdminDashBoard() {
 
  let {chart, getAllChart} = useCharts();
  useEffect(()=>{
   
    getAllChart();
    
  },[]) 

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}  className='dashboard_box'>
            <Box>
              <Typography variant='h6'>
                {chart?.rooms}
                
              </Typography>
              <Typography variant='body2'>
                 Rooms
              </Typography>
            </Box>
            <Box className='dashboard_icon'>
              <WorkOutlineIcon sx={{color:"#203FC7"}}/>
            </Box>

        </Grid>
        <Grid size={{ xs: 12, md: 4 }} className='dashboard_box'>
            <Box>
              <Typography variant='h6'>
                {chart?.facilities}

              </Typography>
              <Typography variant='body2'>
                 Facilities
              </Typography>
            </Box>
            <Box className='dashboard_icon'>
              <WorkOutlineIcon sx={{color:"#203FC7"}}/>
            </Box>

        </Grid>
         <Grid size={{ xs: 12, md: 4 }} className='dashboard_box'>
            <Box>
              <Typography variant='h6'>
                {chart?.ads}
              </Typography>
              <Typography variant='body2'>
                 Ads
              </Typography>
            </Box>
            <Box className='dashboard_icon'>
              <WorkOutlineIcon sx={{color:"#203FC7"}}/>
            </Box>

        </Grid>
      </Grid>
      {/* chart section */}
      <Grid container spacing={2} sx={{marginTop:"20px"}}>
        <Grid size={{ xs: 12, md: 6 }} >
          {/* <h3>{chart?.bookings?.pending}</h3>
          <h3>{chart?.bookings?.completed}</h3> */}
          <RoomChart data={[
            {"category":"pending","value":chart?.bookings?.pending},
            {"category":"completed","value":chart?.bookings?.completed},
            ]} />
        </Grid>
         <Grid size={{ xs: 12, md: 6 }} >
          {/* {chart?.users?.user}
          {chart?.users?.admin} */}
          <UserChart data={[
            {"category":"user","value":chart?.users?.user},
            {"category":"admin","value":chart?.users?.admin},
            ]} />
          {/* <UserChart data={chart?.users}/> */}
        </Grid>
      </Grid>

    </>
  )
}
