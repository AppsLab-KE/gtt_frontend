<template>
    <div id="respond" class="comment-respond" @submit.prevent="replyComment()">
        <form method="post" id="commentform" class="comment-form" novalidate="">
        <p class="comment-form-comment">
            <!-- <label for="comment">Comment:</label>  -->
            <textarea id="comment" v-model="form.reply" cols="45" rows="2" maxlength="65525"></textarea>
            <small v-if="allerrors.reply" :class="[' text-danger']">{{ allerrors.reply[0].message }}</small>
        </p>
        <p class="form-submit">
            <input name="submit" type="submit" id="submit" class="submit btn btn-success btn-bloc btn-xs" :value="replyButton">
        </p>
        </form>
    </div>
</template>
<script>
export default {
    props: ['resourcekey','slug'],
    data() {
        return {
            form: {
                reply: '',
            },
            replyButton: 'Reply',
            allerrors: [],
        }
    },
    methods: {
        replyComment(){
            this.allerrors = [];
            this.replyButton = 'Replying to Comment ...'
            axios.post('/comments/'+this.resourcekey+'/replies/create', this.$data.form)
            .then( response => {
                this.$bvToast.toast('Comment Replied', {
                    title: 'Comment Reply',
                    variant: 'success'
                });
                this.allerrors = [];
                this.replyButton = 'Reply';
                this.form.reply = '';
                this.$root.$emit('comments');
                return;
            })
            .catch(error => {
                if(error.response){
                    console.log(error)
                    this.allerrors = error.response.data.detail;
                    this.replyButton = 'Reply'
                }
            })
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
}
</script>
