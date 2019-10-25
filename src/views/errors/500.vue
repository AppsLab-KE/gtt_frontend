<template>
     <div class="container page-404">
        <article class="entry-wraper mb-5">
            <h1 class="text-center mb-3 mt-5">500</h1>
            
            <!-- <form action="#" method="get" class="search-form d-lg-flex open-search mb-5" @submit.prevent="search">                           
                <i class="icon-search"></i>                            
                <input type="text" class="search_field" placeholder="Search..." value="" v-model="form.search">
            </form> -->

            <p class="text-center">An error occured, we're trying fixing this issue asap<br>
                visit the <router-link to="/">Homepage</router-link> or <router-link to="/contact">Contact us</router-link> about the problem
            </p>
        </article> <!--entry-content-->                   
    </div> <!--container-->
</template>

<script>
export default {
    data() {
        return {
            form : {
                search: '',
            },
        }
    },
    methods: {
        search(){
            if(this.$data.form.search != ''){
                return this.$router.push({name: 'search', query:{ s : this.$data.form.search}});
            }else{ 
                return;
            }
        }
    }
}
</script>
