import axios from 'axios';


const URL = import.meta.env.VITE_API_URL;

// ? DEVUELVE ARRAY DE OBJETOS CON {name - isGroupChat - users - latestMessage - createdAt - updatedAt}
// ? DE TODOS LOS CHATS DEL USUARIO
const getChats = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(URL + '/chats/get-chats', config)

    return response.data;
}
// ? DEVUELVE OBJETO CON {name - isGroupChat - users - latestMessage - createdAt - updatedAt}
// ? PERO SOLO ESE CHAT CON CHATID
const getChatInfo = async (token, chatId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(URL + '/chats/chat-info/' + chatId, config)

    return response.data;
}

const createChat = async (token, userId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(URL + '/chats/create-chat',{userId}, config)

    return response.data;
}   

export { getChats, getChatInfo, createChat };
