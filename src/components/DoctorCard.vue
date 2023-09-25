<script>
import DoctorDetail from '../pages/DoctorDetail.vue';
import { store } from '../store.js';


export default {
    name: "DoctorCard",
    components: {
        DoctorDetail,
    },
    props:{
        doctorData: Object,
    },
    data() {
        return {
            store,
            doctors: [],
        }
    },
    methods: {
    }
}
</script>

<template>
    <div class="card my-3 custom_card">
        <div class="card-header text-center">
            <h5><strong>{{ doctorData.user.name }} {{ doctorData.user.surname }}</strong></h5>
        </div>
        <div class="card-body">
            <div class="row ">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-5">
                            <!-- Immagine profilo -->
                            <div class="card-image-top w-100 justify-content-center align-items-center">
                                <img :src="`${store.baseUrl}/storage/${doctorData.picture}`" alt="img">
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="special">
                                <h6>Specializzazioni:</h6>
                                <!-- visualizzo le specializzazioni di ciascun dottore -->
                                <ul>
                                    <li v-for="specialization in doctorData.specializations" :key="specialization.id">
                                        {{ specialization.name }}
                                    </li>
                                </ul>
                            </div>
                            <hr>
                            <h6><strong>Indirizzo:</strong></h6>
                            <h6>{{ doctorData.address }}</h6>
                            <hr>
                            <h6><strong>Numero di Telefono:</strong></h6>
                            <h6> {{ doctorData.phone }}</h6>
                            <hr>
                            <h6><strong>Voto</strong></h6>
                            <ul v-if="doctorData.votes.length > 0">
                                <li v-for="vote in doctorData.votes" :key="vote.id">
                                    {{ doctor.avg_vote }}
                                </li>
                            </ul>
                            <div v-else>
                                <h6>Nessuna Valutazione</h6>
                            </div>
                            <h6><strong>Recensioni</strong></h6>
                            <ul v-if="doctorData.reviews.length > 0">
                                <li v-for="review in doctorData.reviews" :key="review.id">
                                    {{ reviews.text }}
                                </li>
                            </ul>
                            <div v-else>
                                <h6>Nessuna Recensione</h6>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer text-center">
            <!-- collegamento alla pagina del contatto del messaggio del cliente inviare al backend -->
            <router-link :to="'/doctors/' + doctorData.id" class="text-black">
                <div class="btn btn-sm btn-warning btn-footer w-50">
                    <strong>Dettagli profilo e contatti</strong>
                </div>
            </router-link>   
        </div>
    </div>
</template>

<style lang="scss" scoped>
img {
    height: 200px;
    width: 100%;
}

.min_height-350 {
    min-height: 350px;
}

.custom_card {
    height: 500px;
}

.btn-footer a {
    text-decoration: none;
    /* Rimuove la sottolineatura dal collegamento */
}
</style>