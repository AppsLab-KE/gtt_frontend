<template>
    <div>
        <div class="overlay">
            <a href="#" class="icon" @click="$bvModal.show('bv-modal-avatar')" title="User Profile">
                <i class="fa fa-camera"></i> 
            </a>
        </div>

        <b-modal id="bv-modal-avatar" style="border-radius: 0px !important; "  hide-footer>
            <template slot="modal-title">
                <h4 class="f-title">Change Avatar</h4>
            </template>
            <div class="d-block text-center">

                <div class="col-md-12 ">
                    <!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
                    <div class="row">
                    <div class="croppie col-md-8 col-xs-12">
                        <vue-croppie
                            ref="croppieRef"
                            :enableOrientation="true"
                            :enableResize="false"
                            :enableZoom="true"
                            :enforceBoundary="true"
                            :viewport="{ width: 180, height: 180, type: 'square' }"
                            :boundary="{height: 200, width: 200}"
                            @result="result"
                            @update="update">
                        </vue-croppie>
                    </div>
                    <div class="col-md-4 align-self-center col-xs-12" >
                        <div class="edit-phto1 change-avatar" >
                            <label class="fileContainer1">
                                Choose Image
                                <input type="file" id="file"  ref="file" @change="onFileChange"/>
                            </label>
                        </div>
                    </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-md-12 col-xs-12">
                        <span><small>The maximum file size allowed is 300KB</small></span> <br>
                        <small v-if="allerrors.avatar" :class="[' text-danger']">{{ allerrors.avatar[0].message }}</small>
                        <button class="btn btn-sm change-avatar pull-right" @click="uploadFile()">{{button.avatar}}</button>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
// import toast from './../../helper/toast'
//  var toast = require('./../../helper/toast');
    export default {
        name: "EditAvatarImage",
        data() {
            return {
                cropped: null,
                success : false,
                button: {
                    avatar: 'Change Avatar'
                },
                file: '',
                allerrors: [],
            }
        },
        methods: {
            uploadFile () {
                this.button.avatar = 'Updating avatar...'
                this.allerrors = []
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
                    this.loading = true;
                    let formData = new FormData();
                    formData.append("avatar", data, data.name+".png");
                    console.log(formData.get('avatar'))
                    axios.post('users/profile/avatar/update', formData,{headers: {'Content-Type': `multipart/form-data; boundary=${formData._boundary}`}})
                    .then((response) => {
                        this.$store.commit("UPDATE_AVATAR", response.data.user);
                        this.button.avatar = 'Change avatar'
                        this.$bvToast.toast('Avatar update success', {
                            title: 'Avatar Update',
                            variant: 'success'
                        })
                        this.$bvModal.hide('bv-modal-avatar')
                        this.clear();
                        this.bind('none');
                        return;
                    })
                    .catch((error) => {
                        console.log(error.response)
                        this.allerrors = error.response.data.details;
                        this.button.avatar = 'Change Avatar'
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
                        if (this.file.size > 1024 * 1024) {
                            this.$bvToast.toast('Image greater than 1 MB', {
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
                console.log(output)
                this.cropped = output;
            },
            update(val) {
                // console.log(val);
            },
        }
    }
</script>

<style scoped>
.change-avatar{
    color: #fff;
    background-color: #0B8DCD;
    border-radius: 0px;
}
.fileContainer1 [type=file] {
    cursor: pointer;
    display: block;
    filter: alpha(opacity=0);
    opacity: 0;
    position: absolute;
    right: 0px;
    text-align: right;
    top: 0;
    width: 100%;
    overflow: hidden;
}

.edit-phto1 .fileContainer1 [type="file"] {
    height: 35px;
    top: -11px;
    width: 126px;
}

.overlay {
  position: absolute!important;
  top: 0!important;
  bottom: 0!important;
  left: 0!important;
  right: 0!important;
  height: 70%!important;
  width: 70%!important;
  opacity: 0!important;
  transition: .3s ease!important;
  /* background-color: #f0f0f0!important; */
  opacity: 0.6!important;
}
.icon {
  color: #000f!important;
  font-size: 50px!important;
  position: absolute!important;
  top: 70%!important;
  left: 50%!important;
  transform: translate(-50%, -50%)!important;
  -ms-transform: translate(-50%, -50%)!important;
  /* text-align: center!important; */
}
.fa-camera:hover {
  color: #000f00!important;
}
.avatar{
    opacity: 0.3!important;
}
</style>

