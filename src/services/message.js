import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

// ? OBTIENE TODOS LOS MENSAJES DE UN CHAT
// ? DEVUELVE UN ARRAY DE OBJETOS QUE TIENE
   // {
    //   "chat": "68103176b4e91e479f6ca8c2",
    //   "sender": {
    //     "username": "milton",
    //     "id": "680eaab8a9932ec4b7619753"
    //   },
    //   "content": "Hola, ¿cómo estás? jejejeej",
    //   "seenBy": [],
    //   "createdAt": "2025-04-29T01:55:58.028Z",
    //   "updatedAt": "2025-04-29T01:55:58.028Z",
    //   "id": "681031aeb4e91e479f6ca8ca"
    // }
const getMessages = async (token, chatId) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(URL + '/chats/get-messages/' + chatId, config)

    return response.data;
}

// ? ENVIA UN MENSAJE A UN CHAT
const sendMessage = async (token, chatId, message) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(URL + '/chats/send-message', { chatId, content:message }, config)
    return response.data;
    // DEVULEVE UN OBJETOI QUE TIENE DATA Y STATUS OSEA SERIA RESPOSNE.DATA.DATA
    // ENTONCES CUANDO LLAMO A ESTO TENGO QUE HACER SENMESSAGE.DATA
}

export { getMessages, sendMessage };


    // {
    //   "chat": "68103176b4e91e479f6ca8c2",
    //   "sender": {
    //     "username": "milton",
    //     "id": "680eaab8a9932ec4b7619753"
    //   },
    //   "content": "Hola, ¿cómo estás? jejejeej",
    //   "seenBy": [],
    //   "createdAt": "2025-04-29T01:55:58.028Z",
    //   "updatedAt": "2025-04-29T01:55:58.028Z",
    //   "id": "681031aeb4e91e479f6ca8ca"
    // }
    