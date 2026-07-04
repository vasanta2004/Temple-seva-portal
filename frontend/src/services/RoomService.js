import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/rooms';

const getAllRooms = () => {
  return axios.get(API_URL + '/all');
};

const getAllBookings = () => {
  return axios.get(API_URL + '/bookings/all', { headers: authHeader() });
};

const addRoom = (roomData) => {
  return axios.post(API_URL + '/add', roomData, { headers: authHeader() });
};

const getUserBookings = (userId) => {
  return axios.get(API_URL + '/user/' + userId, { headers: authHeader() });
};

const deleteRoom = (id) => {
  return axios.delete(API_URL + '/delete/' + id, { headers: authHeader() });
};

const updateRoom = (id, roomData) => {
  return axios.put(API_URL + '/update/' + id, roomData, { headers: authHeader() });
};

const RoomService = {
  getAllRooms,
  getAllBookings,
  addRoom,
  getUserBookings,
  deleteRoom,
  updateRoom,
};

export default RoomService;
