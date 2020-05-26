import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://manny-mgmt-server.herokuapp.com' : 'http://localhost:8080'
});