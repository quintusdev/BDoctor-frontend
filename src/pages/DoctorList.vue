<script>
import axios from 'axios';

import { store } from '../store.js';
// import AppLoader from '../components/AppLoader.vue';
import DoctorCard from '../components/DoctorCard.vue';

export default {
  name: 'DoctorList',
  components: {
    // AppLoader,
    DoctorCard
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
      axios.get(`${this.baseUrl}/api/doctors`).then((response) => {

        if (response.data.success) {
          this.doctors = response.data.results;
          this.loading = false;
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
  <main>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid vitae sequi, ut fuga, architecto impedit magnam quis
    ad reiciendis quam repellendus corrupti unde ea. Minima sequi amet corrupti adipisci porro!
  </main>
</template>

<style lang="scss" scoped>
@use '../styles/generals.scss';
</style>