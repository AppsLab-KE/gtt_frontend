<template>
    <span class="top-menu heading d-lg-flex align-items-center">
        <ul v-if="isLoggedIn"  class="social-network notif heading navbar-nav align-items-center d-none d-lg-block">                  
            <li><a href="#"><i class="fa fa-bell"></i></a></li>
        </ul>
        <a v-if="!isLoggedIn" v-b-modal.my-modal-login class="btn">Login</a>
        <b-dropdown v-else variant="link" toggle-tag='link' toggle-class="text-decoration-none" class="drop-manu float-right" no-caret>
            <template slot="button-content">
                <span class="author-avatar" to="#"><img :src='currentUser.user_avatar' alt=""></span>
            </template>
            <b-dropdown-header id="dropdown-header-label">
                {{currentUser.first_name +" "+ currentUser.last_name}}
            </b-dropdown-header>
            <b-dropdown-item :to="{name: 'profile'}">Profile</b-dropdown-item>
            <b-dropdown-item :to="{name: 'profile-edit'}">Edit Profile</b-dropdown-item>
             <b-dropdown-divider></b-dropdown-divider>
             <b-dropdown-item :to="{name: 'publish'}">Create Post</b-dropdown-item>
             <b-dropdown-item href="#">Bookmarks</b-dropdown-item>
             <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#" @click="logout()">Logout</b-dropdown-item>
        </b-dropdown>
         <ul v-if="isLoggedIn"  class="social-network heading navbar-nav align-items-center d-lg-none">    
            <li><a href="#"><i class="fa fa-bell"></i></a></li>
        </ul>
    </span>
</template>
<script>
export default {
    methods: {
        logout: function () {
            this.$store.dispatch("AUTH_LOGOUT")
            .then(() => {
                console.log('Logged Out')
                this.$router.push('/')
            })
        }
    },
    computed: {
        isLoggedIn(){
            return this.$store.getters.isAuthenticated
        },
        currentUser(){
            return this.$store.state.currentUser
        }
    }
}
</script>

<style scoped>
    .drop-manu, .notif{
        margin-top: -8px!important;
    }
    /* .drop-manu{
        margin-left:-15px;
    } */
</style>
