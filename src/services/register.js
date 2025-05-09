import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

// ! USERDATA ES { USERNAME , EMAIL , PASSWORD }
const register = async (userData) => {
    const response = await axios.post(URL + '/users/register', userData);
    console.log('aca ', response.data);
    return response.data;
};




export default register;


