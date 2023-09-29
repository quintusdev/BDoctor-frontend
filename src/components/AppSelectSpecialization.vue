<script>
import { store } from '../store'

export default {
    emits: ['search'],
    data() {
        return {
            store
        }
    },

    methods: {
        sendSearch() {
            this.$emit('search')
        }
    },
}
</script>
<template>
    <div class="ms-2">
        <h6>Specializzazione</h6>
        <select class="form-select" aria-label="Default select example" v-model="store.SpecSelected" @change="sendSearch">
            <option value="" selected>Tutte le specializzazioni</option>
            <option v-for="(specialization, index) in store.specializations" :key="index">
                {{ specialization }}</option>
        </select>
    </div>
</template>
<style lang="">
    
</style>