<template>
    <div>
        <div class="content-widget">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 creator">  
                        <div class="container phone-creater">
                            <div class="col-md-12 phone-creater">
                                <div v-if="savedDraft != ''" class="publish float-right d-lg-none">
                                    <span v-if="isTyping" class="draft">Draft saved</span>
                                        <span class="top-menu ">
                                        <a v-if="savedDraft.content !== '<p><br></p>' " href="#" v-b-modal.modal-xl class="btn">Publish?</a>
                                    </span>
                                </div>
                                <div class="title-input">
                                    <ValidationProvider rules="required|max:120" v-slot="{ errors }" name="title">
                                        <textarea maxlength="120" :class="errors.length > 0 ? 'text-danger' : ''" placeholder="Title goes here" v-on:input="onChange" v-model="title" required>
                                        </textarea>
                                        <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                                        <small :class="['float-right', errors.length > 0 ? 'text-danger' : '' ]">{{title.length}}/120</small>
                                    </ValidationProvider>
                                </div>
                            </div>
                        </div>                                       
                        
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
        <b-modal id="modal-xl" size="xl" centered hide-footer hide-header scrollable title="Extra Large Modal">
            <div class="container">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-12">
                            <button type="button" @click="$bvModal.hide('modal-xl')" class="close">&times;</button>
                        </div>
                        <br><br>
                        <div class="col-lg-6">
                            <div class="row1">
                                <div class="col-xs-12" >
                                    <label>Image Preview for your Post &nbsp;&nbsp;</label> 
                                    <span class="edit-phto1 change-avatar">
                                        <label class="fileContainer1">
                                            <i class="fa fa-camera"></i>
                                            Choose Image
                                            <input type="file" id="file"  ref="file" @change="onFileChange" accept="image/*"/>
                                        </label>
                                    </span><br> <br>
                                </div>
                                <div class="croppie col-xs-12">
                                    <vue-croppie
                                        ref="croppieRef"
                                        :enableOrientation="true"
                                        :enableResize="false"
                                        :enableZoom="true"
                                        :enforceBoundary="true"
                                        :viewport="{ width: vueCroppie.width, height: vueCroppie.height, type: 'square' }"
                                        :boundary="{height: vueCroppie.height+15, width: vueCroppie.width+15}"
                                        @result="result"
                                        @update="update">
                                    </vue-croppie>
                                </div>
                                <span><small>The maximum file size allowed is 300KB</small></span> 
                            </div>
                            <div class="form-group">
                                <label for="title">Post Title</label>
                                <input id="title" v-model="title" readonly type="text" class="form-control">
                                <span><small>This will appear at the top of your post, will lead readers to your post</small></span>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="col-md-10 md-offset-1 col-sm-12">
                                <div class="form-group">
                                    <label for="category">Category</label>
                                    <select v-model="category" name="" id="category" class="form-control" placeholder="Select Category">
                                        <option value="" >Select Category</option>
                                        <option v-if="categories.length > 0" v-for="category in categories" :key="category.slug" :value="category.category_name">{{category.category_name}}</option>
                                    </select>
                                    <span><small>The category in which the post best suits, it will be used group the post eg Laravel, Django, Js, Vue ...</small></span>
                                </div>
                                <div class="form-group">
                                    <label for="tags">Tags</label>
                                    <vue-tags-input
                                        v-model="tag"
                                        :tags="tags"
                                        @tags-changed="newTags => tags = newTags"
                                        :max-tags="5"
                                        :autocomplete-items="filteredItems"
                                        />
                                        <br>
                                        <span><small>Add tags to associate your posts to (upto 5 tags) </small></span>
                                </div>
                                <div class="form-group">
                                    <br>
                                    <small v-if="allerrors.title" :class="[' text-danger']">{{ allerrors.title[0].message }}</small>
                                    <small v-if="allerrors.content" :class="[' text-danger']">{{ allerrors.content[0].message }}</small>
                                    <small v-if="allerrors.image" :class="[' text-danger']">{{ allerrors.image[0].message }}</small>
                                    <small v-if="allerrors.category" :class="[' text-danger']">{{ allerrors.category[0].message }}</small>
                                    <br>
                                    <button class="create-post float-right" type="submit" @click="createPost()">{{create}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
    components: {
        VueTagsInput
    },
    data() {
        return {
            defaultValue: `<p>body goes here...</p>`,
            title: 'Title here',
            content: ``,
            options: {
                uploadUrl: "https://api.imgur.com/3/image",
                uploadUrlHeader: {'Authorization': 'Client-ID a048dd8bea98363'},
                file_input_name: "image",
                imgur: true,
                toolbar: {
                buttons: ["bold", "italic", "underline", "quote", "h1", "h2", "h3", 'pre',          'unorderedlist']
                }
            },
            cropped: null,
            file: '',
            vueCroppie:{
                width: 440,
                height: 275
            },
            tag: '',
            tags: [],
            autocompleteItems: [{ text: 'Laravel'}, { text: 'Js'}, { text: 'Django'}, { text: 'Java'},{ text: 'Python'},{ text: 'Rails'}],
            categories : [],
            fetchedTags: [],
            allerrors: [],
            category: '',
            create: 'Create Post'
        }
    },
    mounted(){
        let draft = this.$store.state.savedDraft
        if(draft !== ''){
            // console.log(draft.content)
            // console.log( draft.content.replace(/(&nbsp;|<([^>]+)>)/ig, "") );
            if(draft.content.replace(/(&nbsp;|<([^>]+)>)/ig, "") !== ''){
                this.defaultValue = draft.content;
                this.content = draft.content;
                this.title = draft.title;
                this.$store.commit('NOT_TYPING')
            }
        }
        const cwidth = $(window).width();
        // console.log(cwidth);
        if(cwidth < 1200 && cwidth >= 992){
            this.vueCroppie.width = 320
            this.vueCroppie.height = 200
        }else if( cwidth < 992 && cwidth >= 768) {
            this.vueCroppie.width = 380
            this.vueCroppie.height = 234
        } else if(cwidth < 768 && cwidth > 360) {
            this.vueCroppie.width = 380
            this.vueCroppie.height = 234
        }else if(cwidth <= 360){
            this.vueCroppie.width = 260
            this.vueCroppie.height = 163
        }
        this.getCategories()
        this.getTags()
    
    },
    updated(){
        require('./../../../../public/assets/js/prettify.js');
        const els = document.getElementsByTagName("pre");
        // console.log(els)
        for (let i = 0; i < els.length; i++) {
            const element = els[i];
            element.classList.add('prettyprint');
        }
    },
    methods: {
        onChange() {
            // console.log(this.title)
            if(this.content != ``){
                let payload = {content: this.content, title: this.title}
                this.$store.commit('IS_TYPING')
                this.$store.commit('SAVING_DRAFT', payload)
            }
        },
        uploadCallback(url) {
            // console.log("uploaded url", url)
        },
        createPost () {
            if(this.formValidations()){
                return;
            }else{
                this.allerrors = [];
            }
            this.create = 'Creating Post ...'
            let options = {
                type: 'blob',
                size: 'original',
                quality: 1,
                format: 'png',
                square: true,
            };

            this.$refs.croppieRef.result(options, (output) => {
                this.cropped = output;
            }).then((data) => {
                let formData = new FormData();
                formData.append("post_heading_image", data, data.name+".png");
                formData.append('post_heading', this.title)
                formData.append('post_body', this.content)
                formData.append('category', this.category)
                if(this.allTags.length) {
                    for (var i = this.allTags.length - 1; i >= 0; i--) {
                        formData.append("tag", this.allTags[i]);
                    }
                }

                axios.post('/posts/create', formData,{headers: {'Content-Type': `multipart/form-data; boundary=${formData._boundary}`}})
                .then((response) => {
                    // console.log(response.data)
                    this.create = 'Post Created'
                    this.$bvToast.toast('Post Created', {
                        title: 'Post',
                        variant: 'success'
                    })
                    this.title = 'Title here'
                    this.defaultValue = `<p>body goes here...</p>`
                    this.category = ''
                    this.file = ''
                    this.content = ``
                    this.clear();
                    this.bind('none');
                    this.tags = []
                    localStorage.removeItem('userDraft')
                    this.$bvModal.hide('modal-xl')
                    this.$router.push({name: 'profile', params: {username : '@'+this.currentUser.username}});
                    // window.location.href = '/@'+currentUser.username
                    return;
                })
                .catch((error) => {
                    // console.log(error.response)
                    if(error.response){
                        this.allerrors = error.response.data.detail;
                    }
                });
            });
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.file = this.$refs.file.files[0];
            // console.log(this.file)
            if( this.file ){
                if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
                    if (this.file.size > 1024 * 1024 * 5) {
                        this.$bvToast.toast('Image greater than 5 MB', {
                            title: 'Image Error',
                            variant: 'danger'
                        })
                        this.clear();
                        return;
                    }
                    this.createImage(files[0]);
                }else{
                    this.$bvToast.toast('Not Valid Image', {
                            title: 'Image Error',
                            variant: 'danger'
                        })
                    this.clear();
                }
            }
        },
        createImage(file) {
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.bind(e.target.result);
            };
            reader.readAsDataURL(file);
        },
        bind(url) {
            this.$refs.croppieRef.bind({
                url: url,
            });
        },
        clear () {
            const input = this.$refs.file;
            input.type = 'text';
            input.type = 'file';
        },
        result(output) {
            // console.log(output)
            this.cropped = output;
        },
        update(val) {
            // console.log(val);
        },
        getCategories(){
            axios.get('/posts/categories')
            .then( response => {
                this.categories = response.data.results
            })
        },
        getTags(){
            axios.get('/posts/tags')
            .then(response => {
                response.data.results.forEach(cat => {
                    this.fetchedTags.push({text: cat.tag_name})
                })
            })
            // console.log(this.fetchedTags)
        },
        formValidations(){
            if(this.file == '' || this.title == '' || this.content == `` || this.category == ''){
                if(this.file === ''){
                    this.allerrors = {image: [{message: 'Post Image is required !'}]}
                }
                if(this.title === ''){
                    this.allerrors = {title: [{message: 'Post Title is required !'}]}
                }
                if(this.content == `` && this.defaultValue == ''){
                    this.allerrors = {content: [{message: 'Post Content is required !'}]}
                }
                if(this.category == ``){
                    this.allerrors = {category: [{message: 'Post Category is required !'}]}
                }
                return true;
            }
            else
                return false;
        }
    },
    computed: {
        imgur(){
            return process.env('VUE_APP_IMGUR_CLIENT_ID')
        },
         isTyping(){
            return this.$store.state.isTyping;
        },
        savedDraft(){
            return this.$store.state.savedDraft;
        },
        allTags() {
             var tagged = []
            this.tags.forEach(i => {
                tagged.push(i.text.toLowerCase());
            });
            return tagged;
        },
        filteredItems() {
            return this.fetchedTags.filter(i => {
                return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
            });
        },
        currentUser(){
            return this.$store.state.currentUser
        }
    }
}
</script>


