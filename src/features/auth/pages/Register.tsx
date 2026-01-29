import { Box, Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import AuthHeader from "../shared/AuthHeader";
import { useForm } from "react-hook-form";
import {  EMAIL_VALIDATION, NAME_VALIDATION, PASSWORD_VALIDATION, PHONE_VALIDATION, REQUIRED_VALIDATION } from "../validation/validation";
import type { RegisterPayload } from "../type";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useToggle from "../../../shared/hooks/useToggle";

import { AUTH_URLS, baseURL } from "../../../config/api.endPoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function Register() {
  const{register,handleSubmit,formState:{errors,isSubmitting},watch}=useForm<RegisterPayload>();
  const passwordValue=watch("password");
  const navigate=useNavigate();
   const[password,togglePassword]=useToggle();
   const[confirmPassword,toggleConfirmPassword]=useToggle();
  const appendToFormData=(data:RegisterPayload)=>{
    const formData=new FormData();
    formData.append('confirmPassword',data.confirmPassword);
    formData.append('country',data.country);
      formData.append('email',data.email);
        formData.append('password',data.password);

           formData.append('role',"user");
           formData.append('userName',data.userName);
            formData.append('profileImage',data.profileImage[0]);
               formData.append('phoneNumber',data.phoneNumber.toString());

        return formData;
  }

  const onSubmit=async(data:RegisterPayload)=>{
    console.log(data);


const registerdata=appendToFormData(data);
try {
  const response= await  axios.post(`${baseURL}${AUTH_URLS.REGISTER}`,registerdata);
  toast.success(response?.data?.message);
  navigate("/login");


} catch (error:unknown) {
  if(axios.isAxiosError(error)){

      toast.error(error.response?.data?.message)
  }
else{
  toast.error("error occured");
}

}



  }
  return (
    <>
    <AuthHeader title="Sign Up" />
    <Box component="form" sx={{marginLeft:"50px"}} onSubmit={handleSubmit(onSubmit)} >
            <Stack spacing={2} sx={{width:"60%"}}>

            <TextField type="text"  id="userName" label="userName" variant="outlined"
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

                {...register("userName",NAME_VALIDATION)}
                error={!!errors.userName}
                helperText={errors.userName?.message}

            />
<Stack direction="row" spacing={2}>
  <TextField  type="text" label="phoneNumber"
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

                {...register("phoneNumber",PHONE_VALIDATION)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}/>
   <TextField label="Country"
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

                {...register("country",REQUIRED_VALIDATION("country"))}
                error={!!errors.country}
                helperText={errors.country?.message}/>
</Stack>
   <TextField type="email"  id="email" label="email address" variant="outlined"
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
               <TextField type={password?"text":"password"}  id="password" label="password" variant="outlined"
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
                            onClick={ togglePassword}

                                edge="end">
{password?<VisibilityOff />: <Visibility/>}
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                      }}

{...register("password",PASSWORD_VALIDATION)}
error={!!errors.password}
          helperText={errors.password?.message}

                  />

                  <TextField type={confirmPassword?"text" :"password"} id="confirm-password" label="Confirm Password" variant="outlined"
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
                               onClick={ toggleConfirmPassword}

                                edge="end">
{confirmPassword?<VisibilityOff />: <Visibility/>}
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                      }}

{...register("confirmPassword",{...PASSWORD_VALIDATION,
  validate:(value:string)=>
 value === passwordValue || "Passwords do not match"})}

error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}


                  />
                         <TextField type="file" id="profileImage" label="profileImage" variant="outlined"
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


{...register("profileImage",REQUIRED_VALIDATION("profileImage"))}
error={!!errors.profileImage}
          helperText={errors.profileImage?.message}


                  />
                                 {/* <TextField type="text" id="role" label="role" variant="outlined"
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


{...register("role",ROLE_VALIDATION)}
error={!!errors.role}
          helperText={errors.role?.message}


                  /> */}


            </Stack>

<Stack my={4} sx={{width:"60%"}}>
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} sx={{textTransform:"capitalize",paddingY:"10px",fontSize:"15px"}}>
          Sign Up
        </Button>
      </Stack>

    </Box>


    </>
  )
}