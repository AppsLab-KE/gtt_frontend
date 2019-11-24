<template>
    <div>
        <div class="container" v-if="defaultValue !== ``">
            <vue-headful
                    :title="'GeeksTalkThursday - '+ post.post_heading"
                    :description="post.post_body | trimPost"
                    :image="post.post_heading_image"
                    :url="'https://geekstalkthursday.co.ke/post/@'+post.post_author.username+'/'+post.slug"/>
            <div class="entry-header">
                <div class="mb-5">
                    <h1 class="entry-title m_b_2rem">
                        {{post.post_heading}}
                    </h1>
                    <div class="entry-meta align-items-center">
                        <router-link :to="{name: 'profile',params:{username:'@'+post.post_author.username}}" class="author-avatar" href="##"><img :src="post.post_author.user_avatar" alt=""></router-link>
                        <router-link :to="{name: 'profile',params:{username:'@'+post.post_author.username}}">{{post.post_author.first_name}} {{post.post_author.last_name}}</router-link> in
                        <router-link :to="{name: 'category',params: {category: post.category.category_name}}">{{post.category.category_name}}</router-link><br>
                        <span>
                        {{post.date_published | dateshow}}
                        <vue-moments-ago prefix=":" suffix="ago" :date="post.date_published"></vue-moments-ago>
                    </span>
                        <span class="middotDivider"></span>
                    </div>
                </div>
            </div> <!--end single header-->
            <figure class="image zoom mb-5 col-md-8 offset-md-2">
                <img v-lazy="post.post_heading_image" :alt="post.post_heading" />
                <!-- <img :src="post.post_heading_image" alt="post-title" /> -->
            </figure>  <!--figure-->
            <article class="entry-wraper mb-5 col-md-8">
                <div class="entry-left-col">
                    <div class="social-sticky d-none d-lg-block">
                        <fav-links :post='post'></fav-links>
                    </div>
                </div>

                <div v-if="defaultValue !== ``" class="entry-main-content dropcap">
                    <medium-editor
                            :readOnly="true"
                            :prefill="defaultValue"
                    />
                    <!--Begin Subcrible-->
                    <subscribe></subscribe>
                    <!--End Subcrible-->
                </div>
                <div class="entry-bottom">
                    <div class="tags-wrap heading">
                    <span class="tags">
                        <router-link v-for="(tag, $index) in post.tags" :key="$index" :to="{name: 'tag',params:{tag: tag.slug}}" rel="tag">{{tag.tag_name}}</router-link>
                    </span>
                    </div>
                    <div class="social-sticky1 d-lg-none">
                        <fav-links :post='post'></fav-links>
                    </div>
                </div>
                <div class="box box-author m_b_2rem">
                    <div class="post-author row-flex">
                        <router-link :to="{name: 'profile',params:{username:'@'+post.post_author.username}}" >
                            <div class="author-img">
                                <img alt="author avatar" :src="post.post_author.user_avatar" class="avatar">
                            </div>
                        </router-link>
                        <div class="author-content">
                            <div class="top-author">
                                <router-link :to="{name: 'profile',params:{username:'@'+post.post_author.username}}" >
                                    <h5 class="heading-font">{{post.post_author.first_name +" "+ post.post_author.last_name}}
                                    </h5>
                                </router-link>
                                <h6>@{{ post.post_author.username }}</h6>
                                <p>{{post.post_author.bio}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </article> <!--entry-content-->

            <!--Begin Comment-->
            <comments v-if="defaultValue !== ``" :post="post"></comments>
            <!--End Comment-->

            <!--Begin post related-->
            <related-posts :category="post.category.slug" v-if="defaultValue !== ``"></related-posts>
            <!--End post related-->

        </div> <!--container-->
        <div class="container text-center">
            <h4>Loading content ...</h4>
        </div>
    </div>
</template>

<script>
import Comments from '@/components/pages/Comments'
import RelatedPosts from '@/components/pages/RelatedPosts'
import Subscribe from '@/components/pages/Subscribe'
import VueTagsInput from '@johmun/vue-tags-input';
import FavLinks from '../components/pages/single/FavLinks';
import VueMomentsAgo from 'vue-moments-ago'
import moment from 'moment';
export default {
    components: {
        Comments, RelatedPosts, Subscribe, VueTagsInput,VueMomentsAgo, FavLinks
    },
    data(){
        return {
            post : [],
            defaultValue: ``,
        }
    },
    mounted(){
        this.getSinglePost();
    },
    updated(){
        require('./../../public/assets/js/prettify.js');
        const els = document.getElementsByTagName("pre");
        // console.log(els)
        for (let i = 0; i < els.length; i++) {
            const element = els[i];
            element.classList.add('prettyprint');
        }
    },
    methods: {
        getSinglePost(){
            var username = this.$route.params.username
            var slug = this.$route.params.slug
            axios.get('/posts/'+username+'/'+slug)
            .then( response => {
                this.post = response.data
               return this.defaultValue = response.data.post_body
            })
            .catch(error => {
                if(error.response){
                    if(error.response.status == 404){
                        this.$router.push('/not-found');
                    }
                }
            })
        }
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
    }
}
</script>
<style lang="scss" scoped>
.entry-main-content{
    img {
       border: 1px #DDDDDD solid!important; 
    }
}

</style>


