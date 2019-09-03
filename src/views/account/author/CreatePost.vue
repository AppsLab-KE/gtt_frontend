<template>
    <div>
        <div class="content-widget">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 creator">  
                        <!-- <div class="row">
                            <div class="col-md-10 offset-1">
                                <h5 class="float-left">Draft &nbsp;&nbsp;&nbsp; Saving...</h5>
                                 <span class="top-menu float-right">
                                    <a href="#" class="btn">Create Post</a>
                                </span>
                            </div>
                        </div>                                        -->
                        <medium-editor v-model="content"
                        :readOnly="false"
                        :prefill="defaultValue"
                         :options='options'
                         v-on:uploaded="uploadCallback"
                         :onChange="onChange"
                          />
                    </div> <!--col-md-8-->
                </div>
            </div> <!--content-widget-->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultValue: `<h1>Title here</h1>`,
            content: ``,
            options: {
                uploadUrl: "https://api.imgur.com/3/image",
                uploadUrlHeader: {'Authorization': 'Client-ID a048dd8bea98363'},
                file_input_name: "image",
                imgur: true,
            }
        }
    },
    mounted(){
        this.defaultValue = this.$store.state.savedDraft;
    },
    methods: {
        onChange() {
            console.log(this.content)
            localStorage.setItem('userDraft', this.content)
            this.$store.commit('IS_TYPING')
            this.$store.commit('SAVING_DRAFT', this.content)
        },
        uploadCallback(url) {
            // console.log("uploaded url", url)
        }
    },
    computed: {
        imgur(){
            return process.env('VUE_APP_IMGUR_CLIENT_ID')
        }
    }
}
</script>


<style lang="scss" scoped>
.creator{
    min-height: 400px;
}
iframe{
    border: 0px;
}
</style>
