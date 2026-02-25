import Slider from "./Slider"

import hotel_1 from "../../../assets/images/userLanding_hotels/hotel1.png"
import hotel_2 from "../../../assets/images/userLanding_hotels/hotel2.png"
import hotel_3 from "../../../assets/images/userLanding_hotels/hotel3.png"
import hotel_4 from "../../../assets/images/userLanding_hotels/hotel4.png"
import { Fade, Stack } from "@mui/material"


export default function Hotels() {
       const hotels = [
        {
            img_src: hotel_1,
            alt_text: 'House 1',
            title: 'Green Park',
            description: 'Tangerang, Indonesia ',
        },
        {
            img_src: hotel_2,
            alt_text: 'House 2',
            title: 'Podo Wae',
            description: 'Madiun, Indonesia',
        },
        
        {
            img_src: hotel_3,
            alt_text: 'House 3',
            title: 'Silver Rain',
            description: 'Bandung, Indonesia',
        },
         {
            img_src: hotel_4,
            alt_text: 'House 4',
            title: 'Cashville',
            description: 'Kemang, Indonesia',
        },

    ]
  return (
    <>
      <Fade in={true} timeout={5000}>
        <Stack sx={{marginBottom:"50px"}}>
        <Slider cards={hotels} title="Hotels with large living room"/>
        </Stack>
    </Fade>
    </>
  )
}
