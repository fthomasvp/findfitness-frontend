import axios from 'axios';

const API = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
});

export default API;
