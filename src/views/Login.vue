<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import login from '../services/login';

const router = useRouter();
const userStore = useUserStore();
const username = ref('');
const password = ref('');
const showPassword = ref(false);
const errors = ref({});
const loading = ref(false);

const loginUser = async (e) => {
    e.preventDefault();
    loading.value = true;
        
    try {
        const response = await login({ username: username.value, password: password.value });

        const userData = {
            username: response.username,
            token: response.token
        };
        
        userStore.setUser(userData);
        router.push('/');
    } catch (error) {
        console.log('Error en el inicio de sesión:', error);
        alert('Error al iniciar sesión: ' + (error.message || 'Error desconocido'));
    } finally {
        loading.value = false;
    }
}
    
</script>

<template>
    <div class="login-container">
        <v-card class="login-card" elevation="3">
            <v-card-title class="text-h4 text-center py-4">
                Iniciar Sesión
            </v-card-title>
            
            <v-card-text>
                <v-form @submit.prevent="loginUser">
                    <v-text-field
                        v-model="username"
                        label="Usuario"
                        variant="outlined"
                        prepend-inner-icon="mdi-account"
                        :error-messages="errors.username"
                        @input="errors.username = ''"
                        autocomplete="off"
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        label="Contraseña"
                        variant="outlined"
                        prepend-inner-icon="mdi-lock"
                        :type="showPassword ? 'text' : 'password'"
                        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showPassword = !showPassword"
                        :error-messages="errors.password"
                        @input="errors.password = ''"

                    ></v-text-field>

                    <v-btn
                        type="submit"
                        color="primary"
                        block
                        size="large"
                        class="mt-4"
                        :loading="loading"
                    >
                        Iniciar Sesión
                    </v-btn>
                </v-form>
            </v-card-text>

            <v-card-actions class="justify-center pb-4">
                <router-link to="/register" class="text-decoration-none">
                    ¿No tienes cuenta? Regístrate
                </router-link>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 16px;
}

.login-card {
    width: 100%;
    max-width: 400px;
    border-radius: 12px;
}

.v-card-title {
    color: #1a237e;
    font-weight: 600;
}

.v-card-actions a {
    color: #1a237e;
    font-weight: 500;
}

.v-card-actions a:hover {
    text-decoration: underline !important;
}
</style>
