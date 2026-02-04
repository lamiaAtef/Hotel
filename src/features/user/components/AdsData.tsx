import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ADS_URLS, FAV_URLS } from "../../../config/api.endPoint";
import { axiosInstance } from "../../../services/httpClient";
import { Box, Typography, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { MyAdsPayload } from "../type";
import { toast } from "react-toastify";
import { AuthContext } from "../../auth/context/AuthContext";

export default function AdsData() {
const authContext = useContext(AuthContext);
const userData = authContext?.userData;

    const [adsList, setAdsList] = useState<MyAdsPayload[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null); 
    const navigate = useNavigate();

    const getAllAds = async () => {
        try {
            const response = await axiosInstance.get(ADS_URLS.GET_ALL_ADS);
            setAdsList(response.data.data.ads);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllAds();
    }, [])

const addToFavorite = (roomId: string) => {
  // ❌ مش عامل Login
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
          }}
          onClick={() => navigate("/auth/register")}
        >
          Register now
        </span>
      </span>,
      {
        autoClose: 5000,
        closeOnClick: false,
      }
    );
    return;
  }


  navigate("/favorites");
};





    const OverlayIcons = ({ ad }: { ad: any }) => (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                gap: 2,
                zIndex: 2,
            }}
        >
            <IconButton 
                onClick={() => addToFavorite(ad.room._id)}
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
                
                {selectedId === ad.room._id ? (
                    <FavoriteIcon sx={{ fontSize: 30 }} />
                ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 30 }} />
                )}
            </IconButton>

            <IconButton 
                onClick={() => navigate(`/details/${ad._id}`)}
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
                        <OverlayIcons ad={adsList[0]} />
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
                        <OverlayIcons ad={ad} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}