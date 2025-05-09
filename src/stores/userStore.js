import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)

    const setUser = (userData) => {
        user.value = userData
        if (userData) {
            localStorage.setItem('session', JSON.stringify(userData))
        } else {
            localStorage.removeItem('session')
        }
    }

    const initUser = () => {
        const session = localStorage.getItem('session')
        if (session) {
            user.value = JSON.parse(session)
        }
    }

    return {
        user,
        setUser,
        initUser
    }
})