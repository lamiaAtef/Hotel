import AuthHeader from "../shared/AuthHeader";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ResetPayload } from "../type";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION, REQUIRED_VALIDATION } from "../validation/validation";
import { axiosInstance } from "../../../services/httpClient";
import { AUTH_URLS } from "../../../config/api.endPoint";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const {register, handleSubmit,formState:{errors},watch} = useForm<ResetPayload>();

  const passwordValue = watch("password");

  let onSubmit =async(data:ResetPayload)=>{
    try {
      let response = await axiosInstance.post(AUTH_URLS.RESET_PASSWORD,data);
      console.log(response);

      toast.success(
        response?.data?.message || `Your password has been reset successfully.`
      );
      
      navigate('/auth/login');
      
      
    } catch (error: any) {
      // console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      
    }
  }
  
  return (
    <>
    <AuthHeader title="Reset Password"/>

    <Box component="form" sx={{marginLeft:"50px"}} onSubmit={handleSubmit(onSubmit)}>

      <Stack spacing={2} sx={{width:"60%"}}>

      <TextField type="email"  id="email" label="Email" variant="outlined" 
        sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#F5F6F8",
          borderRadius: "8px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#aab5bf", // border color in focus
          color:"#000"
          },
          
          "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ccc", // border color in normal mode
          },
          },
          "& .MuiInputLabel-root": {
          backgroundColor: "#f5f6f8",
          color:"#000", 
          padding: "0 4px",
          },
          }}

          {...register("email",EMAIL_VALIDATION)}
          error={!!errors.email}
          helperText={errors.email?.message}
              
      />

      <TextField type="text"  id="otp" label="OTP" variant="outlined" 
        sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#F5F6F8",
          borderRadius: "8px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#aab5bf", // border color in focus
          color:"#000" 
          },
          
          "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ccc", // border color in normal mode
          },
          },
          "& .MuiInputLabel-root": {
          backgroundColor: "#f5f6f8",
          color:"#000", 
          padding: "0 4px",
          },
          }}

          {...register("seed",REQUIRED_VALIDATION("OTP"))}
          error={!!errors.seed}
          helperText={errors.seed?.message}
              
      />

      <TextField type={showPassword? "text":"password"}  id="password" label="password" variant="outlined" 
        sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#F5F6F8",
          borderRadius: "8px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#aab5bf",
          color:"#000" // border color in focus
          },
          
          "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ccc", // border color in normal mode
          },
          },
          "& .MuiInputLabel-root": {
          backgroundColor: "#f5f6f8",
          color:"#000", 
          padding: "0 4px",
          },
          }}

          // to add show and hide icon
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
          }}

          {...register("password",PASSWORD_VALIDATION)}
          error={!!errors.password}
          helperText={errors.password?.message}
              
      />

      <TextField type={showConfirmPassword ? "text":"password"} id="confirm-password" label="Confirm Password" variant="outlined" 
        sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#F5F6F8",
          borderRadius: "8px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#aab5bf", // border color in focus
          color:"#000"
          },
          
          "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ccc", // border color in normal mode
          },
          },
          "& .MuiInputLabel-root": {
          backgroundColor: "#f5f6f8",
          color:"#000", 
          padding: "0 4px",
          },
          }}

           // to add show and hide icon
           slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
          }}

          {...register("confirmPassword",{...PASSWORD_VALIDATION,
          validate: (value:string) =>
          value === passwordValue || "Passwords do not match"})}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
              
      />

      </Stack>

      <Stack my={4} sx={{width:"60%"}}>
        <Button type="submit" variant="contained" color="primary" sx={{textTransform:"capitalize",paddingY:"10px",fontSize:"15px"}}>
          Reset
        </Button>
      </Stack>
    </Box>
    
      
    </>
  )
}
