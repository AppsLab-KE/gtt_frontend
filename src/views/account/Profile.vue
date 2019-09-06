<template>
    <div>
        <div class="content-widget">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">                               
                        <div class="box box-author m_b_2rem">
                            <div class="post-author row-flex">
                                <div class="author-img">
                                    <img alt="author avatar" :src="user.user_avatar" class="avatar">
                                </div>
                                <div class="author-content">
                                <div class="top-author">
                                    <h5 class="heading-font"><a href="#" :title="user.first_name" rel="author">{{user.first_name +" "+ user.last_name}}</a>
                                    <span v-if="isLoggedInUser" class="top-menu">
                                        <router-link :to="{name: 'profile-edit'}" class="btn">Edit Profile</router-link>
                                    </span>
                                    </h5>
                                    <h6>@{{ user.username }}</h6>
                                    <p>{{user.bio}}</p>
                                    </div>
                                    <!-- <p class="d-none d-md-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet ut ligula et semper. Aenean consectetur, est id gravida venenatis.</p> -->
                                    <div class="content-social-author">
                                        <a target="_blank" class="author-social" href="#">Facebook </a>
                                        <a target="_blank" class="author-social" href="#">Twitter </a>
                                        <a target="_blank" class="author-social" href="#"> Google + </a>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                        <h4 class="spanborder">
                            <span>Latest Posts</span>
                        </h4>

                        <!-- <blog></blog>             -->

                    </div> <!--col-md-8-->
                    <div class="col-md-4 pl-md-5 sticky-sidebar">                    
                        <porpular></porpular>
                    </div> <!--col-md-4-->
                </div>
            </div> <!--content-widget-->
        </div>
    </div>
</template>
<script>
import Blog from '@/components/pages/Blog.vue'
import Porpular from '@/components/pages/Porpular'
export default {
    components: {
        Blog, Porpular
    },
    data(){
        return {
            user : [],
            isLoggedInUser : false
        }
    },
    mounted(){
        var username = this.$route.params.username
        var user = this.$store.state.currentUser
        if(this.reduceUserName(username) !== user.username ){
            // TODO get username not logged in
            this.$router.push('/not-found');
        }
        this.user = user;
        this.isLoggedInUser = true;
    },
    methods: {
        reduceUserName(username){
            return username.replace(/(@)/g,'')
        }
    }
}
</script>
