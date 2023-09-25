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
            console.log(store.SpecSelected)
            console.log(store.VoteSelected)
            this.$emit('search')
        }
    },
}
</script>
<template>
    <select class="form-select w-25" aria-label="Default select example" v-model="store.SpecSelected" @change="sendSearch">
        <option value="" selected>Tutte le specializzazioni</option>
        <option v-for="(specialization, index) in store.specializations" :key="index">
            {{ specialization }}</option>
    </select>
    <select class="form-select w-25" aria-label="Default select example" v-model="store.VoteSelected" @change="sendSearch">
        <option value="" selected>Nessuna Valutazione</option>
        <option v-for="(vote, index) in store.votes" :key="index">
            {{ vote }}</option>
    </select>
    <select class="form-select w-25" aria-label="Default select example" v-model="store.ReviewSelected"
        @change="sendSearch">
        <option value="" selected>Nessuna Recensione</option>
        <option v-for="(reviews, index) in store.reviews" :key="index">
            {{ reviews }}</option>
    </select>
</template>
<style lang="">
    
</style>