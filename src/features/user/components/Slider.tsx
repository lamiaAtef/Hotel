import { Grid, Typography } from '@mui/material'
import Card from './Card'
import type { sliderTypeProps } from '../type'

export default function Slider({cards,title}:sliderTypeProps) {
  return (
    <>
      <Typography variant='h6' className='section_title'>{title}</Typography>
       <Grid container spacing={2}>    
            {cards.map((card, index) => ( 
                <Grid key={index} size={{xs:12 ,sm:6  , md:3}}>  
                    <Card img_src={card.img_src} alt_text={card.alt_text} title={card.title} description={card.description}/>
                </Grid>
                ))
            }
        </Grid>
    </>
  )
}
