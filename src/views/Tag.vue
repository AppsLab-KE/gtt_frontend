<template>
    <div class="content-widget">
        <vue-headful :title="'GeeksTalkThursday - Tag: '+ slug.replace(/(-)/, ' ')"/>
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <h4 class="spanborder">
                       <span v-if="slug !== null">#{{slug | getTag}}</span>
                    </h4> 

                    <!-- <article class="first mb-3">
                        <figure><a href="#"><img src="/assets/images/thumb/thumb-1400x992.jpg" alt="post-title"></a></figure>
                        <h1 class="entry-title mb-3"><a href="#">Home Internet Is Becoming a Luxury for the Wealthy</a></h1>
                        <div class="entry-excerpt">
                            <p>
                                And black on meretriciously regardless well fearless irksomely as about hideous wistful bat less oh much and occasional useful rat darn jeepers far. 
                            </p>
                        </div>
                        <div class="entry-meta align-items-center">
                            <a class="author-avatar" href="#"><img src="/assets/images/author-avata-1.jpg" alt=""></a>
                            <a href="#">Dave Gershgorn</a> in <a href="#">OneZero</a><br>                                  
                            <span>Jun 14</span>
                            <span class="middotDivider"></span>
                            <span class="readingTime" title="3 min read">3 min read</span>
                            <span class="svgIcon svgIcon--star">
                                <svg class="svgIcon-use" width="15" height="15">
                                    <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                </svg>
                            </span>
                        </div>
                    </article>  -->
                    <!-- <div class="divider"></div> -->

                    <article v-if="postsData != ''" v-for="(post, $index) in postsData.results" :key="$index" class="row justify-content-between mb-5 mr-0">
                        <blog :post="post"></blog>
                    </article>
                    <article v-else><nothing message="Loading Posts...Please Wait"></nothing></article>
                    <ul v-if="postsData != ''" class="page-numbers heading">
                        <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
                            <!-- <div slot="spinner">Loading...</div> -->
                            <div slot="no-more">
                                <nothing message="No more posts for this tag"></nothing>
                            </div>
                            <div slot="no-results">
                                <nothing v-if="postsData.results.length == 0 " message="No Posts yet"></nothing>
                            </div>
                        </infinite-loading>
                    </ul>

                </div> <!--col-md-8-->
                <div class="col-md-4 pl-md-5 sticky-sidebar">                    
                   <porpular></porpular>
                </div> <!--col-md-4-->
            </div>
        </div> <!--content-widget-->
    </div>
</template>
<script>
import Porpular from '@/components/pages/Porpular'
import Blog from '@/components/pages/Blog.vue'
import Nothing from '@/components/more/Nothing'
export default {
    components: {
        Porpular, Blog, Nothing
    },
    data(){
        return {
            postsData: [],
            slug: null
        }
    },
    mounted(){
        this.getTagPosts();
    },
    watch: {
        '$route'(to, from) {
            this.getTagPosts()
        }
    },
    methods: {
        getTagPosts(){
            var tag = this.$route.params.tag
            this.slug = tag
            axios.get('/posts/tags/'+tag+'?limit='+process.env.VUE_APP_PAGINATION+'&offset=0')
            .then( response => {
                this.postsData = response.data
            });
        },
        infiniteHandler($state) {
            let posts = this.postsData;
            if(posts.next == null){
                $state.complete();
            }else{
                axios.get(posts.next)
                .then((response) => {
                   var existing = this.postsData;
                    response.data.results.forEach( data => existing.results.push(data))
                    existing.next = response.data.next
                    existing.previous = response.data.previous
                    existing.count = response.data.count
                    this.postsData = existing
                    if (response.data.next != null) {
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            }
        },
    },
    filters: {
        getTag(slug){
            return slug.replace(/(-)/, ' ')
        }
    }
}
</script>

