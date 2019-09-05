<template>
     <div class="row" >               
        <div class="col-md-9">
            <div class="align-self-center">
                <div class="capsSubtle mb-2">{{post.category_name}}</div>
                <h3 class="entry-title mb-3"><a href="single.html">{{post.post_heading}}</a></h3>
                <div class="entry-excerpt">
                    <p>
                        {{post.post_body_preview | trimPost}}
                    </p>
                </div>
                <div class="entry-meta align-items-center">
                    <a href="author.html">{{post.post_author.first_name}} {{post.post_author.last_name}}</a><br>    

                    <span>{{post.date_published | dateshow}}
                         <vue-moments-ago prefix=":" suffix="ago" :date="post.date_published"></vue-moments-ago>
                    </span>
                    <span class="middotDivider"></span>
                </div>
            </div>
        </div>
        <div class="col-md-3 bgcover">
            <img :src="post.post_heading_image" alt="">
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
