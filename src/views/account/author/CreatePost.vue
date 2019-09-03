<template>
    <div>
        <div class="content-widget">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 creator">                                         
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
    methods: {
        onChange() {
            console.log(this.content)
        },
        uploadCallback(url) {
            console.log("uploaded url", url)
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
