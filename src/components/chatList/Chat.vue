<script setup> 
import { useChatStore } from '../../stores/chatStores'

const chatStore = useChatStore()

const props = defineProps({
    username: {
        type: String,
        required: true
    },
    lastMessage: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    chatId: {
        type: String,
        required: true
    }
})

const handleClick = () => {
    chatStore.selectedChat = props.chatId
}

const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' }
    if (date) {
        return new Date(date).toLocaleDateString('es-ES', options)
    } else {
        return 
    }
}
</script>

<template>
    <button @click="handleClick" class="chat-button pa-4">
        <div class="d-flex align-center">
            <v-avatar color="primary" class="mr-3">
            </v-avatar>
            <div class="flex-grow-1">
                <div class="d-flex justify-space-between align-center">
                    <h3 class="text-subtitle-1 font-weight-bold mb-1">{{ username }}</h3>
                    <span class="text-caption text-medium-emphasis">{{ formatDate(date) }}</span>
                </div>
                <p class="text-body-2 text-medium-emphasis text-truncate mb-0">{{ lastMessage }}</p>
            </div>
        </div>
    </button>
</template>

<style scoped>
.chat-button {
    width: 100%;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.chat-button:hover {
    background-color: rgba(0, 0, 0, 0.04);
}
</style>
