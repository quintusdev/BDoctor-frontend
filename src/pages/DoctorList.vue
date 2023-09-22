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
  },
  methods: {
    getDoctors() {
      axios.get(`${this.store.baseUrl}/api/doctors`)
        .then((response) => {
          // Verifica che la risposta contenga i dati dei dottori
          if (response.data && response.data.results) {
            // Assegna i dati dei dottori all'array doctors
            this.doctors = response.data.results;
            // Ora, per ogni dottore, esegui una chiamata separata per ottenere le specializzazioni
            this.doctors.forEach((doctor) => {
              axios.get(`${this.store.baseUrl}/api/doctors/${doctor.id}/specializations`)
                .then((specializationsResponse) => {
                  // Verifica che la risposta contenga i dati delle specializzazioni
                  if (specializationsResponse.data) {
                    // Assegna i dati delle specializzazioni al dottore corrispondente
                    doctor.specializations = specializationsResponse.data.results;
                  }
                })
                .catch((error) => {
                  console.error('Errore nella chiamata API delle specializzazioni:', error);
                });
            });
          } else {
            console.error('La risposta API non contiene i dati dei dottori:', response.data.results);
          }
        })
        .catch((error) => {
          console.error('Errore nella chiamata API dei dottori:', error);
        });
      },
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