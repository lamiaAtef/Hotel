import { Box, Paper, Typography } from '@mui/material'
import type { cardType } from '../type'

export default function Card({img_src,alt_text,title,description}:cardType) {
  return (
    <>
      <Box className='card'>
        <Box 
          component="img" 
          src={img_src} 
          alt={alt_text}
          sx={{
            width:"100%",
            height:200,
            objectFit: "cover",
            borderRadius:"8px"

        }}

          >
        </Box>
        <Typography variant="h6" color={"#152C5B"}>{title}</Typography>
        <Typography variant="body2">{description}</Typography>

        
      </Box>
    </>
  )
}
