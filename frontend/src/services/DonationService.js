import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'https://temple-seva-portal-1.onrender.com/api/donations/';

const getAllDonations = () => {
  return axios.get(API_URL + 'all', { headers: authHeader() });
};

const createDonation = (donation) => {
  return axios.post(API_URL + 'create', donation, { headers: authHeader() });
};

const getUserDonations = (userId) => {
  return axios.get(API_URL + 'user/' + userId, { headers: authHeader() });
};

const DonationService = {
  getAllDonations,
  createDonation,
  getUserDonations,
};

export default DonationService;
