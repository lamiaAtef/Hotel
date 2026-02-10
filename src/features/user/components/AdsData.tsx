import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  FAV_URLS, publicAxios, USER_URLS } from "../../../config/api.endPoint";
import { Box, Typography, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import VisibilityIcon from '@mui/icons-material/Visibility';
import {  type MyAdsPayload } from "../type";
import { toast } from "react-toastify";
import { AuthContext } from "../../auth/context/AuthContext";
import { axiosInstance } from "../../../services/httpClient";

export default function AdsData() {
const authContext = useContext(AuthContext);
const userData = authContext?.userData;

    const [adsList, setAdsList] = useState<MyAdsPayload[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null); 
    const navigate = useNavigate();



const getAllAds = async () => {
  try {
    const response = await publicAxios.get(USER_URLS.GET_ALL_ADS);
    setAdsList(response.data.data.ads);
  } catch (error) {
    console.error(error);
  }
};

    useEffect(() => {
        getAllAds();
    }, [])

const addToFavorite = async (roomId:string) => {
 
  if (!userData) {
    toast.info(
      <span>
        Please login first to add to favorites 🤍 <br />
        <span
          style={{
            color: "#1976d2",
            fontWeight: "bold",
            textDecoration: "underline",
            cursor: "pointer",
            marginRight:"20px"
          }}
          onClick={() => navigate("/auth/register")}>
          Register now
        </span>
        <span
          style={{
            color: "#1976d2",
            fontWeight: "bold",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => navigate("/auth/login")}>
          Login
        </span>
      </span>,
      {
        autoClose: 5000,
        closeOnClick: false,
        position:"top-center",
      }
    );
    return;
  }

  try {
    const response = await axiosInstance.post(FAV_URLS.ADD_FAVOURITE_ROOM,{roomId});
    console.log(response);
    
    toast.success(response.data?.message);
    setSelectedId(roomId); 
    navigate("/favorites");

    
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to add favorite");
    
  }
};


    const OverlayIcons = ({ roomId, adId }: { roomId:string, adId:string }) => (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                gap: 2,
                zIndex: 2,
            }}>
            <IconButton 
                onClick={() => addToFavorite(roomId)}
                sx={{ 
                    color: "white", 
                    transition: "all 0.3s ease-in-out",
                    "&:hover": { 
                        color: "rgba(255, 255, 255, 0.6)", 
                        transform: "scale(1.2)", 
                        backgroundColor: "transparent" 
                    } 
                }}>
                
                {selectedId === roomId ? (
                    <FavoriteIcon sx={{ fontSize: 30, color: "white" }} />
                ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 30, color:"white" }} />
                )}
            </IconButton>

            <IconButton 
                onClick={() => navigate(`/room-details/${roomId}`)}
                sx={{ 
                    color: "white", 
                    transition: "all 0.3s ease-in-out",
                    "&:hover": { 
                        color: "rgba(255, 255, 255, 0.6)", 
                        transform: "scale(1.2)", 
                        backgroundColor: "transparent" 
                    } 
                }}
            >
                <VisibilityIcon sx={{ fontSize: 30 }} />
            </IconButton>
        </Box>
    );

    return (
        <Box component="div" sx={{ margin: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}> Most popular ads</Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr",
                    gridTemplateRows: "repeat(2, 200px)",
                    gap: 2,
                }}>
                
                {adsList[0] && (
                    <Box sx={{ position: "relative", gridRow: "span 2" }}>
                        <Box
                            component="img"
                            src={adsList[0].room.images[0]}
                            alt="room"
                            sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
                        />
                        <OverlayIcons roomId={adsList[0].room._id} adId={adsList[0]._id} />
                    </Box>
                )}

                {adsList.slice(1, 5).map((ad, index) => (
                    <Box key={index} sx={{ position: "relative" }}>
                        <Box
                            component="img"
                            src={ad.room.images[0]}
                            alt="room"
                            sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
                        />
                        <OverlayIcons roomId={ad.room._id} adId={ad._id} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}