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
            localDoctorData: { ...this.doctorData },
            reviewFormData: {
                doctor_id: this.$route.params.doctor_id,
                email: '',
                name: '',
                surname: '',
                text: '',
                /* rating: '', // Aggiungi il rating */
            },
            success: false,
            errors: [],
            messageFormData: {
                doctor_id: this.$route.params.doctor_id,
                email: '',
                name: '',
                surname: '',
                text: '',
            },
            success: false,
            errors: [],
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
            }
            else {
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
            email: this.email,
            name: this.name,
            surname: this.surname,
            text: this.text,
            rating: this.rating, // Aggiungi il rating
        };

        axios.post(`${this.store.baseUrl}/api/reviews`, reviewFormData).then((response) => {
          this.success = response.data.success;
          if (this.success) {
              alert('Recensione inviata con successo!');
              this.doctor_id = '';
              this.email = '';
              this.name = '';
              this.surname = '';
              this.text = '';
              this.rating = '';
          } else {
              this.errors = response.data.errors;
              console.log(this.errors);
          }
        });
      },

      submitMessage(e) {
      e.preventDefault();
      const messageFormData = {
          user_id: this.$route.params.doctor_id,
          memail: this.memail,
          mname: this.mname,
          msurname: this.msurname,
          mtext: this.mtext,
      };

      axios.post(`${this.store.baseUrl}/api/messages`, messageFormData).then((response) => {
          this.success = response.data.success;
          if (response.data.success) {
              alert('Messaggio inviato con successo!');
              this.user_id = '';
              this.memail = '';
              this.mname = '';
              this.msurname = '';
              this.mtext = '';
          } else {
              this.errors = response.data.errors;
              console.log(this.errors);
          }
      })
      .catch((error) => {
          console.error(error);
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
            <div class="card-header">
                <h3 v-if="localDoctorData && localDoctorData.user">{{ localDoctorData.user?.name }} {{ localDoctorData.user?.surname }}</h3>
            </div>
            <div class="card-body">
              <h6>Foto Profilo:</h6>
              <img :src="`http://localhost:8000/storage/${localDoctorData?.picture}`" alt="Immagine profilo" style="width: 300px;">
              <hr>
              <h6>CV del Medico:</h6>
              <a :href="`http://localhost:8000/storage/${localDoctorData?.cv}`" target="_blank">Visualizza CV</a>
              <hr>
              <h6>Specializzazioni:</h6>
              <ul>
                <div v-for="specialization in localDoctorData.specializations" :key="specialization.id">
                  <li v-if="specialization">
                    {{ specialization.name }}
                  </li>
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
            <div class="card-footer text-center">
                <div class="row">
                    <div class="content-footer col-6 col-md-6">
                    <h4>Lascia una recensione</h4>
                    <form method="post" @submit="submitReview">
                        <div class="form-group">
                            <label for="name">Nome:</label>
                            <input type="text" id="name" v-model="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="surname">Cognome:</label>
                            <input type="text" id="surname" v-model="surname" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" v-model="email" required>
                        </div>
                        <div class="form-group">
                            <label for="text">Recensione:</label>
                            <textarea id="text" v-model="text" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="rating">Voto (da 0 a 5):</label>
                            <input type="number" id="rating" v-model="rating" min="0" max="5" required>
                        </div>
                        <button type="submit">Invia Recensione</button>
                    </form>
                </div>
                <div class="content-footer col-6 col-md-6">
                    <h4>Invia un messaggio</h4>
                    <form method="post" @submit="submitMessage">
                        <div class="form-group">
                            <label for="mname">Nome:</label>
                            <input type="text" id="mname" v-model="mname" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="msurname">Cognome:</label>
                            <input type="text" id="msurname" v-model="msurname" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="memail">Email:</label>
                            <input type="email" id="memail" v-model="memail" required>
                        </div>
                        <div class="form-group">
                            <label for="mtext">Messaggio da inviare:</label>
                            <textarea id="mtext" v-model="mtext" required></textarea>
                        </div>
                        <button type="submit">Invia Messaggio</button>
                    </form>
                </div>

                </div>
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