<script>
import axios from 'axios';
import { store } from '../store.js';
import AppJumbotronHome from '../components/AppJumbotronHome.vue';
import AppSelectSpecialization from '../components/AppSelectSpecialization.vue';
import AppSelectVotes from '../components/AppSelectVotes.vue';
import AppSearch from '../components/AppSearch.vue';
import DoctorDetail from './DoctorDetail.vue';
export default {
  components: {
    AppJumbotronHome,
    AppSelectSpecialization,
    AppSelectVotes,
    AppSearch,
    DoctorDetail,
  },
  props: {
      doctorData: Object,
  },
  data() {
    return {
      store,
      doctors: [], // Inizializziamo un array vuoto per memorizzare i dati dei medici
      loading: true, // Indica se la chiamata API è in corso
      menuItems: [
        {
          label: 'Ricerca Avanzata',
          routeName: 'advance-search'
        },
      ]
    };
  },
  mounted() {
    this.nameSearched()
  },
  methods: {
    getImg(url){
        return 'http://127.0.0.1:8000/storage/' + url;
    },
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
  },
  mounted() {
    // Effettua la chiamata API per recuperare i dati
    axios.get('http://127.0.0.1:8000/api/sponsor-doctor')
      .then((response) => {
        this.doctors = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error('Errore nella chiamata API:', error);
        this.loading = false; // Imposta loading su false in caso di errore
      });
  },
};
</script>

<template>
  <div>
    <AppJumbotronHome />
    <div class="container">
      <div class="row">
        <div class="col-12 my-3">
            <h1>Ricerca</h1>
            <div class="col-12 d-flex flex-row">
            <div class="">
                <h6>Nome e Cognome</h6>
                <AppSearch @search="nameSearched" />
            </div>
            <AppSelectSpecialization @search="nameSearched" />
            <button class="btn btn-primary ms-2 align-self-end" v-for="(item, index) in menuItems" :key="index">
                <router-link class="link-nav-utente" :to="{ name: item.routeName }"><strong>{{
                item.label }}</strong></router-link>
            </button>
            </div>
        </div>
        <div class="container">
            <!-- Contenuto della tua home -->
            <div v-if="loading">Caricamento...</div>
            <div v-else>  
              <!-- Mostra i dati recuperati qui -->
              <div class="row d-flex flex-row card-container">
                <h1 class="text-center mt-3 mb-5">Dottori in Evidenza</h1>
                <div class="col-12 col-md-3 mb-5 doctor-card" v-for="doctor in doctors" :key="doctor.id">
                    <img :src="doctor.picture ? getImg(doctor.picture) : getImg('profile_default.jpg')" alt="Doctor's Picture" class="card-img-top img-fluid doctor-image">
                    <div class="card-body">
                      <h2 class="card-title">{{ doctor.name }} {{ doctor.surname }}</h2>
                      <div class="card-text" style="height: 30px; overflow: hidden;">
                        {{ doctor.specialization_names }}
                      </div>
                      <div>
                        <router-link :to="{ name: 'DoctorDetail', params: { doctor_id: doctor.id } }" v-if="doctorData && doctorData.user && doctorData.user.id">
                          <button class="btn btn-primary">Vedi Profilo</button>
                        </router-link>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
    .link-nav-utente {
        color: white;
        text-decoration: none;
    }

    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .doctor-card {
    flex: 1;
    max-width: calc(25% - 20px); /* Imposta la larghezza massima in base al numero di colonne desiderate */
    /* margin-right: 20px; */
    /* margin-bottom: 20px; */ /* Rimuovi il margine inferiore */
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(#3057A6, 0.5); /* Aumenta il raggio dell'ombra */
    transition: box-shadow 0.3s ease; /* Aggiungi una transizione per un effetto di sfumatura */
    }
    .doctor-card:hover {
        box-shadow: 0 10px 30px rgba(#3057A6, 0.8); /* Ombra più evidente al passaggio del mouse */
    }

    .doctor-image {
        max-height: 50%; /* Imposta l'altezza massima al 50% dell'altezza della card */
        object-fit: cover; /* Per garantire che l'immagine riempia correttamente lo spazio disponibile */
    }

    /* Imposta l'altezza massima per le card */
    .doctor-card .card {
        flex-grow: 1;
    }
</style>
