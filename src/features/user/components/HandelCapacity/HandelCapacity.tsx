import * as React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function CapacityButton() {
  const [capacity, setCapacity] = React.useState<number>(1);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        width: "300px",
        height:"40px",
        justifyContent: "space-between",

p:0

      }}
    >
      <IconButton
sx={{p:0}}

        onClick={() => setCapacity((prev) => (prev > 0 ? prev - 1 : 0))}
      >
        <RemoveIcon   sx={{backgroundColor:"red",color:"white",height:"40px",width:"40px"}} />
      </IconButton>

  <Typography>{capacity} Person</Typography>

      <IconButton

sx={{p:0}}
       onClick={() => setCapacity((prev) => prev + 1)} >
        <AddIcon   sx={{backgroundColor:"green",color:"white",height:"40px",width:"40px"}}  />
      </IconButton>


    </Box>
  );
}
