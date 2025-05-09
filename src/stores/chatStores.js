import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const chatList = ref([])
  const selectedChat = ref(null)
  const messages = ref([])
  const otherUser = ref(null)
  return { chatList, selectedChat, messages, otherUser }
})
