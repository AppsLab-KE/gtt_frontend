<template>
    <div class="sticky-header fixed d-lg-none d-md-block">
            <div class="text-right">
                <div class="container mobile-menu-fixed pr-5"> 
                    <h1 class="logo-small navbar-brand"><router-link to="/" class="logo">
                        <img src="/assets/images/logo5.png" width="80" alt="">
                    </router-link></h1>

                    <nav-user-login></nav-user-login>
                    
                    <a href="javascript:void(0)" class="menu-toggle-icon">
                        <span class="lines"></span>
                    </a>
                </div> 
            </div>         

            <div class="mobi-menu">
                <div class="mobi-menu__logo">
                    <!-- <h1 class="logo navbar-brand"><a href="#" class="logo">Merinda</a></h1> -->
                </div>
                <form action="#" method="get" class="menu-search-form d-lg-flex" @submit.prevent="search">
                    <input type="text" class="search_field" placeholder="Search..." value="" v-model="form.search" required>                    
                </form>
                <nav>
                    <nav-links></nav-links>
                </nav>                
            </div>
        </div>
</template>
<script>
import NavLinks from './NavLinks'
import NavUserLogin from './NavUserLogin'
export default {
    components: {
        NavLinks, NavUserLogin
    },
    computed: {
        appName(){
            return process.env.VUE_APP_NAME
        }
    },
    data() {
        return {
            form : {
                search: '',
            },
        }
    },
    methods: {
        search(){
            if(this.$data.form.search != ''){
                return this.$router.push({name: 'search', query:{ s : this.$data.form.search}});
            }else{ 
                return;
            }
        }
    }
}
</script>
