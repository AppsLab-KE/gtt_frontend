<template>
  <div class="home">
    <div class="content-widget">
        <div v-if="latestPost != ''" class="container">
            <div class="row justify-content-between post-has-bg ml-0 mr-0">
                <div class="col-lg-6 col-md-8">
                    <div class="pt-5 pb-5 pl-md-5 pr-5 align-self-center">
                        <div class="capsSubtle mb-2">{{latestPost.category_name}}</div>
                        <h2 class="entry-title mb-3"><a href="single.html">{{latestPost.post_heading}}</a></h2>
                        <div class="entry-excerpt">
                            <p>
                                {{latestPost.post_body_preview | trimPost}}
                            </p>
                        </div>
                        <div class="entry-meta align-items-center">
                            <a href="author.html">{{latestPost.post_author.first_name}} {{latestPost.post_author.last_name}}</a> <br>                                    
                            <span>
                                {{latestPost.date_published | dateshow}}
                         <vue-moments-ago prefix=":" suffix="ago" :date="latestPost.date_published"></vue-moments-ago>
                            </span>
                            <span class="middotDivider"></span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-4 bgcover d-none d-md-block pl-md-0 ml-0">
                    <img style="height:250px;" :src="latestPost.post_heading_image" alt="">
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
                    <article v-for="(post, $index) in postsData.results" :key="$index" class="row justify-content-between mb-5 mr-0">
                        <blog :post="post"></blog>
                    </article>
                    <ul class="page-numbers heading">
                        <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
                            <!-- <div slot="spinner">Loading...</div> -->
                            <div slot="no-more">No more posts today</div>
                            <div slot="no-results">No Posts yet</div>
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
import VueMomentsAgo from 'vue-moments-ago'
import moment from 'moment';

export default {
  name: 'home',
  components: {
    Featured, Blog, Porpular,VueMomentsAgo
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
        getAllPosts(url = '/posts/?limit=4&offset=1'){
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
            // console.log(posts.next)
            if(posts.next == null){
                $state.complete();
            }else{
                axios.get(posts.next)
                .then((response) => {
                    this.$store.commit('UPDATE_POSTS', response.data)
                    // this,postData
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
            let final = noSpace.length > 300 ? noSpace.substring(0, 300) + '...' : noSpace 
            return final
        },
        dateshow(value){
            var date = moment(value).format("MMM Do YY"); 
            return date;
        },
    }
}
</script>
