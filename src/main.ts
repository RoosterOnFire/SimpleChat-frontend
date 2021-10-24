import './styles.css';
import { createApp } from 'vue';
import App from './App.vue';
import Router from '@/router/Router';
import { store, key } from '@/store/Store';

createApp(App).use(store, key).use(Router).mount('#app');
