import { Box, Typography } from "@mui/material";
import uploadImg from "../../../assets/images/Upload.png";
import type { UploadFileImgProps } from "../type";

export default function UploadFileImg({ title }:UploadFileImgProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        type="file"
        id="upload"
        hidden
        accept="image/*"
      />

      <Box
        component="label"
        htmlFor="upload"
        sx={{
          width: "600px",
          height: "120px",
          border: "1px dashed rgba(0,146,71,1)",
          backgroundColor: "rgba(0,146,71,0.08)",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column", 
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          cursor: "pointer",
        }}
      >
       
        <Box>
          <img src={uploadImg} alt="Upload" width={60} />
        </Box>

        <Typography variant="body2" color="text.secondary">
          Drag & Drop or{" "}
          <Box
            component="span"
            sx={{ color: "rgba(0,146,71,1)", fontWeight: 600 }}
          >
            {title}
          </Box>{" "}
          to Upload
        </Typography>
      </Box>
    </Box>
  );
}
