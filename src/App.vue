<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import * as bootstrap from 'bootstrap'


export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<template>
  <div>
    <AppHeader />
    <router-view></router-view>
    <AppFooter />
  </div>
</template>

<style lang="scss">
@use './styles/generals.scss' as *;
</style>
