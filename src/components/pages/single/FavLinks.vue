<template>
    <div>
        <a href="#"><i class="icon-facebook"></i></a>
        <a href="#"><i class="icon-twitter"></i></a>
        <span class="float-right likes d-none d-lg-block">{{post.ratings_count}}</span>
        <a :class="[hasLiked ? 'bg-theme' : '']" href="#" @click.prevent="likePost(post.slug)"><i :class="['fa', hasLiked ? 'fa-heart': 'fa-heart-o']"></i></a> 
        <a :class="[hasBookmarked ? 'bg-theme' : '']" href="#" @click.prevent="bookmarkPost(post.slug)"><i :class="['fa', hasBookmarked ? 'fa-bookmark' : 'fa-bookmark-o']"></i></a>
        <span class="float-right likes d-lg-none">{{post.ratings_count}} likes</span>
    </div>     
</template>

<script>
export default {
    props: ['post'],
    data(){
        return {
            hasLiked: this.post.has_rated,
            hasBookmarked: this.post.has_bookmarked,
        }
    },
    methods: {
        likePost(slug){
            let rating = 1;
            if(this.hasLiked){
                rating = 0;
            }else{
                rating = 1;
            }
            let formData = new FormData();
            formData.append('rating', rating);
            axios.post('/posts/'+slug+'/rate', formData)
            .then(response =>{
                if(this.hasLiked){
                    this.hasLiked = false;
                }else{
                    this.hasLiked = true;
                }
            });
            return;
        },
        bookmarkPost(slug){
            if(this.hasBookmarked){
                axios.post('/bookmarks/'+slug+'/delete', {})
                .then(response =>{
                    this.hasBookmarked = false;
                });
            }else{
                axios.post('/posts/'+slug+'/bookmark/create', {})
                .then(response =>{
                    this.hasBookmarked = true;
                });
            }
            return;
        }
    }
}
</script>

<style lang="scss" scoped>
.likes {
    margin-left: 30px;
    position: absolute;
    padding: 2px 10px;
}
.bg-theme {
    background-color: #45A87C;
}
</style>

