import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'https://temple-seva-portal-1.onrender.com/api/events/';

const getActiveEvents = () => {
  return axios.get(API_URL + 'active');
};

const addEvent = (event) => {
  return axios.post(API_URL + 'add', event, { headers: authHeader() });
};

const deleteEvent = (id) => {
  return axios.delete(API_URL + 'delete/' + id, { headers: authHeader() });
};

const EventService = {
  getActiveEvents,
  addEvent,
  deleteEvent,
};

export default EventService;
