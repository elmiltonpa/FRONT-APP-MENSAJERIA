<script setup>
import { useChatStore } from '../../stores/chatStores'
import { useUserStore } from '../../stores/userStore'
import { computed, ref } from 'vue'
import Chat from '../chatList/Chat.vue'

const userStore = useUserStore()
const chatStore = useChatStore()
const search = ref('')
const chats = computed(() => chatStore.chatList)

const getOtherUser = (chat) => {
    return chat.users.find(user => user.username !== userStore.user.username)
}
</script>

<template>
    <div v-if="userStore.user" class="chat-list">
        <div class="pa-4">

            <h2 v-if="userStore.user" class="text-h6 font-weight-bold mb-4">Conversaciones de {{ userStore.user.username }}</h2>
            <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Buscar conversación"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-"
                autocomplete="off"
            ></v-text-field>
        </div>
        
        <v-divider></v-divider>
        
        <div class="chat-list-content">
                 <Chat
                 v-for="chat in chats"
                 :key="chat.id"
                 :username="getOtherUser(chat).username"
                 :lastMessage="chat.latestMessage ? chat.latestMessage.content : 'No hay mensajes'"  
                 :date="chat.latestMessage ? chat.latestMessage.createdAt : chat.createdAt"
                 :chatId="chat.id"
                 />
        </div>
    </div>
</template>

<style scoped>
.chat-list {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.chat-list-content {
    flex-grow: 1;
    overflow-y: auto;
    height: calc(100vh -180px); /* Ajustamos la altura para considerar el header y el campo de búsqueda */
}

/* Estilos para la barra de scroll */
.chat-list-content::-webkit-scrollbar {
    width: 6px;
}

.chat-list-content::-webkit-scrollbar-track {
    background: transparent;
}

.chat-list-content::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}
</style>


