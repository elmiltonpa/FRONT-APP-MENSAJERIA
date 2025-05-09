<script setup>
import { ref } from 'vue'
import { sendMessage } from '../../services/message.js'
import { useUserStore } from '../../stores/userStore.js'
import { useChatStore } from '../../stores/chatStores.js'
import { useSocketStore } from '../../stores/socketStore'
import { getChats } from '../../services/chat.js'

const userStore = useUserStore()    
const chatStore = useChatStore()
const socketStore = useSocketStore()
const message = ref('')

const scrollToBottom = () => {
    setTimeout(() => {
        const messagesContainer = document.querySelector('.chat-messages')
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight
        }
    }, 100)
}

const updateChatList = async () => {
    try {
        const response = await getChats(userStore.user.token)
        chatStore.chatList = response.chats
    } catch (error) {
        console.error('Error al actualizar lista de chats:', error)
    }
}

const handleSendMessage = async () => {
    try {
        if (!message.value.trim()) return;

        const response = await sendMessage(userStore.user.token, chatStore.selectedChat, message.value);
        
        if (response?.data?.content && response?.data?.sender?.username) {
            chatStore.messages.push({
                content: response.data.content,
                sender: response.data.sender.username
            });
            socketStore.sendMessage(chatStore.otherUser, message.value);
            message.value = '';
          
            await updateChatList();
        } else {
            console.error('La respuesta no tiene la estructura esperada:', response);
        }
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
    }
}

</script>

<template>
    <div class="chat-input">
        <v-textarea
            v-model="message"
            label="Mensaje"
            variant="outlined"
            density="compact"
            hide-details
            auto-grow
            rows="1"
            @keyup.enter="handleSendMessage"
            class="chat-textarea"
            autocomplete="off"
        ></v-textarea>    
        <v-btn @click="handleSendMessage" color="primary">
            Enviar
        </v-btn>
    </div>
</template>

<style scoped>
.chat-input {
    display: flex;
    gap: 8px;
    padding: 16px;
    background-color: white;
}

.chat-textarea {
    flex-grow: 1;
}

:deep(.v-field__input) {
    min-height: 40px !important;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
}
</style>