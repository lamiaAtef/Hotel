// import { Controller, useForm } from "react-hook-form";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// export default function DateComponent() {
//     const { control } = useForm();

//   return (
//     <>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Controller
//         name="startDate"
//         control={control}
//         render={({ field }) => (
//           <DatePicker
//             label="Start Date"
//             {...field}
//             slotProps={{
//               textField: {
//                 fullWidth: true,
//               },
//             }}
//           />
//         )}
//       />
//     </LocalizationProvider>
//     </>
//   )
// }
