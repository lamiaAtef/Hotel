import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteImg from "../../../assets/images/Email.png";
import type { DeleteConfirmProps } from "../type";



export default function DeleteConfirm({
  open,
  title,
  onClose,
  onConfirm,
}: DeleteConfirmProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "red",
            border: "1px solid red",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 4,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "rgba(0,146,71,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={DeleteImg} alt="Delete" width={60} />
          </Box>

          <Typography variant="h6" fontWeight={600}>
            Delete this {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete this item?
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={onConfirm}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
