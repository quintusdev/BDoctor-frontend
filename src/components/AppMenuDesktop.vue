<script>
export default {
  name: 'AppMenuDesktop',
  data() {
    return {
      isScrolled: false,
      menuItems: [
        {
          label: 'Home',
          routeName: 'home'
        },
        {
          label: 'Trova un professionista',
          routeName: 'doctors'
        },
        {
          label: 'Come Funziona',
          routeName: 'come-funziona'
        },
        {
          label: 'Chi siamo',
          routeName: 'home'
        },
      ]
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },


}
</script>
<template lang="">
     <nav class="navbar navbar-expand-lg bg-body-white fixed-top d-lg-block d-none" :class="{ 'sticky-navbar': isScrolled, 'scrolled': isScrolled }">
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <div class="col-1 d-flex align-items-baseline justify-content-between">
              <router-link :to="{name: menuItems[0].routeName}">
                <img src="./img/Logo-BDoctor.png" class="logo" alt="">
              </router-link >
            </div>
            <!--UTENTI-->
            <ul class="d-flex flex-row my-auto justify-content-between col-5" id="utente">
              <li v-for="(item, index) in menuItems" :key="index">
                <router-link class="link-nav-utente"  v-if="item.label !== 'Home'" :to="{name: item.routeName}"><strong>{{ item.label }}</strong></router-link>
              </li>             
            </ul>
            <!--PROFESSIONISTI-->
            <ul class="d-flex flex-row my-auto py-2" id="professionista">
              <li>
                Sei un professionista?
              </li>
              <li class="px-2">
                <a href="http://127.0.0.1:8000/login" class="pe-3 link-nav-professionista">
                  <strong>Portale Professionisti</strong>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
</template>

<style lang="scss" scoped>
.brand-logo {
  width: 200px;
}

li,
.link-nav-professionista {
  list-style-type: none;
  text-decoration: none;
  color: white;
}

.link-nav-utente {
  list-style-type: none;
  text-decoration: none;
  padding: 7px;
  border-radius: 30px;
  color: #3058a6;
}

.link-nav-utente:hover {
  transition-duration: 0.3s;
  background-color: #3058a6;
  color: white;
}

ul#professionista {
  background-color: #3058a6;
  border-radius: 50px;
}

.logo {
  width: 100%;
}


.sticky-navbar {
  top: 0;
  z-index: 100;
  transition: background-color 1s;
}

.sticky-navbar.scrolled {
  background-color: white;
}
</style>