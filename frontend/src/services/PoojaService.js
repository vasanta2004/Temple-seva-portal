import axios from 'axios';

const API_URL = 'https://temple-seva-portal-1.onrender.com/api/poojas';

const getAllPoojas = () => {
  return axios.get(API_URL + '/all');
};

const PoojaService = {
  getAllPoojas,
};

export default PoojaService;