<style lang="scss">
.creator{
    min-height: 400px;
}
.title-input {
    textarea{
        border: none;
        font-size: 40px;
        height: auto;
        color: #292929;
        font-weight: 500;
        overflow:auto;
        resize:none;
        padding-top: 0px;
        line-height: 1; 
        @media only  screen and (max-width: 967px){
            font-size: 25px;
            height: 80px;
            width: 100%;
        }
    }
    textarea:focus{
        outline: none;
    }
}
.phone-creater{
    @media only  screen and (max-width: 967px){
        padding: 0px;
    }
}
.change-avatar{
    color: #fff;
    background-color: #0B8DCD;
    border-radius: 0px;
    padding: 5px;
}
.fileContainer1 [type=file] {
    cursor: pointer;
    display: block;
    filter: alpha(opacity=0);
    opacity: 0;
    position: absolute;
    // right: 0px;
    text-align: right;
    // top: 0;
    // width: 100%;
    overflow: hidden;
}

.croppie{
    padding: 5px;
}
.close{
    font-size: 40px;
}
#category{
    color: #292929;
        padding: 10px;
        line-height: 20px;
}
.form-control{
    height: 40px!important;
}
.vue-tags-input {
    height: 30px;
    .ti-input{
        height: 42px;
        padding: 0px;
    }
    .ti-tag {
        height: 30px;
        background-color: #2A9899;
    }
    .ti-tags{
        height: 30px;
  }
  .ti-new-tag-input{
      padding: 0px;
      height: 30px;
      line-height: 10px;
  }
  .ti-new-tag-input-wrapper{
      height: 30px;
  }
}
.create-post{
    background-color: #45A87C;
    border: 0px #45A87C solid;
    padding: 10px;
}
</style>
