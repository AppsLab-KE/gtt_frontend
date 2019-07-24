<template>
    <div class="sticky-header fixed d-lg-none d-md-block">
            <div class="text-right">
                <div class="container mobile-menu-fixed pr-5"> 
                    <h1 class="logo-small navbar-brand"><router-link to="/" class="logo">
                        <img src="/assets/images/logo5.png" width="80" alt="">
                    </router-link></h1>
                    
                    <router-link class="author-avatar" to="/"><img src="/assets/images/author-avata-1.jpg" alt=""></router-link>

                    <ul class="social-network heading navbar-nav d-lg-flex align-items-center">                       
                        <li><a href="##"><i class="icon-facebook"></i></a></li>
                    </ul>

                    <a href="javascript:void(0)" class="menu-toggle-icon">
                        <span class="lines"></span>
                    </a>
                </div> 
            </div>         

            <div class="mobi-menu">
                <div class="mobi-menu__logo">
                    <!-- <h1 class="logo navbar-brand"><a href="#" class="logo">Merinda</a></h1> -->
                </div>
                <form action="#" method="get" class="menu-search-form d-lg-flex">
                    <input type="text" class="search_field" placeholder="Search..." value="" name="s">                    
                </form>
                <nav>
                    <nav-links></nav-links>
                </nav>                
            </div>
        </div>
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
