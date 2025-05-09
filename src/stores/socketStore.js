// stores/socketStore.js
import { defineStore } from "pinia";
import { connectSocket, disconnectSocket, sendPrivateMessage, onNewMessage, offNewMessage } from "../services/socket";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    isConnected: false,
    lastMessage: null,
    connectionError: null,
    messageHistory: [],
  }),

  actions: {
    connect(username) {
      try {
        connectSocket(username);
        this.isConnected = true;
        this.connectionError = null;
      } catch (error) {
        this.connectionError = error;
        console.error("Error al conectar socket:", error);
      }
    },

    disconnect() {
      try {
        disconnectSocket();
        this.isConnected = false;
        this.connectionError = null;
      } catch (error) {
        this.connectionError = error;
        console.error("Error al desconectar socket:", error);
      }
    },

    sendMessage(to, message) {
      try {
        sendPrivateMessage(to, message);
        this.messageHistory.push({
          to,
          message,
          timestamp: new Date(),
          sent: true,
        });
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    },

    setupMessageListener(callback) {
      onNewMessage((message) => {
        this.lastMessage = message;
        this.messageHistory.push({
          ...message,
          timestamp: new Date(),
          received: true,
        });
        if (callback) callback(message);
      });
    },

    removeMessageListener() {
      offNewMessage();
    },

    clearMessageHistory() {
      this.messageHistory = [];
    },
  },

  getters: {
    getMessageHistory: (state) => state.messageHistory,
    getLastMessage: (state) => state.lastMessage,
    getConnectionStatus: (state) => state.isConnected,
    getConnectionError: (state) => state.connectionError,
  },
});
