<template>
  <div class="alert alert-dismissible alert-info popup" v-if="showInstallBanner">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <p>
        Add {{appName}} to your home screen?
    </p>
    <div class="text-center">
        <a href="#" class=" btn-danger1" data-dismiss="alert">No</a>
        <a href="#" class=" btn-primary1" @click.prevent="install">Yes</a>
    </div>
  </div>
</template>

<script>
let installEvent;
export default {
  name: 'installPrompt',
  data() {
    return {
      showInstallBanner: false
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      installEvent = e;
      this.showInstallBanner = true;
    });
  },
  methods: {
    install() {
      this.showInstallBanner = false;
      installEvent.prompt();
      installEvent.userChoice.then(() => {
        installEvent = null;
      });
    }

  },
  computed: {
        appName(){
            return process.env.VUE_APP_NAME
        }
    },
};
</script>

<style lang="scss">
.popup {
    padding: 25px 10px 10px 10px;
    bottom: 0px;
    position: fixed;
    // left: 3%;
    z-index: 999999;
    margin: 5px;
    border-radius: 0px;
    background-color: #299999;
    color: #fff;
    .btn-danger1{
        color: #fff;
        padding: 5px 20px 5px 20px;
        background-color: red;
        margin: 5px;
    }
    .btn-primary1{
        color: #fff;
        padding: 5px 20px 5px 20px;
        background-color: green;
        margin: 5px;
    }
    .close {
        color: #fff;
    }
    animation: 2s slide-up;
    @keyframes slide-up {
    from {
       margin-bottom: -100px;
        // height: 300%; 
    }

    to {
        margin-bottom: 0px;
        // height: 100%;
    }
    }
}
</style>
