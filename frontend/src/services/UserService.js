import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/users/';

const getAllUsers = () => {
  return axios.get(API_URL + 'all', { headers: authHeader() });
};

const getUserCount = () => {
  return axios.get(API_URL + 'count', { headers: authHeader() });
};

const addUser = (userData) => {
  return axios.post(API_URL + 'add', userData, { headers: authHeader() });
};

const updateUser = (id, userData) => {
  return axios.put(API_URL + 'update/' + id, userData, { headers: authHeader() });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + 'delete/' + id, { headers: authHeader() });
};

const UserService = {
  getAllUsers,
  getUserCount,
  addUser,
  updateUser,
  deleteUser,
};

export default UserService;
