
import * as React from "react";
import { TextField, InputAdornment, Button, Box } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

export default function DateRangeSingleInput() {
  const navigate = useNavigate();

  const inputRef = React.useRef<HTMLDivElement | null>(null);

  const [openFrom, setOpenFrom] = React.useState(false);
  const [openTo, setOpenTo] = React.useState(false);

  const [fromDate, setFromDate] = React.useState<Dayjs | null>(null);
  const [toDate, setToDate] = React.useState<Dayjs | null>(null);

  const formatRange = () => {
    if (!fromDate || !toDate) return "";
    return `${fromDate.format("MM DD YYYY")} - ${toDate.format(
      "MM DD YYYY"
    )}`;
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          {/* INPUT */}
          <TextField
            ref={inputRef}
            sx={{ width: 280 }}
            placeholder="MM DD YYYY - MM DD YYYY"
            value={formatRange()}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    backgroundColor: "rgba(21, 44, 91, 1)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <CalendarMonthIcon onClick={() => setOpenFrom(true)} />
                </InputAdornment>
              ),
            }}
          />

          {/* FROM DATE */}
          <DatePicker
            open={openFrom}
            value={fromDate}
            onClose={() => setOpenFrom(false)}
            onChange={(newValue) => {
              setFromDate(newValue);
              setOpenFrom(false);
              setOpenTo(true);
            }}
            enableAccessibleFieldDOMStructure={false}
            slots={{
              textField: () => null,
            }}
            slotProps={{
              popper: {
                anchorEl: inputRef.current,
                placement: "bottom-start",
                disablePortal: true,
                sx: { zIndex: 1300 },
              },
            }}
          />

          {/* TO DATE */}
          <DatePicker
            open={openTo}
            value={toDate}
            minDate={fromDate ?? undefined}
            onClose={() => setOpenTo(false)}
            onChange={(newValue) => {
              setToDate(newValue);
              setOpenTo(false);
            }}
            enableAccessibleFieldDOMStructure={false}
            slots={{
              textField: () => null,
            }}
            slotProps={{
              popper: {
                anchorEl: inputRef.current,
                placement: "bottom-start",
                disablePortal: true,
                sx: { zIndex: 1300 },
              },
            }}
          />
        </Box>
      </LocalizationProvider>

      <Button
        variant="contained"
        sx={{ textTransform: "none", my: 3 }}
        onClick={() => navigate("/payment")}
      >
        Continue Book
      </Button>
    </>
  );
}
