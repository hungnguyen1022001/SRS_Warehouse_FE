import { createApp } from 'vue';
import './style.css';

import App from './App.vue';
import i18n from './services/i18n.ts';
import router from './router/index.ts';
import { createPinia } from 'pinia';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);
app.use(i18n);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.component('VueDatePicker', VueDatePicker);
app.mount('#app');
