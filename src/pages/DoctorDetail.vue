<script>
import axios from 'axios';
import { store } from '../store.js'

export default {
    name: "DoctorDetail",
    props: {
        doctorData: Object,
    },
    data() {
        return {
            store,
            doctors: [],
            success: false,
            errors: [],
            stars: [false, false, false, false, false],
            localDoctorData: { ...this.doctorData },
            /* form data recensioni */
            reviewFormData: {
            doctor_id: this.$route.params.doctor_id,
            name: '',
            surname: '',
            email: '',
            text: '',
            reviewSuccess: false,
            reviewError: false,
            },
            ratingFormData: {
                doctor_id: this.$route.params.doctor_id,
                rname: '',
                rsurname: '',
                remail: '',
                vote_id: 0, // Inizializza a 0
                ratingSuccess: false,
                ratingError: false,
},
            messageFormData: {
            doctor_id: this.$route.params.doctor_id,
            memail: '',
            mname: '',
            msurname: '',
            mtext: '',
            messageSuccess: false,
            messageError: false,
            },
        };
    },
    created() {
        this.getDoctorDetail();
        this.localDoctorData.specializations;
    },
    methods: {
        getDoctorDetail() {
            const doctorId = this.$route.params.doctor_id; // Ottenere l'ID dal parametro nell'URL
            axios.get(`${this.store.baseUrl}/api/doctors/${doctorId}`).then((response) => {
                if (response.data.success) {
                    this.localDoctorData = response.data.results;
                    this.editDoctorData = { ...this.localDoctorData };
                    // Ora, esegui una chiamata separata per ottenere le specializzazioni
                    axios.get(`${this.store.baseUrl}/api/doctors/${doctorId}/specializations`)
                        .then((specializationsResponse) => {
                            // Verifica che la risposta contenga i dati delle specializzazioni
                            if (specializationsResponse.data) {
                                // Assegna i dati delle specializzazioni al dottore corrispondente
                                this.localDoctorData.specializations = specializationsResponse.data.results;
                                this.editDoctorData.specializations = specializationsResponse.data.results;
                            }
                        })
                        .catch((error) => {
                            console.error('Errore nella chiamata API delle specializzazioni:', error);
                        });
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
        submitReview(e) {
        e.preventDefault();
        const reviewFormData = {
            doctor_id: this.$route.params.doctor_id,
            name: this.reviewFormData.name,
            surname: this.reviewFormData.surname,
            email: this.reviewFormData.email,
            text: this.reviewFormData.text,
        };
        axios.post(`${this.store.baseUrl}/api/reviews`, reviewFormData).then((response) => {
            this.reviewSuccess = true;
            this.reviewError = false;
                this.reviewFormData.name = '';
                this.reviewFormData.surname = '';
                this.reviewFormData.email = '';
                this.reviewFormData.text = '';
                // Nascondi il messaggio di conferma dopo 3 secondi
                setTimeout(() => {
                    this.reviewSuccess = false;
                }, 3000);
        })
        .catch((error) => {
            console.error(error);
            this.reviewSuccess = false;
            this.reviewError = true;
        });
    },
        setRating(rating) {
        // Imposta lo stato delle stelle in base al voto selezionato
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i] = i < rating;
        }
        this.ratingFormData.vote_id = rating; // Imposta il valore del voto numerico
    },
    submitRating(e) {
        e.preventDefault();
        // Esempio di validazione lato client
        if (this.ratingFormData.vote_id < 1 || this.ratingFormData.vote_id > 5) {
            alert('Il voto deve essere compreso tra 1 e 5.');
            return; // Non inviare la richiesta se la validazione fallisce
        }

        const ratingFormData = {
            doctor_id: this.$route.params.doctor_id,
            rname: this.ratingFormData.rname,
            rsurname: this.ratingFormData.rsurname,
            remail: this.ratingFormData.remail,
            vote_id: this.ratingFormData.vote_id, // Utilizza il campo corretto
        };

        axios.post(`${this.store.baseUrl}/api/vote`, ratingFormData).then((response) => {
            this.ratingSuccess = true;
            this.ratingError = false;
            this.ratingFormData.rname = '';
            this.ratingFormData.rsurname = '';
            this.ratingFormData.remail = '';
            this.ratingFormData.vote_id = 0; // Reinizializza il voto
            // Nascondi il messaggio di conferma dopo 3 secondi
            setTimeout(() => {
                this.ratingSuccess = false;
            }, 3000);
        }).catch((error) => {
            console.error(error);
            this.ratingSuccess = false;
            this.ratingError = true;
        });
    },

    submitMessage(e) {
        e.preventDefault();
        const messageFormData = {
            user_id: this.$route.params.doctor_id,
            memail: this.messageFormData.memail,
            mname: this.messageFormData.mname,
            msurname: this.messageFormData.msurname,
            mtext: this.messageFormData.mtext,
        };

        axios.post(`${this.store.baseUrl}/api/messages`, messageFormData).then((response) => {
                this.messageSuccess = true;
                this.messageError = false;
                this.messageFormData.memail = '';
                this.messageFormData.mname = '';
                this.messageFormData.msurname = '';
                this.messageFormData.mtext = '';
                // Nascondi il messaggio di conferma dopo 3 secondi
                setTimeout(() => {
                    this.messageSuccess = false;
                }, 3000);

            })
            .catch((error) => {
                console.error(error);
                this.messageSuccess = false;
                this.messageError = true;
            });
    },
   },
}
</script>

<template>
    <div class="container mt-5 mb-5" v-if="localDoctorData">
      <div class="row">
        <div class="col-12">
          <div class="card mt-5">
            <div class="card-header text-center">
              <h3 v-if="localDoctorData && localDoctorData.user"><strong>{{ localDoctorData.user?.name }} {{ localDoctorData.user?.surname }}</strong></h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <img :src="'http://localhost:8000/storage/' + localDoctorData?.picture" alt="Immagine profilo" class="justify-content-center align-items-center img_profile">
                </div>
                <div class="col-md-6">
                  <h6>CV del Medico:</h6>
                  <a :href="'http://localhost:8000/storage/' + (localDoctorData ? localDoctorData.cv : '')" target="_blank">Visualizza CV</a>
                  <hr>
                  <h6>Specializzazioni:</h6>
                  <ul>
                    <div v-for="specialization in localDoctorData.specializations" :key="specialization.id">
                      <li v-if="specialization">{{ specialization.name }}</li>
                    </div>
                  </ul>
                  <hr>
                  <h6>Indirizzo:</h6>
                  <p>{{ localDoctorData?.address }}</p>
                  <hr>
                  <h6>Numero di Telefono:</h6>
                  <p>{{ localDoctorData?.phone }}</p>
                  <hr>
                  <h6>E-Mail:</h6>
                  <p>{{ localDoctorData.user?.email }}</p>
                </div>
              </div>
            </div>
            <div class="card-footer text-center">
              <div class="row">
                <!-- contenuto form -->
                <div class="content-footer col-md-4 my-4">
                    <!-- Form recensioni -->
                  <h5><strong>Invia una recensione</strong></h5>
                  <form method="post" @submit="submitReview" class="text-center">
                    <div class="form-group mb-3">
                      <label for="name" class="form-label font-weight-bold text-left">Nome:</label>
                      <input type="text" class="form-control w-50 mx-auto" id="name" v-model="reviewFormData.name" required>
                    </div>
                    <div class="form-group mb-3">
                      <label for="surname" class="form-label font-weight-bold">Cognome:</label>
                      <input type="text" class="form-control w-50 mx-auto" id="surname" v-model="reviewFormData.surname" required>
                    </div>
                    <div class="form-group mb-3">
                      <label for="email" class="form-label font-weight-bold">Email:</label>
                      <input type="email" class="form-control w-50 mx-auto" id="email" v-model="reviewFormData.email" required>
                    </div>
                    <div class="form-group mb-3">
                      <label for="text" class="form-label font-weight-bold">Recensione:</label>
                      <textarea id="text" class="form-control w-50 mx-auto" v-model="reviewFormData.text" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary mb-3">Invia Recensione</button>
                  </form>
                    <!-- Errori form recensioni -->
                    <div class="row" v-if="reviewSuccess">
                        <div class="alert alert-success" role="alert">
                            Recensione inviata con successo!
                        </div>
                    </div>
                    <div class="row" v-else-if="reviewError">
                        <div class="alert alert-danger" role="alert">
                            Errore nell'invio della recensione. Per favore, riprova più tardi.
                        </div>
                    </div>
                </div>
                <div class="content-footer col-md-4 my-4">
                    <!-- form voto professionista -->
                  <h5><strong>Invia un voto</strong></h5>
                  <form method="post" @submit="submitRating" class="text-center">
                    <div class="form-group mb-3">
                      <label for="rname" class="form-label font-weight-bold text-left">Nome:</label>
                      <input type="text" class="form-control w-50 mx-auto" id="rname" v-model="ratingFormData.rname" required>
                    </div>
                    <div class="form-group mb-3">
                      <label for="rsurname" class="form-label font-weight-bold">Cognome:</label>
                      <input type="text" class="form-control w-50 mx-auto" id="rsurname" v-model="ratingFormData.rsurname" required>
                    </div>
                    <div class="form-group mb-3">
                      <label for="remail" class="form-label font-weight-bold">Email:</label>
                      <input type="email" class="form-control w-50 mx-auto" id="remail" v-model="ratingFormData.remail" required>
                    </div>
                    <div class="form-group mb-3">
                      <label for="vote" class="form-label font-weight-bold">Voto:</label>
                      <div class="star-rating">
                        <span
                          v-for="(star, index) in stars"
                          class="star"
                          @click="setRating(index + 1)"
                          :class="{ 'selected': star }"
                          :key="index"
                        >&#9733;</span>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary mb-3">Invia Voto</button>
                  </form>
                  <!-- Errori form Voto -->
                    <div class="row" v-if="ratingSuccess">
                        <div class="alert alert-success" role="alert">
                        Voto inviato con successo!
                        </div>
                    </div>
                    <div class="row" v-else-if="ratingError">
                        <div class="alert alert-danger" role="alert">
                        Errore nell'invio del tuo voto. Per favore, riprova più tardi.
                        </div>
                    </div>
                </div>
                <div class="content-footer col-md-4 my-4">
                    <!-- form messaggi -->
                  <h5><strong>Invia un messaggio</strong></h5>
                  <form method="post" @submit="submitMessage">
                    <div class="form-group mb-3">
                      <label for="mname" class="form-label">Nome:</label>
                      <input type="text" class="form-control w-50 mx-auto" id="mname" v-model="messageFormData.mname" required>
                    </div>
                    <div class="form-group mb-3">
                      <label for="msurname" class="form-label">Cognome:</label>
                      <input type="text" class="form-control w-50 mx-auto" id="msurname" v-model="messageFormData.msurname" required>
                    </div>
                    <div class="form-group mb-3">
                      <label for="memail" class="form-label">Email:</label>
                      <input type="email" class="form-control w-50 mx-auto" id="memail" v-model="messageFormData.memail" required>
                    </div>
                    <div class="form-group mb-3">
                      <label for="mtext" class="form-label">Messaggio da inviare:</label>
                      <textarea id="mtext" class="form-control w-50 mx-auto" v-model="messageFormData.mtext" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary mb-3">Invia Messaggio</button>
                  </form>
                  <!-- Errori form messaggi -->
                    <div class="row" v-if="messageSuccess">
                        <div class="alert alert-success" role="alert">
                        Messaggio inviato con successo!
                        </div>
                    </div>
                    <div class="row" v-else-if="messageError">
                        <div class="alert alert-danger" role="alert">
                        Errore nell'invio del tuo messaggio. Per favore, riprova più tardi.
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-12 justify-content-between">
                <a href="/ricerca-avanzata" class="col-5 btn btn-md btn-warning mx-5 my-4"><strong>Torna alla Ricerca Avanzata</strong></a>
                <a href="/" class="col-5 btn btn-md btn-success mx-5 my-4"><strong>Torna alla Home</strong></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<style lang="scss" scoped>
.img_profile {
    max-width: 50%;
}

.min_height-350 {
    min-height: 350px;
}

.custom_card {
    height: auto;
}

.btn-footer a {
    text-decoration: none; /* Rimuove la sottolineatura dal collegamento */
}

.star-rating {
    font-size: 24px;
}

.star {
    color: #ccc; /* Colore delle stelle non selezionate */
    cursor: pointer;
}

.star.selected {
    color: #ffcc00; /* Colore delle stelle selezionate */
}

.star:hover {
    color: #ffcc00; /* Cambia colore quando il mouse passa sopra */
}
</style>