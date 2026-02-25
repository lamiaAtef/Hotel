import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
import type { CustomDialogProps } from "../type";
  
  
  
  export default function CustomDialog({
    open,
    onClose,
    title,
    children,
    maxWidth = "sm"
  }: CustomDialogProps) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
        <DialogTitle>
          {title}
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent>
          <Box mt={1}>
            {children}
          </Box>
        </DialogContent>
      </Dialog>
    );
  }