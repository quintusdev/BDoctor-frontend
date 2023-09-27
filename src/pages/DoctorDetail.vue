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
            editDoctorData: { ...this.doctorData },
            name: '', // Inizializza il campo name con una stringa vuota
            surname: '', // Inizializza il campo surname con una stringa vuota
            email: '',
            text: '',
        };
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
                    this.editDoctorData = { ...this.localDoctorData };
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
        submitReview() {
          let data = new FormData();
          data.append('name', this.name);
          data.append('surname', this.surname);
          data.append('email', this.email);
          data.append('text', this.text);

          axios.post('/reviews', data).then((response)=> {
            // Reimposta i campi del form dopo l'invio
            this.name = '';
            this.surname = '';
            this.email = '';
            this.text = '';
          })
          .catch(error => {
            // Gestisci gli errori qui, ad esempio, registrando l'errore
            console.error(error);
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
              <h3 v-if="localDoctorData && localDoctorData.user">{{ localDoctorData.user.name }} {{ localDoctorData.user.surname }}</h3>
          </div>
          <div class="card-body">
            <h6>Foto Profilo:</h6>
                <img :src="localDoctorData.picture" alt="Immagine profilo">
            <hr>
            <h6>CV del Medico:</h6>
                <img :src="localDoctorData.cv" alt="File CV">
            <hr>
            <h6>Specializzazioni:</h6>
            <ul>
              <li v-for="specialization in localDoctorData.specializations" :key="specialization.id">
                {{ specialization.name }}
              </li>
            </ul>
            <hr>
            <h6>Indirizzo:</h6>
            <p>{{ localDoctorData.address }}</p>
            <hr>
            <h6>Numero di Telefono:</h6>
            <p>{{ localDoctorData.phone }}</p>
            <hr>
            <h6>E-Mail:</h6>
            <p v-if="localDoctorData && localDoctorData.user">{{ localDoctorData.user.email }}</p>
          </div>
          <div class="card-footer text-center">
            <h4>Lascia una recensione</h4>
            <!-- FORM RECENSIONE -->
            <form enctype="multipart/form-data" @submit="submitReview">
              <!-- CAMPO NOME -->
              <div class="form-group">
                  <label for="name">Nome:</label>
                  <input type="text" id="name" v-model="name" required>
              </div>
              <!-- CAMPO COGNOME -->
              <div class="form-group">
                  <label for="surname">Cognome:</label>
                  <input type="text" id="surname" v-model="surname" required>
              </div>
              <!-- CAMPO E-MAIL -->
              <div class="form-group">
                  <label for="email">Email:</label>
                  <input type="email" id="email" v-model="email" required>
              </div>
              <!-- CAMPO TESTO RECENSIONE -->
              <div class="form-group">
                  <label for="text">Recensione:</label>
                  <textarea id="text" v-model="text" required></textarea>
              </div>
              <!-- <div class="form-group">
                  <label for="rating">Voto (da 1 a 5):</label>
                  <input type="number" id="rating" v-model="rating" min="1" max="5" required>
              </div> -->
              <!-- PULSANTE INVIO DATI AL BACKEND -->
              <button type="submit">Invia Recensione</button>
            </form>
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