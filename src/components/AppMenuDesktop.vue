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
                    label: 'Trova un profeessionista',
                    routeName: 'doctors'
                },
                {
                    label: 'Come funziona',
                },
                {
                    label: 'Chi siamo',
                }
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
     <nav class="navbar navbar-expand-lg bg-body-transparent fixed-top d-lg-block d-none" :class="{ 'sticky-navbar': isScrolled, 'scrolled': isScrolled }">
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <div class="col-1 d-flex align-items-baseline justify-content-between">
              <a href="#">
                <img src="./img/Logo-BDoctor.png" class="logo" alt="">
              </a>
            </div>
            <!--UTENTI-->
            <ul class="d-flex flex-row my-auto justify-content-between col-5" id="utente">
              <li class="nav-item" v-for="(item, index) in menuItems" :key="index">
                <router-link class="nav-link" :to="{ name: item.routeName }">{{ item.label }}</router-link>
              </li>
              
            </ul>
            <!--PROFESSIONISTI-->
            <ul class="d-flex flex-row my-auto py-2" id="professionista">
              <li class="pe-3">
                Sei un professionista?
              </li>
              <li>
                <a href="#" class="pe-3">
                  <strong>Accedi</strong>
                </a>
              </li>
              <li  class="pe-4">
                <a href="#">
                  <strong>Registrati</strong>
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
ul#professionista a {
  list-style-type: none;
  text-decoration: none;
  color: white;
}

ul#utente a {
  list-style-type: none;
  text-decoration: none;
  padding: 7px;
  border-radius: 30px;
  color: #3058a6;
}

ul#utente a:hover {
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