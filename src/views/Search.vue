<template>
    <div class="content-widget">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <h4 class="spanborder">
                        Search resualt for
                        <span>"Django"</span>
                    </h4> 

                    <blog></blog>

                </div> <!--col-md-8-->
                <div class="col-md-4 pl-md-5 sticky-sidebar">                    
                   <porpular></porpular>
                </div> <!--col-md-4-->
            </div>
        </div> <!--content-widget-->
    </div>
</template>
<script>
import Porpular from '@/components/pages/Porpular'
import Blog from '@/components/pages/Blog.vue'
export default {
    components: {
        Porpular, Blog
    }
}
</script>

