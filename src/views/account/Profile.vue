<template>
    <div>
        <div class="content-widget">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">                               
                        <div class="box box-author m_b_2rem">
                            <div class="post-author row-flex">
                                <div class="author-img">
                                    <img alt="author avatar" src="assets/images/author-avata-1.jpg" class="avatar">
                                </div>
                                <div class="author-content">
                                <div class="top-author">
                                    <h5 class="heading-font"><a href="author.html" title="Ryan" rel="author">Ryan Mark</a></h5></div>
                                    <p class="d-none d-md-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet ut ligula et semper. Aenean consectetur, est id gravida venenatis.</p>
                                    <div class="content-social-author">
                                        <a target="_blank" class="author-social" href="author.html#">Facebook </a>
                                        <a target="_blank" class="author-social" href="author.html#">Twitter </a>
                                        <a target="_blank" class="author-social" href="author.html#"> Google + </a>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                        <h4 class="spanborder">
                            <span>Latest Posts</span>
                        </h4>

                        <blog></blog>            

                    </div> <!--col-md-8-->
                    <div class="col-md-4 pl-md-5 sticky-sidebar">                    
                        <porpular></porpular>
                    </div> <!--col-md-4-->
                </div>
            </div> <!--content-widget-->
        </div>
    </div>
</template>
<script>
import Blog from '@/components/pages/Blog.vue'
import Porpular from '@/components/pages/Porpular'
export default {
    components: {
        Blog, Porpular
    }
}
</script>
