import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import DoctorList from './pages/DoctorList.vue';
import ComeFunziona from './pages/ComeFunziona.vue'

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
        },
        {
            path: '/come-funziona',
            name: 'come-funziona',
            component: ComeFunziona
        }
    ]
});

export { router }