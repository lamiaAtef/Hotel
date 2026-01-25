import { Alert, Box, Button, IconButton, InputAdornment, Snackbar, Stack, TextField } from "@mui/material";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION} from "../validation/validation";
import AuthHeader from "../shared/AuthHeader";
import { useForm } from "react-hook-form";
import type { LoginPayload } from "../type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const navigate = useNavigate();
  const { loading, login } = useLogin();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [showPassword, setShowPassword] = useState<boolean>(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const onSubmit = async (data: LoginPayload) => {
    const user = await login(data);
    console.log(data)
    if (!user) {
      setSnackbarMessage("Invalid email or password");
      setSnackbarOpen(true);
      return;
    }

    navigate(user.role === "admin" ? "/admin-dashboard" : "/home");
  };

  return (
    <>
      <AuthHeader title="Sign in" isLogin />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ ml: 6 }}>
        <Stack spacing={2} width="60%">
          <TextField
            label="Email"
            type="email"
            {...register("email", EMAIL_VALIDATION)}
            error={!!errors.email}
            helperText={errors.email?.message}
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


          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error">{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
}
