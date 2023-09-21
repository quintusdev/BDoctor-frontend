import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import DoctorList from './pages/DoctorList.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/doctors',
            name: 'doctors',
            component: DoctorList
        }
    ]
});

export { router }