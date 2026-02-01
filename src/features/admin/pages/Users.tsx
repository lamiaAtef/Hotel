
import { useEffect, useState } from 'react';
import { USER_URLS } from '../../../config/api.endPoint';
import { axiosInstance } from '../../../services/httpClient';
import SectionHeader from '../shared/SectionHeader';
import Box from "@mui/material/Box";
import {RiseLoader} from "react-spinners";

import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from "@mui/material";
import type { User } from '../type';

import VisibilityIcon from "@mui/icons-material/Visibility";
import { Avatar } from "@mui/material";
import CustomDialog from '../Shared/CustomDialog';
import IconButton from "@mui/material/IconButton";
import CustomPagination from '../Shared/CustomPagination';

export default function Users() {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Pagination state
  const [page, setPage] = useState(0); 
  const [rowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const getAllUsers =async(pageNumber =0)=>{
    try {
      setLoading(true);
      const response= await axiosInstance.get(USER_URLS.GET_ALL_USERS,
        {
          params:{
            page: pageNumber +1,
            size: rowsPerPage
          }
        });
      console.log(response.data.data.users);
      setUsersList(response.data.data.users);
      setTotalCount(response.data.data.totalCount);
      
    } catch (error) {
      console.error("Error fetching Users", error);
      
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getAllUsers(page);
  },[page])

  return (
    <>
    <SectionHeader title='users Table Details' subtitle="You can check all details"/>

    <CustomDialog open={open} onClose={()=> setOpen(false)} title='Users Details'  maxWidth="xs">

      {selectedUser && (
        <>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar src={selectedUser.profileImage} alt={selectedUser.userName} sx={{ width: 100, height: 100 }} />
          </Box>
          <Typography><strong>User Name:</strong> {selectedUser.userName}</Typography>
          <Typography sx={{my:1}}><strong>Email:</strong> {selectedUser.email}</Typography>
          <Typography sx={{my:1}}><strong>Phone:</strong> {selectedUser.phoneNumber}</Typography>
          <Typography sx={{my:1}}><strong>Country:</strong> {selectedUser.country}</Typography>
          <Typography sx={{my:1}}><strong>Role:</strong> {selectedUser.role}</Typography>
        </>
      )}
    </CustomDialog>

    <TableContainer component={Paper} sx={{marginTop:"20px",marginX:"10px"}}>
  <Table>
    <TableHead sx={{backgroundColor:"#ccc"}}>
      <TableRow>
        <TableCell>User Name</TableCell>
        <TableCell>User Image</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Phone Number</TableCell>
        <TableCell>Country</TableCell>
        <TableCell>role</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={7} align="center" sx={{py: 5}}>
             {/* <CircularProgress /> */}
             <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", mt:3}}>
              <RiseLoader loading={true} color="#203FC7" size={15} margin={2}/>
            </Box>
          </TableCell>
        </TableRow>
      ) : usersList.length > 0 ? (
        usersList.map((user,index) => (
          <TableRow key={user._id} sx={{backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white", // striped effect
          "&:hover": { backgroundColor: "#e0e0e0", "& .avatar":{ transform: "scale(1.2)"} },
           transition: "background-color 0.3s ease"}}>
            <TableCell>{user.userName}</TableCell>
            <TableCell><Avatar src={user.profileImage} alt={user.userName} className='avatar'
            sx={{width: 50, height: 50, transition:"transform 0.3s ease"}}/>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>{user.country}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <IconButton onClick={()=>{
                setSelectedUser(user);
                setOpen(true);
              }}>
               <VisibilityIcon fontSize="small" className='viewAction'/>
              </IconButton>
            
            </TableCell>
          </TableRow>
         ))
      ) : (
        <TableRow>
          <TableCell colSpan={3} align="center">
            No users Found
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>

 
</TableContainer>

{/* Pagination */}
<CustomPagination
        page={page}
        rowsPerPage={rowsPerPage}
        rowCount={totalCount}
        onPageChange={(newPage) => setPage(newPage)}
      />
    
    </>
  )
}
