import { Box, Button, Container, Grid, Typography } from "@mui/material";
import banner from "../../../../assets/images/banner.png";

import CapacityButton from "../HandelCapacity/HandelCapacity";


import { toast } from "react-toastify";
import { TextField, InputAdornment } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";




export default function BookingUser() {
    const [openFrom, setOpenFrom] = React.useState<boolean>(false);
    const [openTo, setOpenTo] = React.useState<boolean>(false);

    const [fromDate, setFromDate] = React.useState<Dayjs | null>(null);
    const [toDate, setToDate] = React.useState<Dayjs | null>(null);
    const navigate=useNavigate();

    const formatRange = () => {
      if (!fromDate || !toDate) return "";
      return `${fromDate.format("MM DD YYYY")} - ${toDate.format(
        "MM DD YYYY"
      )}`;
    };


const handleFilter = async () => {
  if (!fromDate || !toDate) {
    toast.error("Please select start and end date");
    return;
  }

  const startDate = fromDate.format("YYYY-MM-DD");
  const endDate = toDate.format("YYYY-MM-DD");
  navigate(`explore?startDate=${startDate}&endDate=${endDate}`);

  // try {
  //   const response = await axios.post("https://your-backend.com/filter", {
  //     start_date: startDate,
  //     end_date: endDate,
  //   });

  //   console.log("فلتر ناجح:", response.data);
  //   toast.success("فلتر ناجح!");
  //   // هنا ممكن تعمل setState للنتايج لو عايز تعرضها
  // } catch (error) {
  //   console.error(error);
  //   toast.error("حصل خطأ في الفلترة");
  // }
};

  return (

    <>
    <Container>
<Grid container spacing={2} sx={{my:5}}>

 <Grid size={{xs:12,md:9}}>
<Box >
<Box>
        <Typography variant="h4" sx={{color:"rgba(21, 44, 91, 1)",fontWeight:"700",mb:1,lineHeight:"1.5"}}>
Forget Busy Work,<br/>
Start Next Vacation
</Typography>
<Typography variant="body1" sx={{color:"rgba(176, 176, 176, 1)",mb:2}}>
    We provide what you need to enjoy your holiday with family.<br/>
    Time to make another memorable moments.
</Typography>
<Typography variant="h6" sx={{color:"rgba(21, 44, 91, 1)",my:1}}>
   start Booking
</Typography>
<Typography variant="h6" sx={{color:"rgba(21, 44, 91, 1)",my:1}}>
   picK aDate
</Typography>

{/* date picker */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* TextField الواحد */}
      <TextField
        sx={{width:300}}
        placeholder="MM DD YYYY - MM DD YYYY"
        value={formatRange()}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <CalendarMonthIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setOpenFrom(true)}
              />
            </InputAdornment>
          ),
        }}
      />

      {/* FROM */}
      <DatePicker
        open={openFrom}
        value={fromDate}
        onClose={() => setOpenFrom(false)}
        onChange={(newValue: Dayjs | null) => {
          setFromDate(newValue);
          setOpenFrom(false);
          setOpenTo(true);
        }}
        enableAccessibleFieldDOMStructure={false}
        slots={{
          textField: () => null,
        }}
      />

      {/* TO */}
      <DatePicker
        open={openTo}
        value={toDate}
        minDate={fromDate ?? undefined}
        onClose={() => setOpenTo(false)}
        onChange={(newValue: Dayjs | null) => {
          setToDate(newValue);
          setOpenTo(false);
        }}
        enableAccessibleFieldDOMStructure={false}
        slots={{
          textField: () => null,
        }}
      />
    </LocalizationProvider>
{/* end date */}
<Typography variant="h6" sx={{color:"rgba(21, 44, 91, 1)",my:1}} >
 Capacity
</Typography>

<CapacityButton/>
<Button variant="contained" sx={{backgroundColor:"rgba(21, 44, 91, 1)",my:2}} onClick={handleFilter}>
  Explore
  </Button>



</Box>
</Box>
        </Grid>
           <Grid size={{xs:12,md:3}}>

<Box component="img"
src={banner}
sx={{
  width:"100%",
  height:"100%",

}}

>

</Box>

        </Grid>


</Grid>
    </Container>

    </>
  )
}
