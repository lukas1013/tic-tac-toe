import axios from "axios";

import config from '../config';
const token = localStorage.getItem('token')

export default axios.create({
  baseURL: config.base_url,
  headers: {
    'Authorization': `Bearer ${token}`
  }
})