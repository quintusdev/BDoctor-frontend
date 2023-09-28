<script>
import axios from 'axios';
import AppSelectSpecialization from '../components/AppSelectSpecialization.vue';
import AppSelectVotes from '../components/AppSelectVotes.vue';
import AppSelectReviews from '../components/AppSelectReviews.vue';
import AppSearch from '../components/AppSearch.vue';
import { store } from '../store.js';
// import AppLoader from '../components/AppLoader.vue';
import DoctorCard from '../components/DoctorCard.vue';

export default {
  name: 'DoctorList',
  components: {
    // AppLoader,
    DoctorCard,
    AppSelectSpecialization,
    AppSelectVotes,
    AppSelectReviews,
    AppSearch,
  },
  props: {
    doctorData: Object,
  },
  data() {
    return {
      store,
      doctors: [],
      menuItems: [
        {
          label: 'Ricerca Avanzata',
          routeName: 'advance-search'
        },
      ]
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
      console.log(this.nameSearched)

      if (store.SpecSelected !== '') {
        queryParams.push(`specialization=${store.SpecSelected}`);
      }

      if (store.VoteSelected !== '') {
        queryParams.push(`avr_vote=${store.VoteSelected}`);
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
    <div class="row mt-5">
      <div class="col-12 my-3">
        <h1>Ricerca</h1>
        <div class="col-12 d-flex flex-row">
          <div class="">
            <h6>Nome e Cognome</h6>
            <AppSearch @search="nameSearched" />
          </div>
          <AppSelectSpecialization @search="nameSearched" />
          <AppSelectVotes />
          <AppSelectReviews/>
          <button class="btn btn-primary ms-2 align-self-end" v-for="(item, index) in menuItems" :key="index">
            <router-link class="link-nav-utente" :to="{ name: item.routeName }"><strong>{{
              item.label }}</strong></router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- SEZIONE PROFESSIONISTI IN EVIDENZA -->
  <div class="container">
    <div class="row">
      <div class="col-12 my-3">
        <h4>Professionisti in evidenza</h4>
        <!-- Contenuto della tua home -->
        <div v-if="loading">Caricamento...</div>
        <div v-else>
            <!-- Mostra i dati recuperati qui -->
            <div v-for="doctor in doctors" :key="doctor.id">
            <h2>{{ doctor.name }} {{ doctor.surname }}</h2>
            <img :src="doctor.picture ? getImg(doctor.picture) : getImg('profile_default.jpg')" alt="Doctor's Picture" />
            <p>{{ doctor.specialization_name }}</p>
            </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="store.doctors.length > 0">
      <h1 class="text-center my-4">Dottori</h1>
      <div class="col-6 my-1" v-for="doctor in store.doctors" :key="doctor.id">
        <DoctorCard :doctorData="doctor" />
      </div>
    </div>
    <div class="row" v-else>
      <h1 class="text-center my-4">Dottori</h1>
      <div class="alert alert-danger" role="alert">
        Nessun dottore trovato
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link-nav-utente {
  color: white;
  text-decoration: none;
}
</style>