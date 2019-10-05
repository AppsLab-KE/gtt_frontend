<template>
     <div class="related-posts mb-5">
        <h4 class="spanborder text-center">
            <span>Related Posts</span>
        </h4>
        <div class="row justify-content-between">
                <div class="divider-2"></div>                                    
            <article v-if="relateds != ''" v-for="(related, $index) in relateds" :key="$index" class="col-md-4">
                <div class="mb-3 d-flex row">
                    <figure class="col-md-5"><router-link :to="{name: 'single', params: {slug : related.slug,username:'@'+related.post_author.username}}"><img v-lazy="related.post_heading_image" alt="post-title"></router-link></figure>
                    <div class="entry-content col-md-7 pl-md-0">                                    
                        <h5 class="entry-title mb-3"><router-link :to="{name: 'single', params: {slug : related.slug,username:'@'+related.post_author.username}}">{{related.post_heading}}</router-link></h5>
                        <div class="entry-meta align-items-center">
                            <router-link :to="{name: 'profile',params:{username:'@'+related.post_author.username}}">{{related.post_author.first_name}} {{related.post_author.last_name}}</router-link> in 
                            <router-link :to="{name: 'category',params: {category: related.category.category_name}}">{{related.category.category_name}}</router-link>
                            <br>                                    
                            <span>
                                {{related.date_published | dateshow}}
                         <vue-moments-ago prefix=":" suffix="ago" :date="related.date_published"></vue-moments-ago>
                            </span>
                            <span class="middotDivider"></span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>
<script>
import VueMomentsAgo from 'vue-moments-ago'
import moment from 'moment';
export default {
    props: ['category'],
    data(){
        return {
            relateds: [],
        }
    },
    components: {
        VueMomentsAgo,
    },
    mounted(){
        this.getRelatedPosts()
    },
    methods: {
        getRelatedPosts(){
            axios.get('/posts/categories/'+this.category+'?limit=3&offset=0')
            .then( response => {
                // console.log(response.data)
                this.relateds = response.data.results;
            })
        },
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

