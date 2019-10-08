<template>
    <div>
        <a :href="'http://www.facebook.com/sharer.php?u='+app_url+'/post/@'+post.post_author.username+'/'+post.slug" target="_blank" title="facebook"><i class="icon-facebook"></i></a>
        <a :href="`https://twitter.com/share?url=${app_url}/post/@${post.post_author.username}/${post.slug}&text=Post%20from%20${app_name}&hashtags=${app_name}`" title="twitter" target="_blank"><i class="icon-twitter"></i></a>
        <a :href="'https://wa.me/?text='+app_name+' '+app_url+'/post/@'+post.post_author.username+'/'+post.slug" title="whatsapp" target="_blank"> <i class="icon-whatsapp"></i> </a>
        <span class="float-right likes d-none d-lg-block">{{likes}}</span>
        <a :class="[hasLiked ? 'bg-theme' : '']" href="#" @click.prevent="likePost(post.slug)"><i :class="['fa', hasLiked ? 'fa-heart': 'fa-heart-o']"></i></a> 
        <a :class="[hasBookmarked ? 'bg-theme' : '']" href="#" @click.prevent="bookmarkPost(post.slug)"><i :class="['fa', hasBookmarked ? 'fa-bookmark' : 'fa-bookmark-o']"></i></a>
        <span class="float-right likes d-lg-none">{{likes}} likes</span>
    </div>     
</template>

<script>
export default {
    props: ['post'],
    data(){
        return {
            hasLiked: this.post.has_rated,
            hasBookmarked: this.post.has_bookmarked,
            likes: this.post.ratings_count,
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
                    this.likes += 1;
                }else{
                    this.hasLiked = true;
                    this.likes -= 1;
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
    },
    computed: {
         app_name(){
            return process.env.VUE_APP_NAME
        },
        app_url(){
            return process.env.VUE_APP_APP_URL
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

