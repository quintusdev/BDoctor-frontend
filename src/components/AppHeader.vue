<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isScrolled: false,
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
  <!--NAVBAR-->
    <nav class="navbar navbar-expand-lg bg-body-transparent fixed-top" :class="{ 'sticky-navbar': isScrolled, 'scrolled': isScrolled }">
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
              <li>
                <a href="#">
                  <strong>Come funziona</strong>
                </a>
              </li>
              <li>
                <a href="#">
                  <strong>Chi siamo</strong>
                </a>
              </li>
              <li>
                <a href="#">
                  <strong>Trova un professionista</strong>
                </a>
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
    <div class="jumbotron-lg">
        
    </div>
    <div class="container">
     <div class="row">
        <div class="col-12">
            
        </div>
     </div>
    </div>
</template>

<style lang="scss" scoped>
.brand-logo {
  width: 200px;
}

li,
li a {
  list-style-type: none;
  text-decoration: none;
  color: #3058a6;
}

ul#professionista {
  background-color: #b5dcc9;
  border-radius: 50px;
}

.logo {
  width: 100%;
}

.jumbotron-lg {
  width: 100vw;
  height: 600px;
  background-image: url('./img/usman-yousaf-2o0DZVkRvYg-unsplash-large.png');
  background-size: contain;
}

.sticky-navbar {
  top: 0;
  background-color: #b5dcc9;
  z-index: 100;
  transition: background-color 1s;
}

.sticky-navbar.scrolled {
  background-color: #a7c6e5;
}
</style>