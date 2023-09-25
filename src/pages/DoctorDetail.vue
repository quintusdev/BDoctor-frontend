<script>

import axios from 'axios';
import { store } from '../store.js'

export default {
    name: "DoctorDetail",
    props: {
        doctorData:Object,
    },
    data() {
        return {
            store,
            doctors: [],
            localDoctorData: { ...this.doctorData }
        }
    },
    created() {
        this.getDoctorDetail();
    },
    methods: {
        getDoctorDetail() {
            const doctorId = this.$route.params.doctor_id; // Ottenere l'ID dal parametro nell'URL
            axios.get(`${this.store.baseUrl}/api/doctors/${doctorId}`).then((response) => {
            if (response.data.success) {
                this.localDoctorData = response.data.results;
            } else {
                // Gestisci il caso in cui il dottore non sia stato trovato
                console.error('Dottore non trovato');
            }
            })
            .catch((error) => {
            // Gestisci eventuali errori nella chiamata API
            console.error('Errore nella chiamata API:', error);
            });
    },
    },
}
</script>

<template>
    <div class="container mt-5" v-if="localDoctorData">
        <div class="row">
            <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3>{{ localDoctorData.user.name }} {{ localDoctorData.user.surname }}</h3>
                  </div>
                  <div class="card-body">
                    <h6>Specializzazioni:</h6>
                    <ul>
                      <li v-for="specialization in localDoctorData.specializations" :key="specialization.id">
                        {{ specialization.name }}
                      </li>
                    </ul>
                    <h6>Indirizzo:</h6>
                    <p>{{ localDoctorData.address }}</p>
                    <h6>Numero di Telefono:</h6>
                    <p>{{ localDoctorData.phone }}</p>
                    <!-- Altri dettagli del medico -->
                  </div>
                  <div class="card-footer">
                    <!-- Contenuto del piè di pagina -->
                  </div>
                </div>
            </div>
        </div>
        
    </div>
  </template>
  

<style lang="scss" scoped>
img{
  height: 200px;
  width: 100%;
}

.min_height-350{
  min-height: 350px;
}

.custom_card{
    height: auto;
}

    .btn-footer a {
        text-decoration: none; /* Rimuove la sottolineatura dal collegamento */
    }
</style>