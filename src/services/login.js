import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

// ! USERDATA ES { USERNAME , PASSWORD }
const login = async (userData) => {
    const response = await axios.post(URL + '/users/login', userData);
    return response.data;
};

export default login;

