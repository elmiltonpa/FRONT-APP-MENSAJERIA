<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import ChatList from '../components/chatList/ChatList.vue'
import ChatWindow from '../components/chatWindow/ChatWindow.vue'
import { getChats } from '../services/chat.js'
import { useChatStore } from '../stores/chatStores'
import { useUserStore } from '../stores/userStore'
import { useSocketStore } from '../stores/socketStore'

const router = useRouter()
const chatStore = useChatStore()
const userStore = useUserStore()
const socketStore = useSocketStore()
const loading = ref(true)

const getUserChats = async () => {
    try {
        loading.value = true
        const response = await getChats(userStore.user.token)
        chatStore.chatList = response.chats
    } catch (err) {
        console.error('Error al obtener chats del usuario:', err)
    } finally {
        loading.value = false
    }
}

// Verificar si hay sesión al montar el componente
onMounted(() => {
    if (!userStore.user) {
        router.push('/login')
        return
    }

    getUserChats()
    socketStore.connect(userStore.user.username)

    socketStore.setupMessageListener((message) => {
        // Solo actualizamos la lista de chats
        getUserChats()
    })
})

// Observar cambios en el usuario
watch(() => userStore.user, (newUser) => {
    if (!newUser) {
        router.push('/login')
    }
})

onUnmounted(() => {
    socketStore.removeMessageListener()
})
</script>

<template>
    <div v-if="userStore.user" class="home-container">
        <div class="content-wrapper">
            <div class="chat-list-container">
                <ChatList />
            </div>
            <div class="chat-window-container">
                <ChatWindow />
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.content-wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.chat-list-container {
    width: 350px;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    height: 100%;
    overflow: hidden;
}

.chat-window-container {
    flex-grow: 1;
    height: 100%;
    overflow: hidden;
}
</style>
