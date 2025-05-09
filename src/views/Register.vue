<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import register from '../services/register';

const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const loading = ref(false);
const errors = ref({});


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        loading.value = true;
        await register({ username: username.value, email: email.value, password: password.value });
        alert('Registro exitoso. Por favor inicia sesión.');
        router.push('/login');
    } catch (error) {
        console.error('Error en el registro:', error);
        alert('Error al registrar: ' + (error.message || 'Error desconocido'));
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="register-container">
        <v-card class="register-card" elevation="3">
            <v-card-title class="text-h4 text-center py-4">
                Crear Cuenta
            </v-card-title>
            
            <v-card-text>
                <v-form @submit.prevent="handleSubmit">
                    <v-text-field
                        v-model="username"
                        label="Usuario"
                        variant="outlined"
                        prepend-inner-icon="mdi-account"
                        :error-messages="errors.username"
                        @input="errors.username = ''"
                    ></v-text-field>

                    <v-text-field
                        v-model="email"
                        label="Correo Electrónico"
                        variant="outlined"
                        prepend-inner-icon="mdi-email"
                        type="email"
                        :error-messages="errors.email"
                        @input="errors.email = ''"
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

                    <v-text-field
                        v-model="confirmPassword"
                        label="Confirmar Contraseña"
                        variant="outlined"
                        prepend-inner-icon="mdi-lock-check"
                        :type="showPassword ? 'text' : 'password'"
                        :error-messages="errors.confirmPassword"
                        @input="errors.confirmPassword = ''"
                    ></v-text-field>

                    <v-btn
                        type="submit"
                        color="primary"
                        block
                        size="large"
                        class="mt-4"
                        :loading="loading"
                    >
                        Registrarse
                    </v-btn>
                </v-form>
            </v-card-text>

            <v-card-actions class="justify-center pb-4">
                <router-link to="/login" class="text-decoration-none">
                    ¿Ya tienes cuenta? Inicia sesión
                </router-link>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style scoped>
.register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 16px;
}

.register-card {
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
