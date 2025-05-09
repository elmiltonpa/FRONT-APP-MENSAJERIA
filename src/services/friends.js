import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    return {
        headers: {
            Authorization: `Bearer ${session.token}`
        }
    };
};

export const searchUsers = async (query) => {
    const response = await axios.get(`${URL}/friends/users/search?q=${query}`, getAuthHeader());
    return response.data;
};

export const sendFriendRequest = async (username) => {
    const response = await axios.post(`${URL}/friends/request`, { username }, getAuthHeader());
    return response.data;
};

export const getFriendRequests = async () => {
    const response = await axios.get(`${URL}/friends/requests`, getAuthHeader());
    return response.data;
};

export const acceptFriendRequest = async (requestId) => {
    const response = await axios.post(`${URL}/friends/accept/${requestId}`, {}, getAuthHeader());
    return response.data;
};

export const rejectFriendRequest = async (requestId) => {
    const response = await axios.post(`${URL}/friends/reject/${requestId}`, {}, getAuthHeader());
    return response.data;
};

export const getFriends = async () => {
    const response = await axios.get(`${URL}/friends/friends`, getAuthHeader());
    console.log(response.data);
    return response.data;
}; 