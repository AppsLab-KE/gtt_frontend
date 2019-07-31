<template>
    <span class="top-menu heading d-lg-flex align-items-center">
        <a v-if="!isLoggedIn" v-b-modal.my-modal-login class="btn">Login</a>
        
        <b-dropdown v-else variant="link" toggle-tag='link' toggle-class="text-decoration-none" class="drop-manu" no-caret>
            <template slot="button-content">
                <span class="author-avatar" to="#"><img src="/assets/images/author-avata-1.jpg" alt=""></span>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout()">Logout</b-dropdown-item>
        </b-dropdown>
        <!-- The modal -->
    </span>
</template>
<script>
export default {
    methods: {
        logout: function () {
            this.$store.dispatch("AUTH_LOGOUT")
            .then(() => {
                console.log('Logged Out')
            })
        }
    },
    computed: {
        isLoggedIn(){
            return this.$store.getters.isAuthenticated
        }
    }
}
</script>

<style scoped>
    .drop-manu{
        margin-top: -8px!important;
    }
</style>
