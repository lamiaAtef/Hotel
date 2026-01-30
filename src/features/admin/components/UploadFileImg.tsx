import { Box, Typography } from "@mui/material";
import uploadImg from "../../../assets/images/Upload.png";
import type { UploadFileImgProps } from "../type";
import { useState } from "react";

export default function UploadFileImg({
  title,
  register,
  error,
}: UploadFileImgProps) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <input
        type="file"
        id="upload"
        accept="image/*"
        multiple
        hidden
        {...register("imgs")}
        onChange={(e) => {
          const selectedFiles = e.target.files;
          if (selectedFiles) {
            setFiles(Array.from(selectedFiles));
          }
        }}
      />

      {/* Upload Box */}
      <Box
        component="label"
        htmlFor="upload"
        sx={{
          width: "100%",
          height: "120px",
          border: "1px dashed rgba(0,146,71,1)",
          backgroundColor: "rgba(0,146,71,0.08)",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <img src={uploadImg} alt="Upload" width={60} />

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

      {/* File names - horizontal */}
      {files.length > 0 && (
        <Box
          sx={{
            mt: 1,
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {files.map((file, index) => (
            <Box
              key={index}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: "16px",
                backgroundColor: "rgba(0,146,71,0.15)",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {file.name}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {error && (
        <Typography mt={1} variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
}
