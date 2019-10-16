<template>
  <div class="home">
    <div class="content-widget">
        <div v-if="latestPost != ''" class="container">
            <div class="row justify-content-between post-has-bg ml-0 mr-0 flex-column-reverse flex-md-row">
                <div class="col-lg-6 col-md-8">
                    <div class="pt-5 pb-5 pl-md-5 pr-5 align-self-center">
                        <div class="capsSubtle mb-2"><router-link :to="{name: 'category',params: {category: latestPost.category.category_name}}">{{latestPost.category.category_name}}</router-link></div>
                        <h2 class="entry-title mb-3"><router-link :to="{name: 'single', params: {slug : latestPost.slug, username:'@'+latestPost.post_author.username}}">{{latestPost.post_heading}}</router-link></h2>
                        <router-link :to="{name: 'single', params: {slug : latestPost.slug,username:'@'+latestPost.post_author.username}}">
                            <div class="entry-excerpt">
                                <p>
                                    {{latestPost.post_body_preview | trimPost}}
                                </p>
                            </div>
                        </router-link>
                        <div class="entry-meta align-items-center">
                            <router-link :to="{name: 'profile',params:{username:'@'+latestPost.post_author.username}}">{{latestPost.post_author.first_name}} {{latestPost.post_author.last_name}}</router-link> <br>                                    
                            <span>
                                {{latestPost.date_published | dateshow}} &nbsp;
                         <vue-moments-ago prefix="" suffix="ago" :date="latestPost.date_published"></vue-moments-ago>
                            </span>
                            <span class="middotDivider"></span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-4 bgcove pl-md-0 ml-0">
                     <!-- d-none d-md-block -->
                    <router-link :to="{name: 'single', params: {slug : latestPost.slug,username:'@'+latestPost.post_author.username}}">
                        <img v-lazy="latestPost.post_heading_image" :alt="latestPost.post_heading_image">
                    </router-link>
                </div>
            </div>
            <div class="divider"></div>
        </div>
    </div> <!--content-widget-->

    <!-- <featured></featured> -->

    <div class="content-widget">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <h2 class="spanborder h4">
                        <span>Most Recent</span>
                    </h2>   
                    <!-- blog -->
                    <article v-if="postsData != ''" v-for="(post, $index) in postsData.results" :key="$index" class="row justify-content-between mb-5 mr-0">
                        <blog :post="post"></blog>
                    </article>
                    <article v-else><nothing message="Loading Posts...Please Wait"></nothing></article>
                    <ul v-if="postsData != ''" class="page-numbers heading">
                        <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
                            <!-- <div slot="spinner">Loading...</div> -->
                            <div slot="no-more">
                                <nothing message="No more posts today"></nothing>
                            </div>
                            <div slot="no-results">
                                <nothing v-if="postsData.results.length == 0 " message="No Posts yet"></nothing>
                            </div>
                        </infinite-loading>
                    </ul>
                </div> 
                <div class="col-md-4 pl-md-5 sticky-sidebar">                    
                    <porpular></porpular>
                </div> <!--col-md-4-->
            </div>
        </div> <!--content-widget-->
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Featured from '@/components/pages/Featured.vue'
import Blog from '@/components/pages/Blog.vue'
import Porpular from '@/components/pages/Porpular'
import Nothing from '@/components/more/Nothing'
import VueMomentsAgo from 'vue-moments-ago'
import moment from 'moment';

export default {
  name: 'home',
  components: {
    Featured, Blog, Porpular,VueMomentsAgo, Nothing
  },
  mounted(){
      if(this.$store.state.latestPost.length == 0){
          this.getLatestPost();
      }
      if(this.$store.state.allPosts.length == 0){
          this.getAllPosts();
      }
    },
    methods: {
        getAllPosts(url = '/posts/?limit='+process.env.VUE_APP_PAGINATION+'&offset=1'){
            axios.get(url)
            .then( response => {
                this.$store.commit('ALL_POSTS',response.data)
            })
        },
        getLatestPost(){
            axios.get('/posts/?limit=1&offset=0')
            .then( response => {
                this.$store.commit('LATEST_POST',response.data.results[0])
            })
        },
        infiniteHandler($state) {
            let posts = this.postsData;
            if(posts.next == null){
                $state.complete();
            }else{
                axios.get(posts.next)
                .then((response) => {
                    this.$store.commit('UPDATE_POSTS', response.data)
                    if (response.data.next != null) {
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            }
        },
    },
    computed: {
        postsData(){
            return this.$store.state.allPosts;
        },
        latestPost(){
            return this.$store.state.latestPost;
        }
    },
    filters:{
        trimPost(body){
            let noHtml = body.replace(/(&nbsp;|<([^>]+)>)/ig, "")
            let noSpace = noHtml.replace(/ +(?= )/g,'');
            let final = noSpace.length > 350 ? noSpace.substring(0, 350) + '...' : noSpace 
            return final
        },
        dateshow(value){
            var date = moment(value).format("MMM Do YY"); 
            return date;
        },
    }
}
</script>
<style lang="scss" scoped>
.bgcover {
    height: 300px;
}
</style>
