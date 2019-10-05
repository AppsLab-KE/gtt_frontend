<template>
<!-- flex-column-reverse flex-md-row -->
     <div class="row blog " >               
        <div class="col-md-8 col-xs-8">
            <div class="align-self-center">
                <div class="capsSubtle mb-2"><router-link :to="{name: 'category',params: {category: post.category.category_name}}">{{post.category.category_name}}</router-link></div>
                <h3 class="entry-title mb-3"><router-link :to="{name: 'single', params: {slug : post.slug,username:'@'+post.post_author.username}}">{{post.post_heading}}</router-link>
                <span v-if="isLoggedIn && url === '/@'+post.post_author.username" class="top-menu">
                        <router-link v-if="currentUser.username === post.post_author.username" :to="{name: 'post-edit', params: {slug: post.slug,username:'@'+post.post_author.username}}" class="btn">Edit Post</router-link>
                    </span>
                    </h3>
                <router-link :to="{name: 'single', params: {slug : post.slug,username:'@'+post.post_author.username}}">
                     <div class="entry-excerpt">
                        <p>
                            {{post.post_body_preview | trimPost}}
                        </p>
                    </div>
                </router-link>
                <div class="entry-meta align-items-center">
                    <router-link :to="{name: 'profile',params:{username:'@'+post.post_author.username}}">{{post.post_author.first_name}} {{post.post_author.last_name}}</router-link>
                    <br>    

                    <span>{{post.date_published | dateshow}}
                         <vue-moments-ago prefix=":" suffix="ago" :date="post.date_published"></vue-moments-ago>
                    </span>
                    <span class="middotDivider"></span>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-xs-4 bgcover text-center">
            <router-link :to="{name: 'single', params: {slug : post.slug,username:'@'+post.post_author.username}}">
                <!-- <img :src="post.post_heading_image" :alt="post.post_heading"> -->
                <img v-lazy="post.post_heading_image" :alt="post.post_heading">
            </router-link>
        </div>
    </div> <!--col-md-8-->
</template>
<script>
import VueMomentsAgo from 'vue-moments-ago'
import moment from 'moment';
export default {
    props: ['post'],
    data(){
        return {
            url: '/'
        }
    },
    components: {
        VueMomentsAgo
    },
    filters:{
        trimPost(body){
            let noHtml = body.replace(/(&nbsp;|<([^>]+)>)/ig, "")
            let noSpace = noHtml.replace(/ +(?= )/g,'');;
            let final = noSpace.length > 120 ? noSpace.substring(0, 120) + '...' : noSpace 
            return final
        },
        dateshow(value){
            var date = moment(value).format("MMM Do YY"); 
            return date;
        },
    },
    computed: {
        currentUser(){
            return this.$store.state.currentUser
        },
        isLoggedIn(){
            return this.$store.getters.isAuthenticated
        },
    },
    mounted(){
        // console.log(this.$route.path)
        this.url = this.$route.path;
    },
    watch: {
        '$route'(to, from) {
            // console.log(to.path)
            this.url = to.path;
        }
    },
}
</script>

<style lang="scss" scoped>
.blog {
    padding: 0px 10px 10px;
}
</style>

