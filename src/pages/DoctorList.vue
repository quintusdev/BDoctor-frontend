<script>
import axios from 'axios';
import AppJumbotronPagine from '../components/AppJumbotronPagine.vue';
import { store } from '../store.js';
// import AppLoader from '../components/AppLoader.vue';
import DoctorCard from '../components/DoctorCard.vue';

export default {
  name: 'DoctorList',
  components: {
    // AppLoader,
    DoctorCard,
    AppJumbotronPagine,
  },
  data() {
    return {
      store,
      doctors: [],
      //   currentPage: 1,
      //   lastPage: null
    }
  },
  created() {
    this.getDoctors();
    /* this.getUsers(); */
  },
  methods: {
    getDoctors() {
      /* this.store.loading = true; */
      axios.get(`${this.store.baseUrl}/api/doctors`).then((response) => {
        // Verifica che la risposta contenga i dati dei dottori
        if (response.data && response.data.results) {
          // Assegna i dati dei dottori all'array doctors
          this.doctors = response.data.results;
        } else {
          console.error('La risposta API non contiene i dati dei dottori:', response.data.results);
        }
      })
      .catch((error) => {
        console.error('Errore nella chiamata API:', error);
      });
    },
    /* getUsers() {
      axios.get(`${this.store.baseUrl}/api/users`).then((response) => {
        // Verifica che la risposta contenga i dati dei dottori
        if (response.data && response.data.results) {
          // Assegna i dati dei dottori all'array doctors
          this.doctors = response.data.results;
        } else {
          console.error('La risposta API non contiene i dati dei dottori:', response.data.results);
        }
      })
      .catch((error) => {
        console.error('Errore nella chiamata API:', error);
      });
    }, */
  }
};
</script>

<template>
  <AppJumbotronPagine />
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center my-4">Dottori</h1>
        <div class="col-md-6 my-1" v-for="doctor in doctors" :key="doctor.id">
          <DoctorCard :doctorData="doctor" />
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
@use '../styles/generals.scss';
</style>