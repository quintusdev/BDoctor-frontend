import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import DoctorList from './pages/DoctorList.vue';
import ComeFunziona from './pages/ComeFunziona.vue';
import DoctorDetail from './pages/DoctorDetail.vue';
import AdvanceSearch from './pages/AdvanceSearch.vue'

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
        },
        {
            path: '/doctors/:doctor_id', // Nota l'uso di `:` per definire il parametro dinamico
            name: 'DoctorDetail',
            component: DoctorDetail,
            props: true // Per passare i parametri come props alla componente
        },
        {
            path: '/ricerca-avanzata',
            name: 'advance-search',
            component: AdvanceSearch
        },
    ]
});

export { router }