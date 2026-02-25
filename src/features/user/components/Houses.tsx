
import { Stack, Zoom } from "@mui/material"
import house_1 from "../../../assets/images/userLanding_house/house1.png"
import house_2 from "../../../assets/images/userLanding_house/house2.png"
import house_3 from "../../../assets/images/userLanding_house/house3.png"
import house_4 from "../../../assets/images/userLanding_house/house4.png"

import Slider from './Slider'


export default function Houses() {
    const houses = [
        {
            img_src: house_1,
            alt_text: 'House 1',
            title: 'Green Park',
            description: 'Tangerang, Indonesia ',
        },
        {
            img_src: house_2,
            alt_text: 'House 2',
            title: 'Podo Wae',
            description: 'Madiun, Indonesia',
        },
        
        {
            img_src: house_3,
            alt_text: 'House 3',
            title: 'Silver Rain',
            description: 'Bandung, Indonesia',
        },
         {
            img_src: house_4,
            alt_text: 'House 4',
            title: 'Cashville',
            description: 'Kemang, Indonesia',
        },

    ]
  return (
    <>
    <Stack sx={{marginBottom:"50px"}}>
         <Slider cards={houses} title="Houses with beauty backyard"/>
    </Stack>
    </>
  )
}
