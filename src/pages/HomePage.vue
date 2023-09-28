<script>
import axios from 'axios';
import AppJumbotronHome from '../components/AppJumbotronHome.vue';
export default {
  components: {
    AppJumbotronHome,
  },
  data() {
    return {
      doctors: [], // Inizializziamo un array vuoto per memorizzare i dati dei medici
      loading: true, // Indica se la chiamata API è in corso
    };
  },
  methods: {
    getImg(url){
        return 'http://127.0.0.1:8000/storage/' + url;
    }
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
        <div class="col-12">
          <h1>HomePage</h1>
        </div>
        <div class="col-12">
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

<style lang="">
    
</style>