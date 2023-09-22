<script>
import AppMenuDesktop from './AppMenuDesktop.vue'
import AppMenuMobile from './AppMenuMobile.vue'
export default {
  components: {
    AppMenuDesktop,
    AppMenuMobile,
  },
  name: "AppHeader"

}
</script>

<template lang="">
    <AppMenuDesktop />
    <AppMenuMobile />
</template>

<style lang="scss" scoped></style>