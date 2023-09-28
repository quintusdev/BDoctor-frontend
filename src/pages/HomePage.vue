<script>
import AppJumbotronHome from '../components/AppJumbotronHome.vue';
import DoctorList from './DoctorList.vue'
export default {
    components: {
        AppJumbotronHome,
        DoctorList,
    }
}
</script>

<template lang="">
    <AppJumbotronHome />
    <div class="container">
        <div class="row">
                <router-link :to="{ name: 'doctors' }"></router-link>
            </div>
            <DoctorList />
        </div> 
</template>

<style lang="">
    
</style>