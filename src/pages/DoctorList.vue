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
      axios.get(`${this.baseUrl}/api/doctors`).then((response) => {

        if (response.data.success) {
          this.doctors = response.data.results;
          this.loading = false;
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
  <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="text-center my-4">Dottori</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4" v-for="doctor in doctors" :key="doctor.id">
          <DoctorCard :doctor="doctor" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="d-flex justify-content-center">
            <!-- <ul class="pagination">
              <li :class="currentPage === 1 ? 'disabled' : ''">
                <button class="page-link" @click="getProjects(currentPage - 1)">
                  Precedente
                </button>
              </li>
              <li class="page-item"><a class="page-link" href="#">{{ currentPage }}</a></li>
              <li :class="currentPage === lastPage ? 'disabled' : ''">
                <button class="page-link" @click="getProjects(currentPage + 1)">
                  Successivo
                </button>
              </li>
            </ul> -->
          </nav>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/generals.scss';
</style>