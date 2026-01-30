import {
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { ADMIN_URLS } from "../../../config/api.endPoint";
import { axiosInstance } from "../../../services/httpClient";
import { useForm, Controller } from "react-hook-form";
import type { CreateRommPayload } from "../type";
import UploadFileImg from "../components/UploadFileImg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RoomData() {
  const { id } = useParams(); 
 const navigate=useNavigate()
  const [facilitiesList, setFacilitiesList] = useState<any[]>([]);
  const [facilitiesLoading, setFacilitiesLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateRommPayload>();

  // =========================
  // Submit (Create / Update)
  // =========================
  const onSubmit = async (data: CreateRommPayload) => {
    const formData = new FormData();

    formData.append("roomNumber", data.roomNumber.toString());
    formData.append("price", data.price.toString());
    formData.append("capacity", data.capacity.toString());

    if (data.discount !== undefined) {
      formData.append("discount", data.discount.toString());
    }

    data.facilities.forEach((facility) => {
      formData.append("facilities[]", facility);
    });

    Array.from(data.imgs || []).forEach((file) => {
      formData.append("imgs", file);
    });

    try {
      const response = id
        ? await axiosInstance.put(
            `${ADMIN_URLS.EDITROOM}/${id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
        : await axiosInstance.post(
            ADMIN_URLS.CREATEROOM,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

      toast.success(
        response?.data?.message ||
          (id ? "Room updated successfully" : "Room created successfully")
      );
      navigate("/admin-dashboard/rooms")
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          (id ? "Can not update Room" : "Can not create Room")
      );
    }
  };

  // =========================
  // Get facilities
  // =========================
  useEffect(() => {
    setFacilitiesLoading(true);

    axiosInstance
      .get(ADMIN_URLS.GETALLFACILITES)
      .then((res) => {
        const facilities = res?.data?.data?.facilities;
        setFacilitiesList(Array.isArray(facilities) ? facilities : []);
      })
      .catch(() => {
        setFacilitiesList([]);
      })
      .finally(() => {
        setFacilitiesLoading(false);
      });
  }, []);

  // =========================
  // Get room data (Edit mode)
  // =========================
  useEffect(() => {
    if (!id) return;

    axiosInstance
      .get(`${ADMIN_URLS.EDITROOM}/${id}`)
      .then((res) => {
        const room = res?.data?.data?.room;

        reset({
          roomNumber: room.roomNumber,
          price: room.price,
          capacity: room.capacity,
          discount: room.discount,
          facilities: room.facilities.map((f: any) => f._id),
        });
      })
      .catch(() => {
        toast.error("Failed to load room data");
      });
  }, [id, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundColor: "#fff",
        p: 4,
        borderRadius: 2,
        maxWidth: 900,
      }}
    >
      {/* Room Number */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          placeholder="Room Number"
          {...register("roomNumber", {
            required: "Room number is required",
          })}
          error={!!errors.roomNumber}
          helperText={errors.roomNumber?.message}
        />
      </Box>

      {/* Price & Capacity */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          placeholder="Price"
          type="number"
          {...register("price", { required: "Price is required" })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        <TextField
          fullWidth
          placeholder="Capacity"
          type="number"
          {...register("capacity", {
            required: "Capacity is required",
          })}
          error={!!errors.capacity}
          helperText={errors.capacity?.message}
        />
      </Box>

      {/* Discount & Facilities */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          placeholder="Discount"
          type="number"
          {...register("discount")}
        />

        <Controller
          name="facilities"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <TextField
              select
              fullWidth
              label="Facilities"
              value={field.value || []}
              SelectProps={{
                multiple: true,
                onChange: (event) => {
                  field.onChange(event.target.value);
                },
              }}
            >
              {facilitiesLoading ? (
                <MenuItem disabled>Loading facilities...</MenuItem>
              ) : facilitiesList.length === 0 ? (
                <MenuItem disabled>No facilities found</MenuItem>
              ) : (
                facilitiesList.map((facility) => (
                  <MenuItem key={facility._id} value={facility._id}>
                    {facility.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
        />
      </Box>

      {/* Upload Images */}
      <UploadFileImg
        title="Choose a Room Image"
        register={register}
        error={errors.imgs?.message}
      />

      {/* Submit */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#2E7D32",
            px: 4,
            py: 1.2,
            borderRadius: 2,
            width: "500px",
          }}
        >
          {id ? "Update Room" : "Save"}
        </Button>
      </Box>
    </Box>
  );
}
