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
      this.store.loading = true;
      axios.get(`${store.baseUrl}/api/doctors`).then((response) => {

        if (response.data.success) {
          this.doctors = response.data.results;
          this.loading = false;
          console.log(response.data)
        }

        else {

        }
      })

      //   axios.get(`${this.store.baseUrl}/api/projects`, { params: { page:num_page }}).then((response) => {
      //     this.projects = response.data.results.data;
      //     this.currentPage = response.data.results.current_page;
      //     this.lastPage = response.data.results.last_page;
      //     this.store.loading = false;
      //   })

    },
  }
};
</script>

<template>
  <AppJumbotronPagine />
  <main>
    <div v-for="(doctor, index) in doctors" :key="doctor.id">
      <h5>{{ doctor.address }}</h5>
      <h4>{{ doctor.cv }}</h4>
      <h4>{{ doctor.phone }}</h4>

    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '../styles/generals.scss';
</style>