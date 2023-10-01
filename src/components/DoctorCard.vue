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
            reviews: [],
        }
    },
    computed: {
        // Calcola la media dei voti sulla base dei dati presenti nell'array "votes"
        averageRating() {
            if (!this.doctorData || !this.doctorData.votes || this.doctorData.votes.length === 0) {
                return 0; // Nessun voto disponibile, la media è 0
            }

            const totalVotes = this.doctorData.votes.reduce((total, vote) => total + parseInt(vote.value), 0);
            const average = totalVotes / this.doctorData.votes.length;

            // Arrotonda la media e converte in un intero
            return parseInt(average.toFixed(2));
        },
        methods: {

        },
    },
}
</script>

<template>
    <div class="card my-3 custom_card">
        <div class="card-header text-center">
            <h5><strong>{{ doctorData.user.name }} {{ doctorData.user.surname }}</strong></h5>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="card-body">
                    <div class="row flex">
                        <div class="col-12 col-md-5">
                            <!-- Immagine profilo -->
                            <div class="card-image-top d-flex justify-content-center align-items-center">
                                <img class="img-fluid" :src="'http://127.0.0.1:8000/storage/' + doctorData.picture"
                                    alt="img">
                            </div>
                        </div>
                        <div class="col-12 col-md-7">
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
                            <div class="col-6 my-4">
                                <h5>Voto Medio:</h5>
                                <p>{{ averageRating }}</p>
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
