<script>
import AppJumbotron from './AppJumbotron.vue';
import AppMenuDesktop from './AppMenuDesktop.vue'
import AppMenuMobile from './AppMenuMobile.vue'
export default {
  components: {
    AppMenuDesktop,
    AppMenuMobile,
    AppJumbotron,
  },

}
</script>

<template lang="">
    <AppMenuDesktop />
    <AppMenuMobile />
    <AppJumbotron />
</template>

<style lang="scss" scoped></style>