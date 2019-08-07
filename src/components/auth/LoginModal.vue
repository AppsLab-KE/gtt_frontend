<template>
    <b-modal id="my-modal-login"
     centered hide-footer
     title="Login with"
     size='sm'
    :header-text-variant="'dark'">
    <div class="col-md-12 text-center">
        <a class="btn btn-block btn-social btn-bitbucket text-center" @click="authenticate('bitbucket')">
            <span class="fa fa-bitbucket"></span> Bitbucket
        </a> or
        <a class="btn btn-block btn-social btn-github text-center" @click="authenticate('github')">
            <span class="fa fa-github"></span> Github
        </a>
            or
        <a class="btn btn-block btn-social btn-gitlab text-center">
            <span class="fa fa-gitlab"></span> Gitlab
        </a>
    </div>

    
    </b-modal>
</template>
<script>
export default {
    methods: {
        authenticate: function (provider) {
            var vm = this
            this.$auth.authenticate(provider)
            .then(function (response) {
                var data = response.data
                // console.log(data)
                vm.$store.dispatch('AUTH_REQUEST', data).then((resp) => {
                    vm.$bvModal.hide('my-modal-login')
                    console.log('Logged In')
                })
            }).catch(error => {
                vm.$store.commit('AUTH_ERROR', error)
                localStorage.removeItem('c9edd058cd9ff48580f7f7723fbc37a542bf35b8') 
                localStorage.removeItem('user') 
                delete axios.defaults.headers.common['Authorization']
                console.log(error)
                    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
    }
    console.log(error);
            })
        }
    }
}
</script>

<style scoped>
.btn-social{
    color: #fff!important;
}
</style>
