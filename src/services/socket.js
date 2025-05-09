import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_API_URL;

const socket = io(URL, {
    withCredentials: true,
    transports: ['websocket', 'polling']
});

export const connectSocket = (username) => {
    if (!socket.connected) {
        socket.connect();
        socket.emit('register user', username);
    }
};

export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};

export const sendPrivateMessage = (to, message) => {
    socket.emit('private message', { to, message });
};

export const onNewMessage = (callback) => {
    socket.on('new message', callback);
};

export const offNewMessage = () => {
    socket.off('new message');
};

export default socket; 