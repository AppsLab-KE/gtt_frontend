<template>
    <ul>
        <li class="current-menu-item"><router-link to="/">Home</router-link></li>
        <li class="menu-item-has-children"><a>Categories</a>
            <ul class="sub-menu">
                <li v-for="(category, $index) in categories" :key="$index"><router-link :to="{name: 'category', params: {category: category.slug}}">{{category.category_name}}</router-link></li>
            </ul>
        </li>
        <!-- <li><router-link to="/search">Search</router-link></li> -->
        <!-- <li><router-link to="/single">Single</router-link></li> -->
        <li><router-link :class="currentUrl === '/about'?'current-menu-item':'' " to="/about">About</router-link></li>                                
        <li><router-link :class="currentUrl === '/contact'?'current-menu-item':'' " to="/contact">Contact</router-link></li>   
        <li v-if="savedDraft != ''  && currentUrl === '/publish'" class="float-right">
            <span v-if="isTyping" class="draft">Draft saved</span>
                <span class="top-menu ">
                <a v-if="savedDraft.content !== '<p><br></p>'" href="#" v-b-modal.modal-xl class="btn">Publish?</a>
            </span>
                            
        </li>                   
    </ul>
</template>
<script>
export default {
    data(){
        return {
            currentUrl: '',
            categories: []
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
        }
    },
    created(){
        this.currentUrl = window.location.pathname
        this.getCategories()
    },
    methods: {
        getCategories() {
            axios.get('/posts/categories')
            .then( response => {
                this.categories = response.data.results
            })
        },
    }, 
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
