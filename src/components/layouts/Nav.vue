<template>
    <header id="header" class="d-lg-block d-none">
        <div class="container">
            <div class="align-items-center w-100">
                <h1 class="logo float-left navbar-brand"><a href="" class="logo">
                    <!-- {{appName}} -->
                    <img src="/assets/images/logo5.png" width="80" alt="">
                    </a></h1>
                <div class="header-right float-right w-50">                    
                    <div class="d-inline-flex float-right text-right align-items-center">                        
                        <ul class="social-network heading navbar-nav d-lg-flex align-items-center">                       
                            <li><a href="#"><i class="icon-facebook"></i></a></li>
                        </ul>
                        <ul class="top-menu heading navbar-nav w-100 d-lg-flex align-items-center">
                            <li><router-link to="/contact" class="btn">Contact</router-link></li>
                        </ul>
                        <a class="author-avatar" href="#"><img src="/assets/images/author-avata-1.jpg" alt=""></a>
                    </div>
                    <form action="#" method="get" class="search-form d-lg-flex float-right">
                        <a href="javascript:void(0)" class="searh-toggle">
                            <i class="icon-search"></i>
                        </a>
                        <input type="text" class="search_field" placeholder="Search..." value="" name="s">
                    </form>
                </div>              
            </div>
            <div class="clearfix"></div>
        </div>
        <nav id="main-menu" class="stick d-lg-block d-none">
            <div class="container">
                <div class="menu-primary">
                    <nav-links></nav-links>
                    <span></span>
                </div>
            </div>
        </nav>        
    </header>
</template>
<script>
import NavLinks from './NavLinks'
export default {
    components: {
        NavLinks
    },
    computed: {
        appName(){
            return process.env.VUE_APP_NAME
        }
    },
}
</script>

<style scoped>

</style>
