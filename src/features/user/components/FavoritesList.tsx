import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import {
  Box,
  Typography,
  IconButton
} from "@mui/material";
import {RiseLoader} from "react-spinners";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";

import { axiosInstance } from "../../../services/httpClient";
import { FAV_URLS } from "../../../config/api.endPoint";

const IMAGE_BASE_URL = "http://localhost:5000/";

const getImageSrc = (img?: string) => {
  if (!img) return "/no-image.png";
  return img.startsWith("http") ? img : `${IMAGE_BASE_URL}${img}`;
};

export default function FavoritesPage() {
  const [favoriteAds, setFavoriteAds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFavorites = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        FAV_URLS.GET_FAVOURITE_ROOMS
      );
      console.log(response);
      
      setFavoriteAds(response.data.data.favoriteRooms || []);
    } catch {
      toast.error("SOMETHING WENT WRONG");
    } finally {
      setIsLoading(false);
    }
  };

const removeFavorite = async (roomId: string) => {
  try {
    await axiosInstance.delete(
      `${FAV_URLS.DELETE_FAVOURITE_ROOM}/${roomId}`, 
      {
        data: {roomId}
      }
     
    );

    toast.success("Removed From Favorites");
    getFavorites();
  } catch (error: any) {
    toast.error(error.response?.data?.message || "failed to delete");
  }
};


  useEffect(() => {
    getFavorites();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center",alignItems:"center", mt: 10 }}>
        {/* <CircularProgress /> */}
        <RiseLoader color="#203FC7" size={15}/>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: "#152C5B",
          textAlign: "center"
        }}
      >
        Your Favorites
      </Typography>

      <Grid container spacing={3}>
        {favoriteAds.length > 0 ? (
          favoriteAds.map((fav) =>
            fav.rooms.map((room: any) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room._id}>
                
                <Box
                  sx={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    position: "relative",
                    height: "200px",
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.08)"
                  }}
                >
                 
                  <Box
                    component="img"
                    src={getImageSrc(room.images?.[0])}
                    alt="room-img"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />

                 

                  <IconButton
                  onClick={() => removeFavorite( room._id)}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "rgb(252, 243, 246)",
                      "&:hover": {
                        
                        transform: "translate(-50%, -50%) scale(1.1)"
                      }
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))
          )
        ) : (
          <Box sx={{ width: "100%", textAlign: "center", mt: 6 }}>
            <Typography color="text.secondary">
              No Favorite Added Yet
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
}