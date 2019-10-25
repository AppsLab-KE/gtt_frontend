<template>
    <span class="top-menu heading d-lg-flex align-items-center">
        <!-- <ul v-if="isLoggedIn"  class="social-network notif heading navbar-nav align-items-center d-none d-lg-block">                  
            <li><a href="#"><i class="fa fa-bell"></i></a></li>
        </ul> -->
        <a v-if="!isLoggedIn" v-b-modal.my-modal-login class="btn">Login</a>
        <b-dropdown v-else variant="link" toggle-tag='link' toggle-class="text-decoration-none" class="drop-manu float-right" no-caret>
            <template slot="button-content">
                <span class="author-avatar" to="#"><img v-lazy='currentUser.user_avatar' alt="user_avatar"></span>
            </template>
            <b-dropdown-header id="dropdown-header-label">
                {{currentUser.first_name +" "+ currentUser.last_name}}
            </b-dropdown-header>
            <b-dropdown-item :to="{name: 'profile', params: {username: '@'+ currentUser.username}}">Profile</b-dropdown-item>
            <b-dropdown-item :to="{name: 'profile-edit'}">Edit Profile</b-dropdown-item>
             <b-dropdown-divider></b-dropdown-divider>
             <b-dropdown-item v-if="currentUser.is_writer" :to="{name: 'publish'}">Create Post</b-dropdown-item>
             <b-dropdown-item v-else @click.prevent="sendRequest" to="#">Request Writership</b-dropdown-item>
             <b-dropdown-item :to="{name: 'bookmarks'}">Bookmarks</b-dropdown-item>
             <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#" @click="logout()">Logout</b-dropdown-item>
        </b-dropdown>
         <!-- <ul v-if="isLoggedIn"  class="social-network heading navbar-nav align-items-center d-lg-none">    
            <li><a href="#"><i class="fa fa-bell"></i></a></li>
        </ul> -->
    </span>
</template>
<script>
export default {
    methods: {
        logout: function () {
            this.$store.dispatch("AUTH_LOGOUT")
            .then(() => {
                console.log('Logged Out')
                if (caches) {
                    caches.keys().then((arr) => {
                        arr.forEach((key) => {
                            caches.delete(key).then(() => console.log(`%c Cleared ${key}`, 'background: #333; color: #ff0000'))
                        })
                    })
                }
                this.$router.push({name: 'home'})
            })
        }, 
        sendRequest(){
            axios.post('/users/request_writership')
            .then( response => {
                this.$bvToast.toast(response.data.detail, {
                    title: 'Writership',
                    variant: 'success'
                });
            })
            .catch( error => {
                this.$bvToast.toast('Error occured, try again', {
                    title: 'Writership',
                    variant: 'danger'
                });
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
