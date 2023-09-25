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
  props:{
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
  computed: {
  // Calcola l'elenco dei medici filtrati in base al termine di ricerca e specializzazione
    filteredDoctors() {
      const searchTerm = this.searchTerm.toLowerCase().trim();
      const specializationSearch = this.selectedSpecialization.toLowerCase().trim();
      
      return this.doctors.filter(doctor => {
        const specializations = doctor.specializations.map(s => s.name.toLowerCase()).join(', '); // Utilizza doctor.specializations
        
        return (specializations.includes(searchTerm)) && (specializationSearch === '' || specializations.includes(specializationSearch));
      })
    },
    // Calcola l'elenco dei medici da visualizzare in base a se c'è un termine di ricerca o no
    displayedDoctors() {
      return this.searchTerm ? this.filteredDoctors : this.getDoctors;
    },
    filteredItems() {
      return this.items.filter(item => {
          return (!this.filterOption1 || item.option1) &&
                  (!this.filterOption2 || item.option2);
      });
    },
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
    }
  },
  };
</script>

<template>
  <AppJumbotronPagine />
  <div class="container">
    <div class="row">
      <!-- SEZIONE FILTRI RICERCA -->
      <div class="col-2">
        <h6>Filtra la tua ricerca:</h6>
        <label>
            <input type="checkbox" v-model="filterOption1"> Media Voti
        </label><br>
        <label>
            <input type="checkbox" v-model="filterOption2"> Numero Recensioni
        </label>
        <!-- <ul>
            <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
        </ul> -->
      </div>
      <!-- SEZIONE RICERCA -->
      <div class="col-10 text-center">
        <h6>Filtra per specializzazione:</h6>
        <select v-model="selectedSpecialization">
          <option value="">Tutte le specializzazioni</option>
          <option v-for="specialization in doctor.specializations" :key="specialization.id">{{ specialization.name }}</option>
        </select>
      </div>
    </div>
  </div>
  <!-- SEZIONE PROFESSIONISTI IN EVIDENZA -->
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center my-4">Professionisti in Evidenza</h1>
        <div class="col-md-6 my-1" v-for="doctor in displayedDoctors" :key="doctor.id">
          <DoctorCard :doctorData="doctor" />
        </div>
      </div>
    </div>
    <!-- SEZIONE ALTRI PROFESSIONISTI -->
    <div class="row">
      <h1 class="text-center my-4">Altri Professionisti</h1>
      <div class="col-md-6 my-1" v-for="doctor in doctors" :key="doctor.id">
          <DoctorCard :doctorData="doctor" />
        </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
@use '../styles/generals.scss';
</style>