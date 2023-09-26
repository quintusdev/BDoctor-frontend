<script>
import AppJumbotronHome from '../components/AppJumbotronHome.vue';
import AppSelect from '../components/AppSelect.vue';
import AppSearch from '../components/AppSearch.vue';
export default {
    components: {
        AppJumbotronHome,
        AppSelect,
        AppSearch,
    }
}
</script>

<template lang="">
    <AppJumbotronHome />
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>HomePage</h1>
            </div>
            <div class="col-12 my-3">
                <h1>Ricerca</h1>
                <div class="col-12 d-flex flex-row justify-content-between">
                <div class="">
                    <h6>Nome e Cognome</h6>
                    <AppSearch @search="nameSearched" />
                </div>
                <AppSelect @search="nameSearched" />
                </div>
                <router-link :to="{ name: 'doctors' }" id="search-btn" class="btn btn-lg"
                    type="button">Cerca
                </router-link>
            </div>
        </div> 
    </div>
</template>

<style lang="">
    
</style>