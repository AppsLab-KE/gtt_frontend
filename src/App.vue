<template>
  <div id="app">
      <install-prompt></install-prompt>
    <!--Mobile navigation-->
        <mobile-nav></mobile-nav>
        <!--Mobile navigation-->
        <div id="wrapper">
            <nav-bar></nav-bar>
            <main id="content">
                
                <!-- <div v-if="isLoading" class="col-12 text-center">
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    <p>Loading Data ... 
                        ({{refCount}}) 
                        </p>
                </div> -->

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
import InstallPrompt from '@/components/more/BeforeInstallPrompt.vue';
import firebase from './services/Firebase';
export default {
    components: {
        MobileNav, NavBar, AdvertFooter, FooterPart, InstallPrompt,
    },   
    data() {
        return {
        refCount: 0,
        isLoading: false
        }
    },
    methods: {
        setLoading(isLoading) {
            if (isLoading) {
                this.refCount++;
                this.isLoading = true;
            } else if (this.refCount > 0) {
                this.refCount--;
                this.isLoading = (this.refCount > 0);
            }
        }
    },
    created(){
        let vm = this;
        const messaging = firebase.messaging();
        messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
            // Notification.requestPermission( permission => {
            //     let notification = new Notification(payload.notification.title, {
            //         body: payload.notification.body, // content for the alert
            //         icon: payload.notification.icon // optional image url
            //     });
            //     // link to page on clicking the notification
            //     notification.onclick = () => {
            //         window.open(payload.notification.click_action);
            //     };
            // });
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
            return Promise.reject(err);
        });
        axios.interceptors.request.use((config) => {
            // this.setLoading(true);
            return config;
        }, (error) => {
            // this.setLoading(false);
            return Promise.reject(error);
        });

        axios.interceptors.response.use((response) => {
            // this.setLoading(false);
            return response;
        }, (error) => {
            // this.setLoading(false);
            return Promise.reject(error);
        });
    },
}
</script>


<style lang="scss">
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #2A9999;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
