import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/orders';

class PrasadService {
  createOrder(orderData) {
    return axios.post(API_URL + '/create', orderData, { headers: authHeader() });
  }

  getUserOrders(userId) {
    return axios.get(API_URL + '/user/' + userId, { headers: authHeader() });
  }

  getAllOrders() {
    return axios.get(API_URL + '/all', { headers: authHeader() });
  }
}

export default new PrasadService();
