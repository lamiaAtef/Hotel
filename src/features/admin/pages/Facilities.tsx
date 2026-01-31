import { useEffect, useState } from "react";
import { ROOM_FACILITIES_URLS } from "../../../config/api.endPoint";
import { axiosInstance } from "../../../services/httpClient";
import SectionHeader from "../Shared/SectionHeader";
import type { FacilityRow } from "../type";
import { toast } from "react-toastify";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper,Typography
} from "@mui/material";
import DeleteConfirm from "../components/DeleteConfirm";
import {RiseLoader} from "react-spinners";
import CustomDialog from "../Shared/CustomDialog";
import CustomPagination from "../Shared/CustomPagination";

export default function Facilities() {
  const [rows, setRows] = useState<FacilityRow[]>([]);
  const [loading, setLoading] = useState(false);

  // to open and close menu
  /* state to hold item in menu if anchorEl with null ,menu is close. 
  if else anchorEl with htmlElement it means hold item from menu and menu is open
  */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  
  // function to hold buuton that is clicked
  // event.currentTarget it means button that is clicked
  const [selectedRow, setSelectedRow] = useState<FacilityRow | null>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row:FacilityRow) => {
  setAnchorEl(event.currentTarget);
  setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  // delete
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Add and update facility
  const [open, setOpen] = useState(false);
  const [facilityName, setFacilityName] = useState("");
  const [currentFacilityId, setCurrentFacilityId] = useState<string | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  // editModal
  const handleEditShow =(row: FacilityRow | null)=>{
    if(row === null) return;

    setCurrentFacilityId(row.id);
    setFacilityName(row.name);   
    setOpen(true);
    handleMenuClose();
  }

  // view modal
  const [openView, setOpenView] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0); 
  const [rowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // getAllFacilities
    const getAllFacilities =async(pageNumber =0) =>{
        try {
            setLoading(true);

            const response = await axiosInstance.get(ROOM_FACILITIES_URLS.GET_ALL_FACILITIES,
              {
                params:{
                  page: pageNumber +1,
                  size: rowsPerPage
                }});
            console.log(response?.data?.data?.facilities)
            const facilities = response.data.data.facilities.map((f: any) => ({
                id: f._id,
                name: f.name,
                createdBy: f.createdBy.userName,
                createdAt: new Date(f.createdAt).toLocaleDateString(),
              }));
        
              setRows(facilities);
              setTotalCount(response.data.data.totalCount);
            
        } catch (error) {
            console.error("Error fetching facilities", error);
            
        }finally{
            setLoading(false);
        }

    }

  // Add or update facility
  
  const saveFacility =async()=>{
    if(currentFacilityId){

      // update facility
      try {
        await axiosInstance.put(ROOM_FACILITIES_URLS.UPDATE_FACILITY(currentFacilityId),{name:facilityName});
        handleClose();
        toast.success("Facility updated successfully",{autoClose: 3000})
        setFacilityName('');
        setCurrentFacilityId(null);
        getAllFacilities(page);
        
      } catch (error) {
        toast.error("Failed to updated Facility");
        
      }
    }else{

      // Add Facility
      try {
        await axiosInstance.post(ROOM_FACILITIES_URLS.ADD_NEW_FACILITY,{name:facilityName});
        handleClose();
        toast.success("Add New Facility successfully",{autoClose: 3000})
        setFacilityName('');

        if (page !== 0) {
          setPage(0); // هيعمل useEffect وينادي getAllFacilities(0)
        } else {
          getAllFacilities(0); // لو كنا أصلاً في الصفحة الأولى، نجيب بيانات الصفحة الأولى من الباك
        }

        // setPage(0);
        // getAllFacilities(page);
        
      } catch (error) {
        toast.error('Failed to create facility',{autoClose:2000})
        
      }

    }
  }

  const deleteFacility = async()=>{
    if(!selectedRow) return;
    try {
      await axiosInstance.delete(ROOM_FACILITIES_URLS.DELETE_FACILITY(selectedRow.id));
      toast.success("Facility deleted successfully",{autoClose: 3000});
      setDeleteOpen(false);
      getAllFacilities(page);
      
    } catch (error) {
      toast.error("Failed to delete Facility",{autoClose:3000});
      
    }
  }

    useEffect(()=>{
        getAllFacilities(page);
    },[page])

    


  return (
    <>
      <SectionHeader title="Facilities Table Details" subtitle="You can check all details" 
       buttonText="Add New Facility" onButtonClick={()=>setOpen(true)}/>

       <DeleteConfirm title={selectedRow?.name}  open={deleteOpen} onClose={()=> setDeleteOpen(false)} onConfirm={deleteFacility}/>


      {/* Add facility Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>{currentFacilityId? "Update Facility": "Add Facility"}
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", top: 16, right: 16 ,color:"red",border:"1px solid red" }}>
          <CloseIcon  sx={{fontSize: 14}}/>
        </IconButton>
        </DialogTitle>
        <DialogContent sx={{marginY:"10px"}}>
            <TextField
              fullWidth
              label="Facility Name"
              margin="dense"
              value={facilityName}
              onChange={(e)=> setFacilityName(e.target.value)}
              size="small"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{marginRight:"5px"}}>Cancel</Button>
          <Button variant="contained" className="btnAdmin"  onClick={saveFacility}>
            {currentFacilityId ? "Update Facility": "Add Facility"}
          </Button>
        </DialogActions>
      </Dialog>

      <CustomDialog open={openView} onClose={()=> setOpenView(false)}
      title="Facility Details" maxWidth="xs">
        <Typography><strong>Facility Name:</strong> {selectedRow?.name}</Typography>
        <Typography sx={{my:2}}><strong>Created By:</strong> {selectedRow?.createdBy}</Typography>
        <Typography><strong>Created At:</strong> {selectedRow?.createdAt}</Typography>
      </CustomDialog>

  <TableContainer component={Paper} sx={{marginTop:"20px",marginX:"10px"}}>
  <Table>
    <TableHead sx={{backgroundColor:"#ccc"}}>
      <TableRow>
        <TableCell>Facility Name</TableCell>
        <TableCell>Created By</TableCell>
        <TableCell>Created Date</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={4} align="center" sx={{py: 5}}>
            {/* <CircularProgress /> */}
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", mt:3}}>
            <RiseLoader loading={true} color="#203FC7" size={15} margin={2}/>
            </Box>
          </TableCell>
        </TableRow>
      ) : rows.length > 0 ? (
        rows.map((row,index) => (
          <TableRow key={row.id} sx={{backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white", // striped effect
          "&:hover": { backgroundColor: "#e0e0e0" }}}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.createdBy}</TableCell>
            <TableCell>{row.createdAt}</TableCell>
            <TableCell>
              <IconButton onClick={(event)=> handleMenuOpen(event, row)}>
                <MoreVertIcon/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3} align="center">
            No Facilities Found
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>

 
</TableContainer>

<Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
  <MenuItem onClick={()=>{
    setOpenView(true);
    handleMenuClose();
  }} className="viewAction">
    <ListItemIcon>
      <VisibilityIcon fontSize="small" />
    </ListItemIcon>
    <ListItemText className="viewAction">View</ListItemText>
  </MenuItem>

  <MenuItem onClick={()=>handleEditShow(selectedRow)}>
    <ListItemIcon>
      <EditIcon fontSize="small" />
    </ListItemIcon>
    <ListItemText>Edit</ListItemText>
  </MenuItem>

  <MenuItem onClick={()=>{
    setDeleteOpen(true);
    handleMenuClose();
   }}
   sx={{ color: "error.main" }}>
    <ListItemIcon>
      <DeleteIcon fontSize="small" color="error" />
    </ListItemIcon>
    <ListItemText>Delete</ListItemText>
  </MenuItem>
</Menu>

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
