import "./assets/main.css";
import "../services/firebase.js"
import { useAuthStore } from "./stores/authStore";
import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(createPinia());
app.use(router);

const authStore = useAuthStore();
authStore.init();

app.mount("#app");
