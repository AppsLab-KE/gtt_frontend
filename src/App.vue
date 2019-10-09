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
import firebase from './services/Firebase';
export default {
    components: {
        MobileNav, NavBar, AdvertFooter, FooterPart
    },
    created(){
        let vm = this;
        const messaging = firebase.messaging();
        messaging.onMessage((payload) => {
        
            Notification.requestPermission( permission => {
                let notification = new Notification(payload.notification.title, {
                    body: payload.notification.body, // content for the alert
                    icon: payload.notification.icon // optional image url
                });
                // link to page on clicking the notification
                notification.onclick = () => {
                    window.open(payload.notification.click_action);
                };
            });
        });
        window.addEventListener('offline', () => {
            this.$bvToast.toast('Seems you\'re offline!', {
                    title: 'Offline',
                    variant: 'danger'
                });
        });
        window.addEventListener('online', () => {
            this.$bvToast.toast('You\'re back online', {
                    title: 'Online',
                    variant: 'success'
                });
        });
        axios.interceptors.response.use(null, function (err) {
            if(err.response){
                if (err.response.status == 401){
                    vm.$store.dispatch('AUTH_LOGOUT');
                    vm.$bvModal.show('my-modal-login');
                }
            }
        });
    },
}
</script>


<style lang="scss">

</style>
