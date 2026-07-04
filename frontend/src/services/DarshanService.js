import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/darshan';

const getAvailability = (date, slot) => {
  return axios.get(`${API_URL}/availability`, {
    params: { date, slot }
  });
};

const bookSlot = (bookingData) => {
  return axios.post(`${API_URL}/book`, bookingData, { headers: authHeader() });
};

const getUserSlots = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`, { headers: authHeader() });
};

const checkInDevotee = (id) => {
  return axios.post(`${API_URL}/checkin/${id}`, {}, { headers: authHeader() });
};

const getAllBookings = () => {
  return axios.get(`${API_URL}/all`, { headers: authHeader() });
};

const DarshanService = {
  getAvailability,
  bookSlot,
  getUserSlots,
  checkInDevotee,
  getAllBookings
};

export default DarshanService;
