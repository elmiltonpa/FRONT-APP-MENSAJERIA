<script setup>
import Message from './Message.vue'
import { useChatStore } from '../../stores/chatStores.js'
import { computed, watch } from 'vue'

const chatStore = useChatStore()

const messages = computed(() => chatStore.messages)
</script>

<template>
    <div class="">
        <div v-for="message in messages" :key="message.id">
            <Message :message="message" />
        </div>
    </div>
    
</template>