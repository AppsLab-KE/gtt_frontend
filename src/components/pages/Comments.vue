<template>
    <div class="single-comment comments_wrap">
        <section id="comments">
            <div class="comments-inner clr">
                <div v-if="isLoggedIn" id="respond" class="comment-respond" @submit.prevent="postComment">
                    <h3 id="reply-title" class="comment-reply-title">Leave a comment</h3>
                    <form method="post" id="commentform" class="comment-form" novalidate="">
                    <p class="comment-form-comment">
                        <!-- <label for="comment">Comment:</label>  -->
                        <textarea id="comment" v-model="form.comment" cols="45" rows="3" maxlength="65525"></textarea>
                        <small v-if="allerrors.comment" :class="[' text-danger']">{{ allerrors.comment[0].message }}</small>
                    </p>
                    <p class="form-submit">
                        <input name="submit" type="submit" id="submit" class="submit btn btn-success btn-block" :value="button">
                    </p>
                    </form>
                </div>
                <div v-else class="comment-respond">
                    <a class="btn btn-success" href="#" v-b-modal.my-modal-login>Login to Comment</a>
                    <br>
                </div>
                <!-- #respond -->
                <div class="">
                    <div>
                        <b-card class="comment-box text-center">
                            <div v-if="postCount <= 0" class="bg-secondary text-light">
                                <nothing message="No comments yet !"></nothing>
                            </div>
                            <div v-else class="">
                                <span @click="getCommets" class="bg-secondary load-comments text-light" style="padding: 10px;" v-if="!showCommets">See comments ({{postCount}})</span>
                                <div v-else>
                                    <h4 class="text-left">Comments ({{postCount}})</h4><br>
                                    <div v-for="(comment, $index) in comments.results" :key="$index" class="comment-card">
                                        <div class="post-author row-flex" style="padding:5px!important;">
                                            <router-link :to="{name: 'profile',params:{username:'@'+comment.user_that_commented.username}}" >
                                                <div class="author-img">
                                                    <img alt="author avatar" v-lazy="comment.user_that_commented.user_avatar" width="70" class="">
                                                </div>
                                            </router-link>
                                            <div class="author-content">
                                            <div class="top-author text-left">
                                                <router-link :to="{name: 'profile',params:{username:'@'+comment.user_that_commented.username}}" >
                                                    <h5 class="heading-font">{{comment.user_that_commented.first_name +" "+ comment.user_that_commented.last_name}} 
                                                        <small>@{{ comment.user_that_commented.username }} </small> 
                                                        <span class="pull-right"> &nbsp;
                                                             <!-- {{comment.date_commented | dateshow}} -->
                                                            <vue-moments-ago prefix=" " suffix="ago" :date="comment.date_commented"></vue-moments-ago>
                                                        </span>
                                                    </h5>
                                                </router-link>
                                                <p>{{comment.comment}}</p>
                                                </div>
                                            </div>
                                        </div>  
                                    </div>
                                     <a href="#" v-if="comments.next != null" class="btn btn-succ" @click.prevent="paginateComments">More comments</a>
                                </div>
                            </div>
                        </b-card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Nothing from '@/components/more/Nothing'
import VueMomentsAgo from 'vue-moments-ago'
import moment from 'moment';
export default {
    props: ['post'],
    components: {
        Nothing, VueMomentsAgo, 
    },
    data(){
        return {
            form: {
                comment: ''
            },
            button: 'Post Comment',
            allerrors: [],
            showCommets: false, 
            comments: [],
            postCount: this.post.comments_count,
        }
    },
    computed: {
        currentUser(){
            return this.$store.state.currentUser
        },
        isLoggedIn(){
            return this.$store.getters.isAuthenticated
        },
    },
    methods: {
        postComment(){
            this.allerrors = [];
            this.button = 'Posting Comment ...'
            var slug = this.$route.params.slug
            axios.post('/posts/'+slug+'/comments/create', this.$data.form)
            .then( response => {
                this.$bvToast.toast('Comment Created', {
                    title: 'Comment',
                    variant: 'success'
                });
                this.allerrors = [];
                this.button = 'Post Comment'
                this.form.comment = ''
                this.postCount ++ ;
                this.getCommets();
                return;
            })
            .catch(error => {
                if(error.response){
                    this.allerrors = error.response.data.detail;
                    this.button = 'Post Comment'
                }
            })
        },
        getCommets(){
            axios.get('/posts/'+this.post.slug+'/comments?offset=0&limit='+process.env.VUE_APP_PAGINATION)
            .then(response => {
                this.comments = response.data
                // console.log(this.comments)
                this.showCommets = true;
            })
            .catch( error => {
                this.showCommets = false;
            });
            return;
        },
        paginateComments()
        {
            let comments = this.comments;
            if(comments.next == null){
                return ;
            }else{
                axios.get(comments.next)
                .then((response) => {
                   var existing = comments;
                    response.data.results.forEach( data => existing.results.push(data))
                    existing.next = response.data.next
                    existing.previous = response.data.previous
                    existing.count = response.data.count
                    this.comments = existing
                    this.showCommets = true;
                    return;
                })
                .catch(error => {
                    this.showCommets = false;
                });
            }
            return;
        }
    },
    filters: {
         dateshow(value){
            var date = moment(value).format("MMM Do YY"); 
            return date;
        },
    }
}
</script>

<style lang="scss">
.comment-card{
    background-color: #FAFAFA;
    border-radius: 5px;
    margin-bottom: 10px;
}
.comment-box{
    margin-bottom: 20px;
}
.load-comments:hover{
    cursor: pointer;
}
</style>


