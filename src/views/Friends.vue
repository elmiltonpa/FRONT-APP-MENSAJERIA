<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import { searchUsers, sendFriendRequest, getFriendRequests, acceptFriendRequest, rejectFriendRequest, getFriends } from '../services/friends.js'
import { createChat } from '../services/chat.js'

const userStore = useUserStore()
const searchQuery = ref('')
const searchResults = ref([])
const friendRequests = ref([])
const friends = ref([])
const loading = ref(false)
const loadingRequests = ref(false)
const hasSearched = ref(false)

const searchUsersHandler = async () => {
    if (!searchQuery.value.trim()) {
        searchResults.value = []
        hasSearched.value = false
        return
    }
    
    try {
        loading.value = true
        hasSearched.value = true
        const results = await searchUsers(searchQuery.value, userStore.token)
        // Filtrar usuarios que ya son amigos
        searchResults.value = results.filter(user => 
            !friends.value.some(friend => friend.username === user.username) &&
            user.username !== userStore.user.username
        )
    } catch (error) {
        console.error('Error al buscar usuarios:', error)
        alert('Error al buscar usuarios')
    } finally {
        loading.value = false
    }
}

const sendRequest = async (username) => {
    try {
        await sendFriendRequest(username)
        alert('Solicitud enviada exitosamente')
        searchUsersHandler()
    } catch (error) {
        console.error('Error al enviar solicitud:', error)
        alert('Error al enviar solicitud de amistad')
    }
}

const loadFriendRequests = async () => {
    try {
        loadingRequests.value = true
        const requests = await getFriendRequests()
        friendRequests.value = requests
    } catch (error) {
        console.error('Error al cargar solicitudes:', error)
        alert('Error al cargar solicitudes de amistad')
    } finally {
        loadingRequests.value = false
    }
}

const acceptRequest = async (requestId,userId) => {
    try {
        await acceptFriendRequest(requestId)
        await loadFriendRequests()
        await createChat(userStore.user.token,userId)
        alert('Solicitud aceptada')
    } catch (error) {
        console.error('Error al aceptar solicitud:', error)
        alert('Error al aceptar solicitud')
    }
}

const rejectRequest = async (requestId) => {
    try {
        await rejectFriendRequest(requestId)
        await loadFriendRequests()
        alert('Solicitud rechazada')
    } catch (error) {
        console.error('Error al rechazar solicitud:', error)
        alert('Error al rechazar solicitud')
    }
}

const loadFriends = async () => {
    try {
        const response = await getFriends()
        friends.value = response
    } catch (error) {
        console.error('Error al cargar amigos:', error)
    }
}

onMounted(async () => {
    await Promise.all([
        loadFriendRequests(),
        loadFriends()
    ])
})
</script>

<template>
    <v-container>
        <v-row>
            <!-- Búsqueda de usuarios -->
            <v-col cols="12" md="6">
                <v-card class="mb-4">
                    <v-card-title>Buscar Usuarios</v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="searchQuery"
                            label="Buscar por nombre de usuario"
                            prepend-inner-icon="mdi-magnify"
                            @keyup.enter="searchUsersHandler"
                        ></v-text-field>
                        
                        <v-list v-if="searchResults.length > 0">
                            <v-list-item
                                v-for="user in searchResults"
                                :key="user.username"
                                :title="user.username"
                            >
                                <template v-slot:append>
                                    <v-btn
                                        color="primary"
                                        variant="text"
                                        @click="sendRequest(user.username)"
                                    >
                                        Agregar
                                    </v-btn>
                                </template>
                            </v-list-item>
                        </v-list>
                        
                        <v-alert
                            v-else-if="hasSearched && searchQuery"
                            type="info"
                            text="No se encontraron usuarios"
                        ></v-alert>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Solicitudes pendientes -->
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>
                        Solicitudes de Amistad
                        <v-spacer></v-spacer>
                        <v-btn
                            icon="mdi-refresh"
                            @click="loadFriendRequests"
                            :loading="loadingRequests"
                        ></v-btn>
                    </v-card-title>
                    
                    <v-card-text>
                        <v-list v-if="friendRequests.length > 0">
                            <v-list-item
                                v-for="request in friendRequests"
                                :key="request.id"
                                :title="request.sender.username"
                            >
                                <template v-slot:append>
                                    <v-btn
                                        color="success"
                                        variant="text"
                                        class="mr-2"
                                        @click="acceptRequest(request._id,request.sender.id)"
                                    >
                                        Aceptar
                                    </v-btn>
                                    <v-btn
                                        color="error"
                                        variant="text"
                                        @click="rejectRequest(request._id)"
                                    >
                                        Rechazar
                                    </v-btn>
                                </template>
                            </v-list-item>
                        </v-list>
                        
                        <v-alert
                            v-else
                            type="info"
                            text="No hay solicitudes pendientes"
                        ></v-alert>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.v-card {
    border-radius: 12px;
}
</style>
