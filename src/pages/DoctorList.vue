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
    <div class="container my-4">
      <div class="row">
        <div class="col-12 d-flex flex-row flex-wrap">
          <div class="card m-3" style="width: 18rem;" v-for="(doctor, index) in  doctors " :key="doctor.id">
            <img :src="doctor.picture" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">{{ doctor.address }}</p>
              <a href="#" class="btn btn-primary">{{ doctor.phone }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '../styles/generals.scss';
</style>