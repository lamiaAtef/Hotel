import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../services/httpClient';
import { toast } from 'react-toastify';
import { ADMIN_URLS } from '../../../config/api.endPoint';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import SectionHeader from '../Shared/SectionHeader';
import { useNavigate } from 'react-router-dom';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirm from '../components/DeleteConfirm';
import CustomPagination from '../shared/CustomPagination';

export default function Rooms() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const [roomToDelete, setRoomToDelete] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const [openView, setOpenView] = useState(false);
  const [roomToView, setRoomToView] = useState<any>(null);

  const [search, setSearch] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('');
  const [discountFilter, setDiscountFilter] = useState('');

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    room: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoom(room);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRoom(null);
  };

  const getAllRooms = async () => {
    try {
      const response = await axiosInstance.get(
        ADMIN_URLS.GETALLROOMS,
        {
          params: {
            page: page + 1,
            size: rowsPerPage,
          },
        }
      );

      setRooms(response.data.data.rooms);
      setTotalCount(response.data.data.totalCount);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'Can not get all Rooms'
      );
    }
  };

  const handleDeleteRoom = async () => {
    try {
      await axiosInstance.delete(
        `${ADMIN_URLS.DELETEROOM}/${roomToDelete._id}`
      );

      toast.success('Room deleted successfully');

      setRooms((prev) =>
        prev.filter(
          (room) => room._id !== roomToDelete._id
        )
      );

      setOpenDelete(false);
      setRoomToDelete(null);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Delete failed'
      );
    }
  };

  useEffect(() => {
    getAllRooms();
  }, [page]);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.roomNumber
      ?.toString()
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCapacity = capacityFilter
      ? room.capacity === Number(capacityFilter)
      : true;

    const matchesDiscount = discountFilter
      ? room.discount === Number(discountFilter)
      : true;

    return (
      matchesSearch &&
      matchesCapacity &&
      matchesDiscount
    );
  });

  return (
    <>
      <SectionHeader
        title="Rooms Table Details"
        subtitle="You can check all details"
        buttonText="Add New Room"
        onButtonClick={() =>
          navigate('/admin-dashboard/addRoom')
        }
      />

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          margin: '24px',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          placeholder="Search by room number"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 600 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          size="small"
          label="Capacity"
          value={capacityFilter}
          onChange={(e) =>
            setCapacityFilter(e.target.value)
          }
          sx={{ width: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="1">Single</MenuItem>
          <MenuItem value="2">Double</MenuItem>
          <MenuItem value="3">Suite</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          label="Discount"
          value={discountFilter}
          onChange={(e) =>
            setDiscountFilter(e.target.value)
          }
          sx={{ width: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="0">0%</MenuItem>
          <MenuItem value="10">10%</MenuItem>
          <MenuItem value="20">20%</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ padding: '24px' }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: '12px' }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#E2E5EB' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Room Number
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Image
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Discount
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Capacity
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', width: 60 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRooms.map((room, index) => (
                <TableRow
                  key={room._id}
                  sx={{
                    backgroundColor:
                      index % 2 === 0
                        ? '#F8F9FB'
                        : '#FFFFFF',
                  }}
                >
                  <TableCell>{room.roomNumber}</TableCell>

                  <TableCell align="right">
                    {Array.isArray(room.images) &&
                    room.images.length > 0 ? (
                      <img
                        src={room.images[0]}
                        alt="room"
                        width={50}
                        height={40}
                        style={{
                          objectFit: 'cover',
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      <Typography variant="caption">
                        No Image
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell align="right">
                    {room.discount}%
                  </TableCell>

                  <TableCell align="right">
                    {room.capacity}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={(e) =>
                        handleMenuOpen(e, room)
                      }
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

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setRoomToView(selectedRoom);
            setOpenView(true);
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate(
              `/admin-dashboard/addRoom/${selectedRoom?._id}`
            );
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            setRoomToDelete(selectedRoom);
            setOpenDelete(true);
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog
        open={openView}
        onClose={() => setOpenView(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Room Details</DialogTitle>
        <DialogContent dividers>
          {roomToView && (
            <>
              <Typography>
                <strong>Room Number:</strong>{' '}
                {roomToView.roomNumber}
              </Typography>
              <Typography>
                <strong>Capacity:</strong>{' '}
                {roomToView.capacity}
              </Typography>
              <Typography>
                <strong>Discount:</strong>{' '}
                {roomToView.discount}%
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                {roomToView.images?.map(
                  (img: string, index: number) => (
                    <img
                      key={index}
                      src={img}
                      width={80}
                      height={60}
                      style={{
                        borderRadius: 6,
                        objectFit: 'cover',
                      }}
                    />
                  )
                )}
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpenView(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteConfirm
        open={openDelete}
        title={roomToDelete?.roomNumber}
        onClose={() => {
          setOpenDelete(false);
          setRoomToDelete(null);
        }}
        onConfirm={handleDeleteRoom}
      />

      <CustomPagination
        page={page}
        rowsPerPage={rowsPerPage}
        rowCount={totalCount}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}
