import { reactive } from 'vue';

export const store = reactive({
    baseUrl: 'http://localhost:8000',
    loading: true,
    doctors: [],
    users: [],
    specializations: ['Cardiologia', 'Ortopedia', 'Chirurgia', 'Ostetricia', 'Odontostomatologia', 'Pneumologia', 'Neurologia', 'Psichiatria'],
    nameSearched: '',
    SpecSelected: '',
})
