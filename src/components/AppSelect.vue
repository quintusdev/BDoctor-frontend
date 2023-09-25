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
            this.$emit('search')
        }
    },
}
</script>
<template>
    <select class="form-select w-25" aria-label="Default select example" v-model="store.SpecSelected" @change="sendSearch">
        <option value="All">Tutte le specializzazioni</option>
        <option v-for="(specialization, index) in store.specializations" :key="index">
            {{ specialization }}</option>
    </select>
</template>
<style lang="">
    
</style>