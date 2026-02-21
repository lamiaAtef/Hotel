


import { Container } from '@mui/material'

import AdsLanding from '../components/AdsLanding/AdsLanding'
import Reviews from '../components/Reviews/Reviews'
import BookingUser from '../components/Booking/BookingUser'




export default function UserDashBoard() {
  return (
    <>
    <Container>
      <BookingUser/>

       <AdsLanding/>
       <Reviews/>

    </Container>


     {/* <Rate/> */}

    </>
  )
}
