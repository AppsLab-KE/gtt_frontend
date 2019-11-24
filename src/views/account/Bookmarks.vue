<template>
    <div class="content-widget">
        <vue-headful title="GeeksTalkThursday - Bookmarks"/>
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <h4 class="spanborder">
                        <span>Bookmarks</span>
                    </h4> 

                    <article v-if="postsData != ''" v-for="(post, $index) in postsData.results" :key="$index" class="row justify-content-between mb-5 mr-0">
                        <blog :post="post"></blog>
                    </article>
                    <article v-else><nothing message="Loading Posts...Please Wait"></nothing></article>
                    <ul v-if="postsData != ''" class="page-numbers heading">
                        <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
                            <!-- <div slot="spinner">Loading...</div> -->
                            <div slot="no-more">
                                <nothing message="No more bookmarks"></nothing>
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
<script>;
import Porpular from '@/components/pages/Porpular'
import Blog from '@/components/pages/Blog.vue';
import Nothing from '@/components/more/Nothing';
export default {
    components: {
        Porpular, Blog, Nothing
    },
    data(){
        return {
            postsData: [],
            searched: '',
        }
    },
    mounted(){
        this.getSearchedPosts();
    },
    methods: {
        getSearchedPosts(){
            axios.get('/bookmarks?limit='+process.env.VUE_APP_PAGINATION+'&offset=0')
            .then( response => {
                this.postsData = response.data;
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
    }
}
</script>

