import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1867C0',    // Azul principal
          secondary: '#5CBBF6',  // Azul secundario
          accent: '#82B1FF',     // Azul acento
          error: '#FF5252',      // Rojo para errores
          info: '#2196F3',       // Azul para información
          success: '#4CAF50',    // Verde para éxito
          warning: '#FFC107',    // Amarillo para advertencias
          // Puedes agregar más colores personalizados
          'chat-bg': '#F5F5F5',  // Fondo para chats
          'chat-hover': '#E3F2FD', // Color hover para chats
          'chat-active': '#BBDEFB',
          gray: '#2E2E2E' // Color para chat activo
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#2196F3',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          'chat-bg': '#1E1E1E',
          'chat-hover': '#2C2C2C',
          'chat-active': '#3C3C3C',
          gray: '#2E2E2E',
        }
      }
    }
  }
})

export default vuetify
