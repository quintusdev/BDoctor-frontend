<script>
export default {
    name: 'AppFooter',
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

    },
}
</script>

<template lang="">
    <footer class="bg-primary text-center text-lg-start text-white">
        <!-- Grid container -->
        <div class="container p-4">
            <!--Grid row-->
            <div class="row my-4">
            <!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mr-4 mb-md-0">

                <div class="bg-white shadow-1-strong rounded d-flex align-items-center justify-content-center mb-4 mx-auto">
                    <img src="./img/Logo-BDoctor.png" height="50" alt="Logo Aziendale"
                        loading="lazy" />
                    </div>

                <p class="text-center">BDoctor: Trova medici specialisti.<br> Mettiti in contatto e ottieni assistenza di alta qualità.<br> Semplice e veloce!</p>

                <ul class="list-unstyled d-flex flex-row justify-content-center">
                    <!-- LINK SOCIAL -->
                <li>
                    <a class="text-white px-2" href="#!">
                    <i class="fab fa-facebook-square"></i>
                    </a>
                </li>
                <li>
                    <a class="text-white px-2" href="#!">
                    <i class="fab fa-instagram"></i>
                    </a>
                </li>
                <li>
                    <a class="text-white ps-2" href="#!">
                    <i class="fab fa-youtube"></i>
                    </a>
                </li>
                </ul>

            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase mb-4">Link Utili</h5>
                <!-- LISTA LINK UTILI -->
                <ul class="list-unstyled">
                    <li class="mb-4">
                        <a href="/" class="text-white"><i class="fas fa-house pe-3"></i>Home</a>
                    </li>
                    <li class="mb-4">
                        <a href="/doctors" class="text-white"><i class="fa-solid fa-magnifying-glass pe-3"></i>Trova un professionista</a>
                    </li>
                    <li class="mb-4">
                        <a href="#!" class="text-white"><i class="fa-solid fa-question pe-3 pl-2"></i>Come funziona?</a>
                    </li>
                    <li class="mb-4">
                        <a href="#!" class="text-white"><i class="fa-solid fa-laptop-medical pe-3"></i>Chi Siamo</a>
                    </li>
                </ul>
            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase mb-4">Privacy</h5>
                <!-- LISTA LINK UTILI -->
                <ul class="list-unstyled">
                    <li class="mb-4">
                        <a href="#!" class="text-white"><i class="fa-solid fa-lock pe-3"></i>Privacy Policy</a>
                    </li>
                    <li class="mb-4">
                        <a href="#!" class="text-white"><i class="fa-solid fa-cookie-bite pe-3"></i>Cookie Policy</a>
                    </li>
                    <li class="mb-4">
                        <a href="#!" class="text-white"><i class="fa-solid fa-file-signature pe-3"></i>Termini e Condizioni</a>
                    </li>
                </ul>
            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase mb-4">Contatti</h5>
                <!-- LISTA CONTATTI -->
                <ul class="list-unstyled">
                    <li>
                        <p><i class="fas fa-map-marker-alt pe-2"></i>Milan, Italy</p>
                    </li>
                    <li>
                        <p><i class="fas fa-phone pe-2"></i>+ 01 234 567 89</p>
                    </li>
                    <li>
                        <p><i class="fas fa-envelope pe-2 mb-0"></i>info@gmail.com</p>
                    </li>
                </ul>
            </div>
            <!--Grid column-->
            </div>
            <!--Grid row-->
        </div>
        <!-- Grid container -->

        <!-- Copyright -->
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
            © 2023 Copyright:
            <a class="text-white" href="/">BDoctor.com</a>
        </div>
        <!-- Copyright -->
    </footer>
</template>

<style lang="scss">
@use '../styles/generals.scss';

    /* Rimuovi la sottolineatura dai link */
    a {
        text-decoration: none;
    }
</style>