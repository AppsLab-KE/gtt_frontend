<template>
    <div>
        <a href="#"><i class="icon-facebook"></i></a>
        <a href="#"><i class="icon-twitter"></i></a>
        <span class="float-right likes d-none d-lg-block">{{post.ratings_count}}</span>
        <a href="#"><i :class="['fa', hasLiked ? 'fa-heart': 'fa-heart-o']"></i></a> 
        <a href="#"><i :class="['fa', hasBookmarked ? 'fa-bookmark' : 'fa-bookmark-o']"></i></a>
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
    }
}
</script>

<style lang="scss" scoped>
.likes {
    margin-left: 30px;
    position: absolute;
    padding: 2px 10px;
}
</style>

