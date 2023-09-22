<script>
import { store } from '../store.js';


export default {
    name: "DoctorCard",
    props:{
        doctorData: Object,
        /* userData: Object, */
    },
    data(){
        return{
            store,
            doctors:[],
            /* users:[], */
        }
    },
    methods: {
        truncateText(text){
          if(text.length > 100){
            return text.substr(0, 50) + '...';
          }
    
          return text
        }
    }
}
</script>

<template>

    <div class="card my-3 min_height-377">
        <div class="card-header">
            <h5>{{ doctorData.user.name }} {{ doctorData.user.surname }}</h5>
        </div>
        <div class="card-image-top w-50">
            <img :src="`${store.baseUrl}/storage/${doctorData.picture}`" alt="img">
        </div>
        <div class="card-body">
            <h5>Specializzazioni del professionista:</h5>
            <!-- visualizzo le specializzazioni di ciascun dottore -->
            <ul>
                <li v-for="specialization in doctorData.specializations" :key="specialization.id">
                    {{ specialization.name }}
                </li>
            </ul>
            <h5>{{ doctorData.address }}</h5>
            <h6> {{ doctorData.phone }}</h6>
        </div>
        <div class="card-footer">
            <div class="btn btn-sm btn-success">
                <!-- collegamento alla pagina del contatto del messaggio del cliente inviare al backend -->
                <a class="text-white" href="#">Contatta</a>
            </div>
        </div>
      <!--   
            <div>
            <span v-if="project.type">{{ doctor.specialization.name }}</span>
            <span v-else>Categoria non assegnata</span>
            </div> -->
            <!-- div v-if="project.technologies">
            <span class="badge text-bg-primary me-3" v-for="specialization in project.technologies" :key="specialization.id">
                {{ specialization.name }}
            </span> -->
            <!-- </div> -->
            <!-- <div>
                {{ truncateText(project.content) }}
            </div> -->
        <!-- <div class="card-footer">
            <router-link class="btn btn-sm btn-primary" :to="{ name: 'single-project', params: { slug: project.slug }}">Visualizza progetto</router-link>
        </div> -->
    </div>

</template>

<style lang="scss" scoped>
img{
  height: 200px;
  width: 100%;
}

.min_height-377{
  min-height: 377px;
}
</style>