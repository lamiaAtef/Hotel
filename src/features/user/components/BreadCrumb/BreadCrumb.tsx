import { Breadcrumbs, Link, Typography } from "@mui/material";
import {Link as RouterLink} from"react-router-dom"



export default function BreadCrumb({link1,link2}:any) {
  return (
    <>
<Breadcrumbs aria-label="breadcrumb" sx={{my:5}}>
  <Link
  component={RouterLink}
  to="/"
  underline="none"
  sx={{
    color:"#777",
    "&:hover":{
        color:"primary.main"
    }
  }}

  >
    {link1}
  </Link>


  <Typography  sx={{color:"rgba(21, 44, 91, 1)",fontWeight:"bold"}}>{link2}</Typography>
</Breadcrumbs>
    </>
  )
}
