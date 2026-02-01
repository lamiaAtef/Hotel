import React, { useEffect, useState } from "react";
import SectionHeader from "../shared/SectionHeader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from '@mui/material/CircularProgress';


import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  ListItemIcon,
} from "@mui/material";

import { Controller,  useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RiseLoader } from "react-spinners";

import { axiosInstance } from "../../../services/httpClient";
import { ADMIN_URLS, ADS_URLS } from "../../../config/api.endPoint";

import CustomDialog from "../components/CustomDialog";
import DeleteImg from "../../../assets/images/Email.png";

export default function Ads() {
  const [adsList, setAdsList] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const [adsDetails, setAdsDetails] = useState<any>(null);
  const [adsUpdate, setAdsUpdate] = useState<any>(null);
  const [adsId, setAdsId] = useState<string | null>(null);

  /** Menu per row */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const openMenu = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors , isSubmitting },
  } = useForm({
    defaultValues: {
      room: "",
      discount: "",
      isActive: "true",
    },
  });

  /* ================= API ================= */

  const getAllAds = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(ADS_URLS.GET_ALL_ADS);
      setAdsList(res?.data?.data?.ads || []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
    finally {
      setLoading(false);
    }
  };

  const getAllRooms = async () => {
    const res = await axiosInstance.get(ADMIN_URLS.GETALLROOMS);
    setRooms(res?.data?.data?.rooms || []);
  };

  const deleteAds = async () => {
    if (!adsId) return;
    try {
      await axiosInstance.delete(ADS_URLS.DELETE_ADS(adsId));
      toast.success("Deleted successfully");
      setOpenDelete(false);
      getAllAds();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= Actions ================= */

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, ad: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedAd(ad);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedAd(null);
  };

  const handleOpenAdd = () => {
    console.log("Opening Add Ads dialog to add");
    reset({ room: "", discount: "", isActive: "true" });
    setAdsUpdate(null);
    setOpenAdd(true);
  };

  const handleEdit = (ad: any) => {
    setAdsUpdate(ad);
    reset({
      room: ad.room._id,
      discount: ad.room.discount,
      isActive: ad.isActive.toString(),
    });
    setOpenAdd(true);
    handleCloseMenu();``
  };

  const viewAds = (ad: any) => {
    setAdsDetails(ad);
    setViewModal(true);
    handleCloseMenu();
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    let payload;
    if (adsUpdate){
      const { room, ...rest } = data;
      payload = {
      ...rest,
       discount: Number(data.discount),
      isActive: data.isActive === "true",
      }
      
    }
    else{
        payload = {
      ...data,
      discount: Number(data.discount),
      isActive: data.isActive === "true",
    };
    }
   

    try {
      if (adsUpdate) {
        await axiosInstance.put(
          ADS_URLS.UPDATE_ADS(adsUpdate._id),
          payload
        );
        toast.success("Ads updated successfully");
        reset();
      } else {
        await axiosInstance.post(ADS_URLS.CREATE_ADS, payload);
        toast.success("Ads added successfully");
        reset();
      }
      getAllAds();
      setOpenAdd(false);
      setAdsUpdate(null);
      reset();
    } catch {
      toast.error("Operation failed");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAds();
    getAllRooms();
  }, []);
  if(loading)  return <Stack sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"50vh"}}><RiseLoader color="blue" /></Stack>
  return (
    <>
      {/* ================= Add / Edit Dialog ================= */}
      <Dialog open={openAdd} fullWidth>
        <DialogTitle>{adsUpdate ? "Edit Ads" : "Add Ads"}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="dense" error={!!errors.room}>
              <InputLabel>Select Room</InputLabel>
              <Controller
                name="room"
                disabled={!!adsUpdate}
                control={control}
                rules={{ required: "Room is required" }}
                render={({ field }) => (
                  <Select {...field} label="Select Room">
                    {rooms.map((room) => (
                      <MenuItem key={room._id} value={room._id}>
                        {room.roomNumber}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <TextField
              fullWidth
              label="Discount"
              type="number"
              margin="dense"
              {...register("discount", {
                required: "Discount is required",
                min: 1,
                max: 100,
              })}
              error={!!errors.discount}
              helperText={errors.discount?.message as string}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel>Is Active</InputLabel>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Is Active">
                    <MenuItem value="true">True</MenuItem>
                    <MenuItem value="false">False</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <DialogActions>
              <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
              <Button variant="contained" disabled = {isSubmitting} type="submit" >
                {isSubmitting ? <><CircularProgress size={20} color="primary" />"save"</>: "Save"}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* ================= Delete Dialog ================= */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} fullWidth>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <IconButton
            onClick={() => setOpenDelete(false)}
            sx={{ position: "absolute", right: 16, top: 16 }}
          >
            <CloseIcon />
          </IconButton>

          <Stack alignItems="center" spacing={2} mt={4}>
            <img src={DeleteImg} width={70} />
            <Typography>Are you sure?</Typography>
            <Stack direction="row" spacing={2}>
              <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
              <Button color="error" variant="contained" onClick={deleteAds}>
                Delete
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* ================= Header ================= */}
      <SectionHeader
        title="ADS Table Details"
        subtitle="You can check all details"
        buttonText="Add New Ads"
        onButtonClick={handleOpenAdd}
      />

      {/* ================= Table ================= */}
      <Box p={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
             
              {adsList.map((ad) => (
                <TableRow key={ad._id}>
                  <TableCell>{ad.room.roomNumber}</TableCell>
                  <TableCell>
                    <img src={ad.room.images[0]} width={50} />
                  </TableCell>
                  <TableCell>{ad.room.price}</TableCell>
                  <TableCell>{ad.room.discount}%</TableCell>
                  <TableCell>{ad.room.capacity}</TableCell>
                  <TableCell>{ad.isActive.toString()}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handleOpenMenu(e, ad)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* ================= Menu ================= */}
      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
        <MenuItem onClick={() => viewAds(selectedAd)}>
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          View
        </MenuItem>

        <MenuItem onClick={() => handleEdit(selectedAd)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAdsId(selectedAd?._id);
            setOpenDelete(true);
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      {/* ================= View Dialog ================= */}
      <CustomDialog
        open={viewModal}
        onClose={() => setViewModal(false)}
        title="Ads Details"
      >
        {adsDetails ? (
          <Stack spacing={1}>
            <Typography>Room: {adsDetails.room.roomNumber}</Typography>
            <Typography>Price: {adsDetails.room.price}</Typography>
            <Typography>Discount: {adsDetails.room.discount}%</Typography>
            <Typography>Capacity: {adsDetails.room.capacity}</Typography>
            <Typography>Active: {adsDetails.isActive.toString()}</Typography>
          </Stack>
        ) : (
          <RiseLoader />
        )}
      </CustomDialog>
    </>
  );
}
