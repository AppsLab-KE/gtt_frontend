<template>
  <div id="app">
    <!--Mobile navigation-->
        <mobile-nav></mobile-nav>
        <!--Mobile navigation-->
        <div id="wrapper">
            <nav-bar></nav-bar>
            <main id="content">

                <router-view></router-view>

                <advert-footer></advert-footer>
                
            </main>
            <footer-part></footer-part>
        </div> <!--#wrapper-->
  </div>
</template>

<script>
import MobileNav from '@/components/layouts/MobileNav.vue'
import NavBar from '@/components/layouts/Nav.vue'
import AdvertFooter from '@/components/more/AdvertFooter.vue'
import FooterPart from '@/components/layouts/Footer.vue'
export default {
    components: {
        MobileNav, NavBar, AdvertFooter, FooterPart
    }
}
</script>


<style lang="scss">

</style>
