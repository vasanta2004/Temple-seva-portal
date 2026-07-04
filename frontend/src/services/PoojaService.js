import axios from 'axios';

const API_URL = 'http://localhost:8080/api/poojas';

const getAllPoojas = () => {
  return axios.get(API_URL + '/all');
};

const PoojaService = {
  getAllPoojas,
};

export default PoojaService;
