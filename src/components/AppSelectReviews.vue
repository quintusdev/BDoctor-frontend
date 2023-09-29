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
        <h6>Numero Recensioni</h6>
        <select class="form-select" aria-label="Default select example" v-model="store.ReviewSelected" @change="sendSearch">
            <option value="" selected>Nessuna Recensione</option>
            <option v-for="(reviews, index) in store.reviews" :key="index">
                {{ reviews }}</option>
        </select>

    </div>
</template>
<style lang="">
    
</style>