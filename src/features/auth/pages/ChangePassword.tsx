import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../config/api.endPoint"
import { axiosInstance } from "../../../services/httpClient"
import { useForm, useWatch } from "react-hook-form";
import AuthHeader from "../shared/AuthHeader";
import { Box, Button, TextField, Typography } from "@mui/material";
import { CONFIRM_PASSWORD_VALIDATION, PASSWORD_VALIDATION } from "../validation/validation";
import { useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from "@mui/material";
import type { changePayload } from "../type";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const navigate = useNavigate();




    const {
        register,

        handleSubmit,
        control,
        formState: { errors },
    } = useForm<changePayload>();
    const password = useWatch({
        control,
        name: "newPassword",
    });

    const onSubmit = async (data: changePayload) => {
        try {
            const response = await axiosInstance.post(
                AUTH_URLS.CHANGE_PASSWORD,
                data

            );

            toast.success(
                response?.data?.message || "password changed succeffully"
            );
            navigate("/auth/login");


        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <AuthHeader title="change password" />
            <Box
                sx={{

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"

                }}
            >


                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Typography>Old Password</Typography>
                    <TextField
                        type={showPassword ? "text" : "password"}
                        fullWidth

                        label="Old Password"
                        sx={{
                            mb: 4,
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F5F6F8",
                                borderRadius: "8px",
                            },
                        }}
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
                        {...register("oldPassword", PASSWORD_VALIDATION)}
                        error={!!errors.oldPassword}
                        helperText={errors.oldPassword?.message}
                    />
                    <Typography>New Password</Typography>
                    <TextField
                        fullWidth
                        type={showNewPassword? "text" : "password"}
                        label="newPassword"
                        sx={{
                            mb: 4,
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F5F6F8",
                                borderRadius: "8px",
                            },
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            edge="end">
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        {...register("newPassword", PASSWORD_VALIDATION)}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                    />
                    <Typography>Confirm Password</Typography>
                    <TextField
                        type={showConfirmPassword ? "text" : "password"}
                        fullWidth

                        label="Confirm Password"
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
                        {...register(
                            "confirmPassword",
                            CONFIRM_PASSWORD_VALIDATION(password)
                        )}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />



                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            my:2,
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
    )
}
