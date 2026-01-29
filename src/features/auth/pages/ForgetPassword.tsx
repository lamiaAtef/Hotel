import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { ForgetPayload } from "../type";
import { axiosInstance } from "../../../services/httpClient";
import { AUTH_URLS } from "../../../config/api.endPoint";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  TextField,
  Typography,
 
} from "@mui/material";
import { EMAIL_VALIDATION } from "../validation/validation";
import AuthHeader from "../shared/AuthHeader";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ForgetPassword() {
  const navigate = useNavigate();
//  const authContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPayload>();

  const onSubmit = async (data: ForgetPayload) => {
    try {
      const response = await axiosInstance.post(
        AUTH_URLS.FORGET_PASSWORD,
        data
      );

      toast.success(
        response?.data?.message || "Check your email to forget password"
      );

      navigate('/reset-pass', {state: {email: data.email}});

  
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
useEffect(() => {
  // if (authContext?.userData) {
  //   navigate("/login");
  // }
});

  return (
    <>
    
    <AuthHeader title="Forgot password" />
    <Box
      sx={{
       
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
       
      }}
    >
      
     
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography>Email</Typography>
          <TextField
            fullWidth
            type="email"
            label="Email"
            sx={{
              mb: 4,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F5F6F8",
                borderRadius: "8px",
              },
            }}
            {...register("email", EMAIL_VALIDATION)}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              py: 1.5,
              textTransform: "capitalize",
              fontSize: "16px",
              borderRadius: "8px",
            }}
          >
            Send email
          </Button>
        </Box>
      </Box>
    </>
  )}
