import { Stack, Typography } from '@mui/material'
import HotelStepper from '../components/HotelStepper'

export default function PaymentPage() {
  return (
    <>
      <HotelStepper num= {1}/>
      <Stack>
        <Typography variant='h4' sx={{color: "#152C5B"}}>Payment </Typography>
        <Typography variant='body1' sx={{color: "#B0B0B0"}}>Kindly follow the instructions below</Typography>
      </Stack>
      
    </>
  )
}
