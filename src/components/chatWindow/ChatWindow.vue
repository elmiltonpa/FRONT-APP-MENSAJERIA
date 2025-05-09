<script setup>
import { useChatStore } from '../../stores/chatStores'
import { computed, onMounted,ref ,watch } from 'vue'
import MessagesList from './MessagesList.vue'
import ChatImput from './ChatImput.vue'
import ChatHeader from './ChatHeader.vue'
import { useUserStore } from '../../stores/userStore.js'
import { getOtherUser } from '../../utils/utils.js'
import { getChatInfo } from '../../services/chat.js'
import { useSocketStore } from '../../stores/socketStore'

const chatStore = useChatStore()
const userStore = useUserStore()
const socketStore = useSocketStore()
const chatId = computed(() => chatStore.selectedChat)
const otherUser = ref(null)
const messagesContainer = ref(null)

const scrollToBottom = () => {
    setTimeout(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
    }, 100)
}

const getMessagesChat = async () => {
    try {
        if (!chatId.value) {
            return
        }
        const response = await getChatInfo(userStore.user.token, chatId.value)
        otherUser.value = getOtherUser(response.chat, userStore.user.username)
        chatStore.otherUser = otherUser.value
        chatStore.messages = response.messages.map(message => ({
            content: message.content,
            sender: message.sender.username
        }))
        scrollToBottom()
    } catch (error) {
        console.error('Error al obtener mensajes del chat:', error)
    }
}

// Observar cambios en chatId
watch(chatId, (newChatId) => {
    if (newChatId) {
        getMessagesChat()
    } else {
        chatStore.messages = []
    }
})

onMounted(() => {
    getMessagesChat()

    // Escuchar nuevos mensajes
    socketStore.setupMessageListener((message) => {
        // Solo actualizamos la lista de chats para reflejar el nuevo mensaje
        getMessagesChat()
    })
})

</script>

<template>
    <div class="chat-window-container">
        <div v-if="chatId && otherUser" class="d-flex flex-column h-100">
            <div class="chat-header">
                <ChatHeader :username="otherUser" />
            </div>
            <div class="chat-messages" ref="messagesContainer">
                <MessagesList  />
            </div>
            <div class="chat-input">
                <ChatImput />
            </div>
        </div>
        <div v-else class="d-flex align-center justify-center h-100">
            <h1>No hay chat seleccionado</h1>
        </div>
    </div>
</template>

<style scoped>
.chat-window-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.chat-header {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: rgb(233, 232, 232);
}

.chat-messages {
    flex-grow: 1;
    overflow-y: scroll;
    padding: 16px;
    height: calc(100vh - 150px); /* Altura total menos header e input */
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

/* Estilos para la barra de scroll en Chrome/Safari */
.chat-messages::-webkit-scrollbar {
    width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
    background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.chat-input {
    position: sticky;
    bottom: 0;
    background-color: white;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
}
</style>