import { Grid, Stack, Typography } from '@mui/material'
import HotelStepper from '../components/HotelStepper'
import { Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import StripeProvider, { stripePromise } from '../components/payment/StripeProvider';
import { useEffect } from 'react';
import PaymentElementForm from '../components/payment/PaymentElementForm';
import { toast } from 'react-toastify';
import CheckOutForm from '../components/payment/CheckOutForm';
import { useAuth } from '../../auth/hooks/useAuth';
// import PaymentElementForm from '../components/payment/PaymentElementForm';
// import { Elements } from '@stripe/react-stripe-js';
// import { stripePromise } from '../components/payment/StripeProvider';

export default function PaymentPage() {
  let [searchParams] = useSearchParams ();
  let roomId = searchParams.get("roomId");
  let startDate = searchParams.get("startDate");
  let endDate = searchParams.get("endDate");
  let price = searchParams.get("price");
  let discount = searchParams.get("discount");
  let total = searchParams.get("totalPrice");

const location = useLocation();
const bookingId = location.state?.bookingId;
let navigate = useNavigate()
const { userData } = useAuth();

if (userData && userData?.role !== "user") return <Navigate to="/notFound" />; 


  return (
    <>
      <HotelStepper num= {1}/>
      <Stack sx={{textAlign:"center"}}>
        <Typography variant='h4' sx={{color: "#152C5B"}}>Payment </Typography>
        <Typography variant='body1' sx={{color: "#B0B0B0"}}>Kindly follow the instructions below</Typography>
      </Stack>
      <Grid container sx={{marginBlock:"50px"}}>
        <Grid size={{xs:12,md:12 , lg:6}}>
            <Typography variant='body1' sx={{marginBlock:"10px"}}>room Id : {roomId}</Typography>
            <Typography variant='body1' sx={{marginBlock:"10px"}}>start Date :  {startDate}</Typography>
            <Typography variant='body1' sx={{marginBlock:"10px"}}>end Date : {endDate}</Typography>
            <Typography variant='body1' sx={{marginBlock:"10px"}}>price : {price} $</Typography>
            <Typography variant='body1' sx={{marginBlock:"10px"}}>discount : {discount} %</Typography>
            <Typography variant="body1" sx={{ marginBlock: "10px" }}>
              Total Price : 
              <Typography component="span" variant="h6" sx={{ color: "#1ABC9C", marginLeft: 1 }}>
                {total} $
              </Typography>
            </Typography>
        </Grid>
        <Grid size={{xs:12,md:12, lg:6}}>
            <Elements stripe={stripePromise}>
              <CheckOutForm  bookingId={bookingId}/>
            </Elements>
        </Grid>

      </Grid>
      
    </>
  )
}
