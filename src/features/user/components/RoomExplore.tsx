import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import ImageSide from './ImageSide'
import roomExploreImg from "../../../assets/images/explore/exploreImg.png"
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Controller, useForm } from 'react-hook-form';
import NumberSpinner from './NumberSpinner';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import type { ExploreRoomFormValues } from '../type';
import { useNavigate } from 'react-router-dom';

export default function RoomExplore() {

  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState:{errors},
    
  } = useForm<ExploreRoomFormValues>({})

  let onSubmit = (data:any) => {
     const [start, end] = data.dateRange;     
     const payload = {
      page : 1 ,
      size : 9,
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };

  console.log(payload,"payload");
  navigate(`/explore-room?page=${payload.page}&size=${payload.size}&startDate=${payload.startDate}&endDate=${payload.endDate}` )
  
}

  return (
    <>
      <Grid container sx={{marginBlock:"70px"}}>
        <Grid size={{md:8, sm:12,xs:12}} >
            <Typography  sx={{
                fontFamily: "Poppins sans-serif",
                fontWeight: 700 ,
                fontStyle: "Bold" ,
                fontSize: "42px" ,
                color: "#152C5B",
            }}>
                Forget Busy Work,<br/> Start Next Vacation
            </Typography>
            <Typography variant='body2'sx={{
                    fontFamily:  "Poppins sans-serif",
                    fontWeight: 300,
                    fontSize: "16px",
                    color:"#B0B0B0",
                    marginBlock:"10px",
            }}>
                We provide what you need to enjoy your holiday with family.
                 <br/>Time to make another memorable moments.
            </Typography>
            <Box>
                <Typography  variant='h5' className='section_title'>Start Booking</Typography>
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
                    {errors.dateRange && (
                      <Typography color="error" variant="body2">
                        {errors.dateRange.message}
                      </Typography>
                    )}
                  </Box>
                {/* end date controller */}

                    
                    <Box sx={{width:"50%" ,paddingBlock:"30px" }}>
                    <Typography className='section_title' >Capacity</Typography>
                         {/* hena counter ==> isn't required in DB*/}
                           <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        justifyContent: 'center',
                      }}
                    >
                    <NumberSpinner
                      min={1}
                      max={100}
                      size="small"
                      defaultValue={1}
                      error
                    />
                  </Box>
                         {/* end counter */}
                    </Box>  

                    <Button type="submit" variant="contained" sx={{width:"25%",display:"inline-block"}}>Explore</Button> 



                </Box>
            </Box>
        </Grid>
         <Grid size={{md:4, sm:12,xs:12}}>
            <ImageSide imageName={roomExploreImg} xPosition="-50px" yPosition="-50px" borderShape="topLeft"/>
        </Grid>


      </Grid>
    </>
  )
}

