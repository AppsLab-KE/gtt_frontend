<template>
    <div>
        <div v-for="(reply, $index) in replies" :key="$index" class="comment-card">
            <hr>
            <div class="post-author row-flex" style="padding:5px!important;">
                <router-link :to="{name: 'profile',params:{username:'@'+reply.user_that_replied.username}}" >
                    <div class="author-img">
                        <img alt="author avatar" v-lazy="reply.user_that_replied.user_avatar" width="50" class="">
                    </div>
                </router-link>
                <div class="author-content">
                <div class="top-author text-left">
                    <h5 class="heading-font">
                        <router-link :to="{name: 'profile',params:{username:'@'+reply.user_that_replied.username}}" >
                        {{reply.user_that_replied.first_name +" "+ reply.user_that_replied.last_name}} 
                        <small>@{{ reply.user_that_replied.username }} </small> 
                        </router-link>
                        <span class="pull-righ"> &nbsp;
                            <vue-moments-ago prefix=" " suffix="ago" :date="reply.date_replied"></vue-moments-ago>
                        </span>
                        <span class="col-2"></span>
                        <span v-if="isLoggedIn && currentUser.username === reply.user_that_replied.username">
                            <i class="fa delete fa-trash-o text-danger" title="delete comment" @click="deleteReply(reply.resource_key)"></i>
                        </span>
                    </h5>
                    <p>{{reply.reply}}</p>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VueMomentsAgo from 'vue-moments-ago'
export default {
    props: ['replies'],
    components: {
        VueMomentsAgo,
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
        deleteReply(resourceKey){
            var vm  = this;
            this.$bvModal.msgBoxConfirm('Confirm that you want to delete this comment reply !', {
                title: 'Please Confirm',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'YES',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
            .then(value => {
                if(value == true){
                    axios.post(`/replies/${resourceKey}/delete`, {})
                        .then((response) => {
                            vm.$bvToast.toast('Comment reply deleted', {
                                title: 'Delete Reply',
                                variant: 'success'
                            });
                            var existing = vm.replies;
                            var index = existing.findIndex(reply => reply.resource_key === resourceKey);
                            existing.splice(index, 1)
                            vm.$emit('update:replies', vm.replies);
                            return
                        }).catch((error) => {
                            // ! error ocuured
                        });
                }else{
                    // ! this.$toast.error('Error')
                }
            })
            .catch(err => {
                // ! An error occurred
            });
        }
    }

}
</script>
