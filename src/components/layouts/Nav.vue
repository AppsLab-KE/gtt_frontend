<template>
    <header id="header" class="d-lg-block d-none">
        <div class="container">
            <div class="align-items-center w-100">
                <h1 class="logo float-left navbar-brand"><router-link to="/" class="logo">
                    <!-- {{appName}} -->
                    <img src="/assets/images/logo5.png" width="80" alt="">
                    </router-link></h1>
                <div class="header-right float-right w-50">                    
                    <div class="d-inline-flex float-right text-right align-items-center">
                       <nav-user-login></nav-user-login>
                       <login-modal></login-modal>
                    </div>
                    <form action="#" method="get" class="search-form d-lg-flex float-right">
                        <a href="javascript:void(0)" class="searh-toggle">
                            <i class="icon-search"></i>
                        </a>
                        <input type="text" class="search_field" placeholder="Search..." value="" name="s">
                    </form>
                </div>              
            </div>
            <div class="clearfix"><hr></div>
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
import NavUserLogin from './NavUserLogin'
import LoginModal from '@/components/auth/LoginModal'
export default {
    components: {
        NavLinks, NavUserLogin, LoginModal
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
