import { reactive } from 'vue';

export const store = reactive({
    baseUrl: 'http://localhost:8000',
    loading: true,
    doctors: [],
    users: [],
    specializations: ['Cardiologia', 'Ortopedia', 'Chirurgia', 'Ostetricia', 'Odontostomatologia', 'Pneumologia', 'Neurologia', 'Psichiatria'],
    votes: ['1', '2', '3', '4', '5'],
    nameSearched: '',
    SpecSelected: '',
    VoteSelected: '',
})
