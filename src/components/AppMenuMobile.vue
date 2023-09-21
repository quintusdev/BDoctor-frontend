<script>
export default {

}
</script>

<template lang="">
  <nav class="navbar navbar-expand-lg bg-body-transparent d-lg-none d-block">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-between">
          <div class="col-2 d-flex align-items-baseline justify-content-between">
              <a href="#">
                <img src="./img/Logo-BDoctor.png" class="logo" alt="">
              </a>
            </div>
            <!--BOTTONE MENU-->
          <button class="btn d-lg-none d-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
              <i class="fas fa-bars"></i>
            </button>
         
          <div class="offcanvas offcanvas-end d-lg-none d-block" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
                <img src="./img/Logo-BDoctor.png" class="logo" alt="" id="logo-offcanvas">
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="container">
              <div class="row">
                <div class="d-flex align-items-center flex-column">
              <!--UTENTI-->
            <ul class="d-flex flex-column align-items-center me-4" id="utente">
                <li>
                <a href="#">
                  <strong>Trova un professionista</strong>
                </a>
              </li>
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
              
            </ul>
            <!--PROFESSIONISTI-->
            <div class="dropdown-center d-flex justify-content-center">
              <button class="btn btn-secondary dropdown-toggle" id="professionista" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sei un professionista?
              </button>
              <ul class="dropdown-menu" id="professionista">
                <li><a class="dropdown-item" href="#">Accedi</a></li>
                <li><a class="dropdown-item" href="#">Registrati</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

              </div>
            </div>
            </div>
          </div>
  </nav>
</template>
<style lang="scss" scoped>
.logo {
  width: 100%;
}

.logo#logo-offcanvas {
  width: 40%;
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
  color: #3058a6;
}

ul#utente li {
  margin-top: 20px;
}

button#professionista {
  background-color: #3058a6;
  border-radius: 50px;
}

ul#professionista {
  background-color: #3058a6;
}

ul#professionista .dropdown-item:hover {
  background-color: #142546;
}

i {
  color: #3058a6;
}
</style>