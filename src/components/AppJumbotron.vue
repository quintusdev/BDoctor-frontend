<template lang="">
    <div class="jumbotron-lg d-xxl-flex d-lg-none d-none align-items-center" id="jumbotron">
        <div class="container">
            <div class="row d-flex justify-content-end">
                <div class="col-5">
                    <div class="d-flex justify-content-end flex-column align-items-end">
                        <h1>Benvenuti Su</h1>
                        <img src="./img/Logo-BDoctor.png" alt="" class="logo-jumbotron">
                        <h3>Salute in un clic: Trova il tuo <br> medico ideale con noi!</h3>
                        <button type="button" class="btn">
                            <h4 class="text-white p-2">Trova subito il tuo professionista <i class="fas fa-magnifying-glass-location"></i></h4>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="jumbotron-md d-xxl-none d-lg-block d-none">
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.logo-jumbotron {
    width: 70%;
}

#jumbotron button {
    background-color: #3058a6;
    border-radius: 50px;
}

#jumbotron button:hover {
    background-color: #1e396e;
    cursor: pointer;
}

.jumbotron-lg {
    width: 100vw;
    height: 600px;
    background-image: url('./img/usman-yousaf-2o0DZVkRvYg-unsplash-large.png');
    background-size: cover;
}

.jumbotron-md {
    width: 100vw;
    height: 600px;
    background-image: url('./img/usman-yousaf-2o0DZVkRvYg-unsplash.png');
    background-size: cover;
}

#jumbotron h1 {
    font-size: 40pt;
}

#jumbotron h1,
#jumbotron h3 {
    font-weight: 700;
    color: white;
    text-align: end;
}

.position-center {
    position: absolute;
    top: 20px;

}
</style>