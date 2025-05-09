<script setup>
import { useUserStore } from './stores/userStore'
import { useRouter } from 'vue-router'
import Sidebar from './components/sidebar/Sidebar.vue'
import { onMounted } from 'vue'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
    userStore.initUser()
})
</script>

<template>
    <v-app>
        <v-layout class="layout-container">
            <Sidebar v-if="userStore.user" />
            <v-main class="main-content">
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-app>
</template>

<style>
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
}

.v-application {
    height: 100vh;
    overflow: hidden;
}

.layout-container {
    height: 100vh;
    overflow: hidden;
}

.main-content {
    height: 100vh;
    overflow: hidden;
}
</style>
