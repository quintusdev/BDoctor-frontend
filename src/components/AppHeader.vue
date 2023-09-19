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
    <nav class="navbar navbar-expand-lg bg-body-transparent fixed-top" :class="{ 'sticky-navbar': isScrolled, 'scrolled': isScrolled }">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                          </a>
                          <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                          </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                      </ul>
                      <form class="d-flex" role="search">
                          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                          <button class="btn btn-outline-success" type="submit">Search</button>
                      </form>
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
.jumbotron-lg {
    width: 100vw;
    height: 600px;
    background-image: url('./img/usman-yousaf-2o0DZVkRvYg-unsplash-large.png');
    background-size: contain;
}

.sticky-navbar {
    top: 0;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 100;
    transition: background-color 0.3s;
}

.sticky-navbar.scrolled {
    background-color: rgba(255, 255, 255, 1);
}
</style>