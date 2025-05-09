<script setup>
import { useUserStore } from '../../stores/userStore.js'
import { computed } from 'vue'
const userStore = useUserStore()

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})
const isOwnMessage = computed(() => {
    return props.message.sender === userStore.user.username
})
</script>

<template>
    <div class="d-flex" :class="{ 'justify-end': isOwnMessage }">
        <v-card
            :class="[
                'message-card',
                isOwnMessage ? 'message-own' : 'message-other',
                'pa-3',
                'mb-2'
            ]"
            :color="isOwnMessage ? 'primary' : 'grey-lighten-3'"
            :elevation="1"
            max-width="70%"
        >
            <p class="text-body-1 mb-0" :class="{ 'text-white': isOwnMessage }">
                {{ message.content }}
            </p>
        </v-card>
    </div>
</template>

<style scoped>
.message-card {
    border-radius: 12px;
}

.message-own {
    border-top-right-radius: 4px;
}

.message-other {
    border-top-left-radius: 4px;
}
</style>