<script setup>


const props = defineProps({
    username: {
        type: String,
        required: true
    }
})

</script>

<template>
    <div class="d-flex align-center justify-space-between pa-4">
        <v-avatar color="primary" class="mr-3">
        </v-avatar>
        <div class="flex-grow-1">
            <h1 class="text-h5 font-weight-bold mb-1">{{ username }}</h1>
        </div>
    </div>
</template>
