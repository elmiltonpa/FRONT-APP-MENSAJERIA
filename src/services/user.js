import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

const getUserData = async (token,username) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
            };
    const response = await axios.get(URL + '/users/' + username, config);
    return response.data;
};

export default getUserData; 