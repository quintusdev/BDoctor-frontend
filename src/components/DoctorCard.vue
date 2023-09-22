<script>
import { store } from '../store.js';


export default {
    name: "DoctorCard",
    props:{
        doctorData: Object,
    },
    data(){
        return{
            store,
            doctors:[],
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
            <h4>{{ doctorData.address }} {{ doctorData.phone }}</h4>
        </div>
        <!-- <div class="card-image-top">
            <img :src="`${store.baseUrl}/storage/${project.picture}`" alt="img">
        </div>
        <div class="card-body">
            <div>
            <span v-if="project.type">{{ doctor.specialization.name }}</span>
            <span v-else>Categoria non assegnata</span>
            </div>
            <div v-if="project.technologies">
            <span class="badge text-bg-primary me-3" v-for="specialization in project.technologies" :key="specialization.id">
                {{ specialization.name }}
            </span>
            </div>
            <div>
                {{ truncateText(project.content) }}
            </div>
        </div>
        <div class="card-footer">
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