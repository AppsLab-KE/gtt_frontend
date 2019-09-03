<template>
    <ul>
        <li class="current-menu-item"><router-link to="/">Home</router-link></li>
        <li class="menu-item-has-children"><a>Categories</a>
            <ul class="sub-menu">
                <li><router-link to="/category">Laravel</router-link></li>
                <li><router-link to="/category">Vue</router-link></li>
                <li><router-link to="/category">Django</router-link></li>
            </ul>
        </li>
        <!-- <li><a href="#">Typography</a></li>
        <li><a href="#">Politics</a></li>
        <li><a href="#">Health</a></li>
        <li><a href="#">Design</a></li> -->
        <li><router-link to="/search">Search</router-link></li>
        <li><router-link to="/single">Single</router-link></li>
        <li><router-link to="/about">About</router-link></li>                                
        <li><router-link to="/contact">Contact</router-link></li>   
        <li v-if="savedDraft !== '' && currentUrl === '/publish'" class="float-right">
            
            <span v-if="isTyping" class="draft">Draft saved</span>
                <span class="top-menu ">
                <a href="#" class="btn">Publish?</a>
            </span>
                            
        </li>                   
    </ul>
</template>
<script>
export default {
    data(){
        return {
            currentUrl: ''
        }
    },
    computed: {
        isTyping(){
            return this.$store.state.isTyping;
        },
        savedDraft(){
            return this.$store.state.savedDraft;
        }
    },
    watch: {
        '$route'(to, from) {
            this.currentUrl = to.path
            // console.log(to.path)
        }
    },
    created(){
        this.currentUrl = window.location.pathname
        // console.log(window.location.pathname)
    }
}
</script>

<style scoped>
    .menu-primary li{
        margin-right: 20PX;
    }
    .draft{
        color: #292929;
    }
</style>
