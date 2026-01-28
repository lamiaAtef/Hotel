import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import type { AuthHeaderProps } from '../type';

export default function AuthHeader({title,isLogin}:AuthHeaderProps) {
    let navigate= useNavigate();
     const config = {
        text: isLogin
          ? "If you don’t have an account register"
          : "If you already have an account",
        buttonText: isLogin ? "Register here !" : "Login here !",
        buttonColor: isLogin ? "primary" : "error",
        customColor: isLogin ? "#152C5B" : " #EB5148;",
        path: isLogin ? "/auth/register" : "/auth/login",
      };
  return (
    <>
      <Box component="div" sx={{marginLeft:"50px",marginTop:"30px"}}>
        <Typography variant="h5">{title}</Typography>

        <Stack sx={{marginY:"20px"}}>
          <Typography variant="body2" sx={{lineHeight:"0.7"}}>
            {config.text} 
          </Typography>
          <Typography variant="body2">You can 
            <Button sx={{textTransform:"lowercase",color:config.customColor}} onClick={()=>navigate(config.path)} variant="text">
             {config.buttonText}           
            </Button> 
          </Typography>
        </Stack>
      </Box>
    </>
  )
}
