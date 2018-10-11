import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://onlineorderingsite.firebaseio.com/',
});

export default instance;
