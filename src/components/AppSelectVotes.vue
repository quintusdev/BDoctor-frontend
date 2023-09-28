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
    <div class="ms-2">
        <h6>Media Voti</h6>
        <select class="form-select" aria-label="Default select example" v-model="store.VoteSelected" @change="sendSearch">
            <option value="" selected>Nessuna Valutazione</option>
            <option v-for="(vote, index) in store.votes" :key="index">
                {{ vote }}</option>
        </select>
    </div>
</template>
<style lang="">
    
</style>