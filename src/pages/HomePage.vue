<script>
import axios from 'axios';
import AppJumbotronHome from '../components/AppJumbotronHome.vue';
import AppSelectSpecialization from '../components/AppSelectSpecialization.vue';
import AppSelectVotes from '../components/AppSelectVotes.vue';
import AppSelectReviews from '../components/AppSelectReviews.vue';
import AppSearch from '../components/AppSearch.vue';
export default {
  components: {
    AppJumbotronHome,
    AppSelectSpecialization,
    AppSelectVotes,
    AppSelectReviews,
    AppSearch,
  },
  data() {
    return {
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
            <div class="col-12 my-3">
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
    </div>
  </div>

</template>

<style lang="scss" scoped>
    .link-nav-utente {
        color: white;
        text-decoration: none;
        }
</style>