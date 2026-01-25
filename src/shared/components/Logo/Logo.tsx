import logoImg from "../../../assets/images/logo.png"
import Box from "@mui/material/Box";


export default function Logo() {
  return (
    <>
      <Box
            component="img"
            src={logoImg}
            alt="Logo"
            sx={{
              width: 120,
              mb: 3,
            }}
          />
    </>
  )
}
