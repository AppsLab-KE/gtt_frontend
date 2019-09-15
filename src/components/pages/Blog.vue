<template>
     <div class="row" >               
        <div class="col-md-8">
            <div class="align-self-center">
                <div class="capsSubtle mb-2"><router-link :to="{name: 'category',params: {category: post.category.category_name}}">{{post.category.category_name}}</router-link></div>
                <h3 class="entry-title mb-3"><router-link :to="{name: 'single', params: {slug : post.slug,username:'@'+post.post_author.username}}">{{post.post_heading}}</router-link></h3>
                <router-link :to="{name: 'single', params: {slug : post.slug,username:'@'+post.post_author.username}}">
                     <div class="entry-excerpt">
                        <p>
                            {{post.post_body_preview | trimPost}}
                        </p>
                    </div>
                </router-link>
                <div class="entry-meta align-items-center">
                    <router-link :to="{name: 'profile',params:{username:'@'+post.post_author.username}}">{{post.post_author.first_name}} {{post.post_author.last_name}}</router-link><br>    

                    <span>{{post.date_published | dateshow}}
                         <vue-moments-ago prefix=":" suffix="ago" :date="post.date_published"></vue-moments-ago>
                    </span>
                    <span class="middotDivider"></span>
                </div>
            </div>
        </div>
        <div class="col-md-4 bgcover">
            <router-link :to="{name: 'single', params: {slug : post.slug,username:'@'+post.post_author.username}}">
                <img :src="post.post_heading_image" alt="">
            </router-link>
        </div>
    </div> <!--col-md-8-->
</template>
<script>
import VueMomentsAgo from 'vue-moments-ago'
import moment from 'moment';
export default {
    props: ['post'],
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
    }
}
</script>
