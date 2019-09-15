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
                </div>
                <!-- #respond -->
                <div class="col-md-12">
                    <div class="row">
                        <p>Coments here...</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                comment: ''
            },
            button: 'Post Comment',
            allerrors: [],
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
            })
            .catch(error => {
                if(error.response){
                    this.allerrors = error.response.data.detail;
                    this.button = 'Post Comment'
                }
            })
        }
    }
}
</script>

