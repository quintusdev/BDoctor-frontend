<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: "EditReview",
    props:{
        editDoctorData: Object,
    },
    data(){
        return {
            store,
            doctors: [],
            formData: {
                firstName: "",
                lastName: "",
                email: "",
                rating: null,
                review: "",
            }, 
        }
    },
    methods: {
        submitReview() {
            // Crea un oggetto con i dati della recensione
            const reviewData = {
                doctorId: this.doctorData.id, // Supponiamo che doctorData contenga l'ID del dottore
                firstName: this.formData.firstName,
                lastName: this.formData.lastName,
                email: this.formData.email,
                rating: this.formData.rating,
                review: this.formData.review,
            };

            // Effettua una richiesta POST per inviare la recensione al backend
            axios.post('/api/reviews', reviewData)
                .then(response => {
                    // La recensione è stata inviata con successo
                    console.log('Recensione inviata con successo:', response.data);

                    // Successivamente, puoi reimpostare i dati del form
                    this.formData = {
                        firstName: "",
                        lastName: "",
                        email: "",
                        rating: null,
                        review: "",
                    };
                })
                .catch(error => {
                    // Gestisci eventuali errori nella richiesta
                    console.error('Errore nell\'invio della recensione:', error);
                });
        }
    }
}
</script>

<template>

    <div class="card my-3 custom_card">
        <div class="card-header text-center">
            <h5><strong>Inserisci una recensione per {{ doctorData.user.name }} {{ doctorData.user.surname }}</strong></h5>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <h1>ciao</h1>
<!--                     <h2>Inserisci una recensione</h2>
                    <form @submit="submitReview">
                        <div class="form-group">
                            <label for="firstName">Nome:</label>
                            <input type="text" id="firstName" v-model="formData.firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Cognome:</label>
                            <input type="text" id="lastName" v-model="formData.lastName" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" v-model="formData.email" required>
                        </div>
                        <div class="form-group">
                            <label for="rating">Voto (da 1 a 5):</label>
                            <input type="number" id="rating" v-model="formData.rating" min="1" max="5" required>
                        </div>
                        <div class="form-group">
                            <label for="review">Recensione:</label>
                            <textarea id="review" v-model="formData.review" required></textarea>
                        </div>
                            <button type="submit">Invia Recensione</button>
                    </form>
 -->                </div>
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
    height: 500px;
}

    .btn-footer a {
        text-decoration: none; /* Rimuove la sottolineatura dal collegamento */
    }
</style>