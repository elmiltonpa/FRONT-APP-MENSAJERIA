<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const activeItem = ref('home')

const menuItems = [
    { title: 'Inicio', icon: 'mdi-home', route: '/' },
    { title: 'Amigos', icon: 'mdi-account-group', route: '/friends' },
]

const navigateTo = (route) => {
    router.push(route)
    activeItem.value = route
}

const handleLogout = () => {
    localStorage.removeItem('session')
    userStore.user = null
    router.push('/login')
}
</script>

<template>
    <div
            width="80"
            class="sidebar"
        >
            <v-list class="d-flex flex-column align-center px-1 h-100 ">
                <div class="flex-grow-1">
                    <v-list-item
                        v-for="item in menuItems"
                        :key="item.route"
                        :value="item.route"
                        :active="activeItem === item.route"
                        @click="navigateTo(item.route)"
                        class="mb-1"
                        min-height="55"
                        style="padding: 0;"
                    >
                        <v-tooltip
                            :text="item.title"
                            location="right"
                        >
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    icon
                                    size="large"
                                    v-bind="props"
                                    :color="activeItem === item.route ? 'primary' : 'grey-darken-1'"
                                    class="ma-0"
                                >
                                    <v-icon size="large" :color="activeItem === item.route ? 'white' : 'grey-darken-1'">{{ item.icon }}</v-icon>
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </v-list-item>
                </div>

                <v-list-item
                    class="mb-4"
                    min-height="30"
                    style="padding: 0;"
                >
                    <v-tooltip
                        text="Cerrar sesión"
                        location="right"
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                icon
                                size="large"
                                v-bind="props"
                                color="error"
                                class="ma-0"
                                @click="handleLogout"
                            >
                                <v-icon size="large">mdi-logout</v-icon>
                            </v-btn>
                        </template>
                    </v-tooltip>
                </v-list-item>
            </v-list>
        </div>
</template>

<style scoped>
.sidebar {
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    padding: 0;
    width: 80px !important;
    min-width: 80px !important;
    max-width: 80px !important;
    flex-shrink: 0;
}

.v-list-item {
    padding: 4px;
}

:deep(.v-btn) {
    width: 48px;
    height: 48px;
    padding: 0 !important;
}

:deep(.v-btn__content) {
    padding: 0 !important;
}
</style>


