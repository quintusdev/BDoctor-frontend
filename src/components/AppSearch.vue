<script>
import { store } from '../store';
export default {
    emits: ['search'],
    data() {
        return {
            store,
        }
    },

    methods: {
        sendSearch() {
            console.log(store.nameSearched)
            this.$emit('search')
        }
    },
}
</script>

<template lang="">
    <div class="input-group w-25">
        <input v-model="store.nameSearched" type="text" class="form-control" 
        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder=" Cerca Dottore" @keyup.enter="$emit('search')" @change="sendSearch">
    </div>
</template>
<style lang="">
    
</style>