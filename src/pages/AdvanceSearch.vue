<script>
import axios from 'axios';
import AppJumbotronPagine from '../components/AppJumbotronPagine.vue';
import AppSelectSpecialization from '../components/AppSelectSpecialization.vue';
import AppSelectVotes from '../components/AppSelectVotes.vue';
import AppSearch from '../components/AppSearch.vue';
import { store } from '../store.js';
// import AppLoader from '../components/AppLoader.vue';
import DoctorCard from '../components/DoctorCard.vue';

export default {
  name: 'DoctorList',
  components: {
    // AppLoader,
    DoctorCard,
    AppJumbotronPagine,
    AppSelectSpecialization,
    AppSelectVotes,
    AppSearch,
  },
  props: {
    doctorData: Object,
  },
  data() {
    return {
      store,
      searchTerm: '', // Termine di ricerca inserito dall'utente
      doctors: [],
      selectedSpecialization: '', // Specializzazione selezionata nel menu a tendina

      // Filtri
      filterOption1: false,
      filterOption2: false,
    };
  },
  created() {
    this.getDoctors();
  },
  mounted() {
    this.nameSearched()
  },
  methods: {
    nameSearched() {
      let myUrl = `${store.baseUrl}/api/doctors/search`;

      const queryParams = [];

      if (store.nameSearched !== '') {
        queryParams.push(`name=${store.nameSearched}`);
      }

      if (store.SpecSelected !== '') {
        queryParams.push(`specialization=${store.SpecSelected}`);
      }

      if (store.VoteSelected !== '') {
        queryParams.push(`average_vote=${store.VoteSelected}`);
      }

      if (queryParams.length > 0) {
        myUrl += '?' + queryParams.join('&');
      }

      axios.get(myUrl).then((response) => {
        store.doctors = response.data.results;
        store.load = false
      })

    },

    getDoctors() {
      axios.get(`${this.store.baseUrl}/api/doctors`)
        .then((response) => {
          // Verifica che la risposta contenga i dati dei dottori
          if (response.data && response.data.results) {
            // Assegna i dati dei dottori all'array doctors
            this.doctors = response.data.results;

            // Ora, per ogni dottore, esegui una chiamata separata per ottenere la media dei voti
            this.doctors.forEach((doctor) => {
            // Effettua una richiesta API per ottenere la media dei voti del dottore
            axios.get(`${this.store.baseUrl}/api/doctor/${doctor.id}/averageVotes`).then((averageVotes) => {
                    // Assegna la media dei voti al dottore corrispondente
                    doctor.averageRating = averageVotes.data.average_vote;
                })
                .catch((error) => {
                    console.error('Errore nella chiamata API della media dei voti:', error);
                });
            });
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
    <div class="row d-flex flex-row mt-5">
      
        <h1>Ricerca Avanzata</h1>
        <div class="col-12 col-md-3 my-1">
            <h6>Nome e Cognome</h6>
            <AppSearch @search="nameSearched" />
        </div>
        <div class="col-12 col-md-3 my-1">
          <AppSelectSpecialization @search="nameSearched" />
        </div>
        <div class="col-12 col-md-3 my-1">
          <AppSelectVotes @search="nameSearched" />
        </div>
        <div class="col-12 col-md-3 my-1">
          <AppSelectReviews @search="nameSearched" />
        </div>
      
    </div>
  </div>
  <!-- per primi andrebbero visualizzate le schede in evidenza -->
  <div class="container">
    <div class="row d-flex flex-row" v-if="store.doctors.length > 0">
      <h1 class="text-center my-4">Risultati di ricerca</h1>
      <div class="col-12 col-md-6 my-1" v-for="doctor in store.doctors" :key="doctor.id">
        <DoctorCard :doctorData="doctor" />
      </div>
    </div>
    <div class="row d-flex flex-row" v-else>
      <h1 class="text-center my-4">Risultati di ricerca</h1>
      <div class="alert alert-danger" role="alert">
        Nessun dottore trovato
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/generals.scss';
</style>