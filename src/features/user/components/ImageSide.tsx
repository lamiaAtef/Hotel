import React from 'react'
import type { BorderShape, ImageSideProps } from '../type'
import { Box, Fade, Slide, Zoom } from '@mui/material'

export default function ImageSide({imageName,xPosition,yPosition,borderShape}:ImageSideProps) {
 
  const getBorderShape = (shape?: BorderShape) => {
    const baseRadius = "15px";
    const bigRadius = "100px";

    return {
        borderRadius: baseRadius,
        ...(shape === "topLeft" && { borderTopLeftRadius: bigRadius }),
        ...(shape === "topRight" && { borderTopRightRadius: bigRadius }),
        ...(shape === "bottomLeft" && { borderBottomLeftRadius: bigRadius }),
        ...(shape === "bottomRight" && { borderBottomRightRadius: bigRadius }),
    };
};

    return (
    <>
     <Zoom  in={true} timeout={800}>
        <Box sx={{
            position:"relative",
            border: "2px solid #E5E5E5",
            borderRadius:"15px",
           
            width: { xs: "100%" },
            height: { xs: "400px"},





        }}>
       
            
            <Box 
                component="img"
                src = {imageName}
                sx={{
                    position:"absolute",
                    top:0,
                    left:0,
                    width:"100%",
                    height:"100%",
                    transform: { xs: "translate(0,0)",md:`translate(${xPosition}, ${yPosition})`},
                    borderShape:"100px",
                    objectFit:"cover",
                    zIndex:2,
                    ...getBorderShape(borderShape)
                    
                }}



            
            />
           

        </Box>
         </Zoom>
      
    </>
  )
}

