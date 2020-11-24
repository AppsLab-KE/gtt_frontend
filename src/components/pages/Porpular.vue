<template>
    <div class="sidebar-widget latest-tpl-4 ">
        <h4 v-if="porpular.length > 0" class="spanborder">
            <span>Popular</span>
        </h4>
        <ol v-if="porpular.length > 0">
            <li v-for="(related, $index) in porpular" :key="$index" class="d-flex">
                <div class="post-count">0{{$index + 1}}</div>
                <div class="post-content">
                     <h5 class="entry-title mb-3"><router-link :to="{name: 'single', params: {slug : related.slug,username:'@'+related.post_author.username}}">{{related.post_heading}}</router-link></h5>
                    <div class="entry-meta align-items-center">
                        <router-link :to="{name: 'profile',params:{username:'@'+related.post_author.username}}">{{related.post_author.first_name}} {{related.post_author.last_name}}</router-link> in
                            <router-link :to="{name: 'category',params: {category: related.category.category_name}}">{{related.category.category_name}}</router-link>
                            <br>
                        <span>
                            {{related.date_published | dateshow}} &nbsp;
                            <vue-moments-ago prefix="" suffix="ago" :date="related.date_published"></vue-moments-ago>
                        </span>
                        <span class="middotDivider"></span>
                        <!-- <span class="readingTime" title="3 min read">3 min read</span> -->
                        <!-- <span class="svgIcon svgIcon--star">
                            <svg class="svgIcon-use" width="15" height="15">
                                <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                            </svg>
                        </span> -->
                    </div>
                </div>
            </li>
        </ol>
        <br>
       <div class="sidebar-widget text-center">
           <h4 class="spanborder text-left">
               <span>Partners</span>
           </h4>
           <div class="row">
             <div class="col-6">
               <div class="ads">
                 <a href="https://droidcon.co.ke/"><img src="/img/app.png" alt="ads" width="100"></a>
               </div>
             </div>
             <div class="col-6">
               <div class="ads" style="margin-top:  -20px;">
                 <br>
                 <a target="_blank" href="https://21cskills.africa/"><img width="100" src="/img/21c.jpg" alt="ads"></a>
               </div>
             </div>
               <div class="col-6">
                   <div class="ads">
                       <br>
                       <a target="_blank" href="https://aug.atlassian.com/nairobi"><img width="100" src="/img/acnairobi.jpeg" alt="ads"></a>
                   </div>
               </div>
               <div class="col-6">
                   <div class="ads">
                       <br>
                       <a target="_blank" href="https://www.meetup.com/Android254/"><img width="75" src="/img/android-254.svg" alt="ads"></a>
                   </div>
               </div>
           </div>
           <br>
           <div class="ads">
               <a target="_blank" href="https://appslab.co.ke"><img width="150" src="/img/appslab.png" alt="ads"></a>
           </div>
       </div>
    </div>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'
import moment from 'moment';
export default {
    components: {
        VueMomentsAgo,
    },
    mounted(){
        if(this.$store.state.allPorpular.length == 0)
            this.getPorpulars();
    },
    methods: {
        getPorpulars() {
            axios.get('/posts/popular?top_n=5')
            .then( response => {
                this.$store.commit('ALL_PORPULAR',response.data.results);
            })
        },
    },
    computed: {
        porpular(){
            return this.$store.state.allPorpular;
        },
    },
    filters: {
        dateshow(value){
            var date = moment(value).format("MMM Do YY");
            return date;
        },
    }
}
</script>

