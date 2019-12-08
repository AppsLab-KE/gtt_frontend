<template>
    <div class="content-widget">
        <vue-headful title="GeeksTalkThursday - About"/>
        <div class="container">
            <div class="row justify-content-between post-has-bg ml-0 mr-0">
                <div class="col-lg-6 col-md-4 bgcover  ml-0" style="background-image:url(assets/images/bg1.png);"></div>
                <!-- d-none d-md-block -->
                <div class="col-lg-6 col-md-8">
                    <div class="pt-5 pb-5 pl-md-5 pr-5 align-self-center">
                        <div class="capsSubtle mb-2">About us</div>
                        <h2 class="entry-title mb-3"><a href="#">{{app_name}}</a></h2>
                        <div class="entry-excerpt">
                            <p>
                                {{app_name}} is a Tech Community for developers to Learn, Engage, Share knowledge and lots of commits 
                                <br>
                                <span><code>#LetTheCommitsSpeak</code></span>
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
        </div>
    </div> <!--content-widget-->
</template>
<script>
export default {
    computed: {
        app_name(){
            return process.env.VUE_APP_NAME
        },
    }
}
</script>
<style lang="scss" scoped>
.bgcover {
    height: 300px;
}
</style>

