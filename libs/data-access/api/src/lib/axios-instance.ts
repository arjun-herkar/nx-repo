import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.yourapp.com', // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});
