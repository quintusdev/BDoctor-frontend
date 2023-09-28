<script>
import DoctorDetail from '../pages/DoctorDetail.vue';
import { store } from '../store.js';


export default {
    name: "DoctorCard",
    components: {
        DoctorDetail,
    },
    props: {
        doctorData: Object,
    },
    data() {
        return {
            store,
            doctors: [],
            reviews: [], // Inizializza l'array delle recensioni come vuoto
        }
    },
    methods: {
        
    },
    created() {
        this.doctorData.picture
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
                        <div class="col-5">
                            <!-- Immagine profilo -->
                            <div class="card-image-top  justify-content-center align-items-center">
                                <img :src="'http://127.0.0.1:8000/storage/' + doctorData.picture" alt="img">
                            </div>
                        </div>
                        <div class="col-7">
                            <div class="special">
                                <h6>Specializzazioni:</h6>
                                <!-- visualizzo le specializzazioni di ciascun dottore -->
                                <ul>
                                    <li v-for="  specialization   in   doctorData.specializations  "
                                        :key="specialization.id">
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
                            <h6><strong>Voto Medio</strong></h6>
                            <ul v-if="doctorData.avr_vote !== null">
                                <h6 v-for="  avr_vote   in   doctorData.avr_vote  " :key="avr_vote.id">
                                    {{ avr_vote }}
                                </h6>
                            </ul>
                            <div v-else>
                                <h6>Nessuna Valutazione</h6>
                            </div>
                            <div>
                                <h6><strong>Recensioni</strong></h6>
                                <ul v-if="reviews.text > 0">
                                    <li v-for="  review   in   reviews  " :key="review.id">{{ review.text }}</li>
                                </ul>
                                <div v-else>
                                    <h6>Nessuna Recensione</h6>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer text-center">
            <!-- collegamento alla pagina del contatto del messaggio del cliente inviare al backend -->
            <router-link :to="{ name: 'DoctorDetail', params: { doctor_id: doctorData.user.id } }"
                v-if="doctorData && doctorData.user && doctorData.user.id">Vai alla pagina del medico</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
img {
    height: 200px;
    width: 100%;
}


.btn-footer a {
    text-decoration: none;
    /* Rimuove la sottolineatura dal collegamento */
}
</style>