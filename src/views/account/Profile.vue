<template>
    <div>
        <div class="content-widget">
            <div v-if="loaded" class="container">
                <div class="row">
                    <div v-if="user.length !== ''" class="col-md-8">
                        <vue-headful
                            :title="'GeeksTalkThursday - '+ user.first_name + ' ' + user.last_name"
                            :description="user.bio"
                            :image="user.user_avatar"
                            :url="'https://geekstalkthursday.co.ke/@'+user.username"/>
                        <div class="box box-author m_b_2rem col-xs-12">
                            <div class="post-author row-flex">
                                <div class="author-img">
                                    <img alt="author avatar" v-lazy="user.user_avatar" class="avatar">
                                </div>
                                <div class="author-content">
                                <div class="top-author">
                                    <h5 class="heading-font">{{user.first_name +" "+ user.last_name}}
                                    <span v-if="isLoggedInUser" class="top-menu">
                                        <router-link :to="{name: 'profile-edit'}" class="btn">Edit Profile</router-link>
                                    </span>
                                    </h5>
                                    <h6>@{{ user.username }}</h6>
                                    <p>{{user.bio}}</p>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                        <h4 class="spanborder">
                            <span>Posts by @{{ user.username }}</span>
                        </h4>

                        <article v-if="postsData != ''" v-for="(post, $index) in postsData.results" :key="$index" class="row justify-content-between mb-5 mr-0">
                            <blog :post="post"></blog>
                        </article>
                        <article v-else><nothing message="Loading Posts...Please Wait"></nothing>
                        </article>
                        <ul v-if="postsData != ''" class="page-numbers heading">
                            <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
                                <!-- <div slot="spinner">Loading...</div> -->
                                <div slot="no-more">
                                    <nothing :message="`No more posts by @${user.username}`"></nothing>
                                </div>
                                <div slot="no-results">
                                    <nothing v-if="postsData.results.length == 0 " :message="`No Posts yet by @${user.username}`"></nothing>
                                </div>
                            </infinite-loading>
                        </ul>

                    </div> <!--col-md-8-->
                    <div class="col-md-4 pl-md-5 sticky-sidebar">                    
                        <porpular></porpular>
                    </div> <!--col-md-4-->
                </div>
            </div> <!--content-widget-->
            <div v-else class="container text-center">
                <h4>Loading Profile ...</h4>
            </div>
        </div>
    </div>
</template>
<script>
import Blog from '@/components/pages/Blog.vue'
import Porpular from '@/components/pages/Porpular'
import Nothing from '@/components/more/Nothing'
export default {
    components: {
        Blog, Porpular,Nothing
    },
    data(){
        return {
            user : [],
            isLoggedInUser : false,
            postsData: [],
            loaded: false
        }
    },
    mounted(){
        this.loaded = false
        this.loadProfile()
    },
    methods: {
        reduceUserName(username){
            return username.replace(/(@)/g,'')
        },
        getAllUserPosts(username){
            return axios.get('/posts/@'+username+'?limit='+process.env.VUE_APP_PAGINATION)
            .then( response => {
                this.postsData = response.data
                this.loaded = true
            })
            .catch(error => {
                if(error.response){
                    if(error.response.status == 404){
                        this.$router.push('/not-found');
                    }
                }
            })
        },
        getUserProfile(username){
            return axios.get('/users/'+username+'/profile')
            .then( response => {
                return response.data
            })
            .catch(error => {
                if(error.response){
                    if(error.response.status == 404){
                        this.$router.push('/not-found');
                    }
                }
            })
        },
        infiniteHandler($state) {
            let posts = this.postsData;
            if(posts.next == null){
                $state.complete();
            }else{
                axios.get(posts.next)
                .then((response) => {
                   var existing = this.postsData;
                    response.data.results.forEach( data => existing.results.push(data));
                    existing.next = response.data.next;
                    existing.previous = response.data.previous;
                    existing.count = response.data.count;
                    this.postsData = existing;
                    if (response.data.next != null) {
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            }
        },
        loadProfile()
        {
            var username = this.$route.params.username
            var user = this.$store.state.currentUser
            if(this.reduceUserName(username) !== user.username ){
                // * gets username not logged in
                this.getUserProfile(username)
                .then( user =>{
                    this.user = user.user ;
                    // console.log(user.user)
                    this.getAllUserPosts(user.user.username);
                });
                this.isLoggedInUser = false;
            }else{
                this.user = user;
                this.isLoggedInUser = true;
                this.getAllUserPosts(this.user.username);
                this.getUserProfile('@'+user.username)
                .then(user => {
                    this.$store.commit('UPDATE_USER', user.user)
                });
            }
        }
    },
    computed: {
        paginator(){
            return process.env.VUE_APP_PAGINATION
        }
    },
    watch: {
        '$route'(to, from) {
            // this.currentUrl = to.path
            // console.log(to.params)
            this.loadProfile()
        }
    },
}
</script>

<style lang="scss" scoped>
.post-author{ 
    @media screen and (max-width: 390px){
        padding: 10px;
    }
}
</style>

