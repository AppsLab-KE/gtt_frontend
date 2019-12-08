<template>
    <div>
        <vue-headful title="GeeksTalkThursday - Edit Profile"/>
        <div class="content-widget">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-2 row">                               
                        <div class="box box-author m_b_2rem col-md-8">
                            <div class="post-author row-flex">
                                
                                <div class="author-content">
                                <div class="top-author">
                                    <form method='post' @submit.prevent="updateDetails()">
                                        <div class="form-contact">
                                            <p class="row">
                                                <input type="text" :class="['col-md-6',allerrors.first_name ? 'border-danger':'']" v-model="form.first_name" placeholder="First Name">
                                                <input type="text" :class="['col-md-6',allerrors.last_name ? 'border-danger':'']" v-model="form.last_name" placeholder="Last Name">
                                                <small v-if="allerrors.first_name" :class="[' text-danger']">{{ allerrors.first_name[0].message }}</small>
                                                <small v-if="allerrors.last_name" :class="[' text-danger']">{{ allerrors.last_name[0].message }}</small>
                                            </p> 
                                                <br>
                                            <p><input :class="allerrors.email ? 'border-danger':''" type="text" v-model="form.email" placeholder="Your Email"></p>
                                            <small v-if="allerrors.email" :class="[' text-danger']">{{ allerrors.email[0].message }}</small>
                                            <br>
                                            <p>
                                                <ValidationProvider rules="required|max:200" v-slot="{ errors }" name="bio">
                                                    <textarea maxlength="200" :class="[allerrors.bio ? 'border-danger':'',errors.length > 0 ? 'text-danger' : '']" v-model="form.bio" cols="40" rows="" placeholder="Short Bio"></textarea>
                                                    <small class="text-danger">{{ errors[0] }}</small>
                                                    <small :class="['float-right', errors.length > 0 ? 'text-danger' : '' ]">{{form.bio.length}}/200</small>
                                                </ValidationProvider>
                                                </p>
                                            <small v-if="allerrors.bio" :class="[' text-danger']">{{ allerrors.bio[0].message }}</small>
                                            <p><input type="submit" :value="button.save"></p>
                                        </div>
                                    </form>
                                </div>
                                </div>
                            </div> 
                        </div>
                        <div class="col-md-4 col-xs-8 offset-xs-2">
                            <div class="author-img">
                                <img alt="author avatar" :src="currentUser.user_avatar" class="avatar">
                                <edit-avatar></edit-avatar>
                            </div>
                        </div> 
                
                    </div> <!--col-md-8-->
                    
                </div>
            </div> <!--content-widget-->
        </div>
    </div>
</template>
<script>
import EditAvatar from '@/components/account/EditAvatar'
export default {
    components: {
        EditAvatar
    },
    mounted(){
        var currentUser = this.$store.state.currentUser
        this.form.first_name = currentUser.first_name
        this.form.last_name = currentUser.last_name
        this.form.email = currentUser.email
        this.form.bio = currentUser.bio
    },
    data(){
        return {
            form: {
                first_name : '',
                last_name : '',
                email : '',
                bio : ''
            },
            button: {
                save: 'Save'
            },
            allerrors: [],
        }
    },
    computed: {
        currentUser(){
            return this.$store.state.currentUser
        }
    },
    methods: {
        updateDetails(){
            this.button.save = "Saving ..."
            axios.post('/users/profile/update', this.$data.form)
            .then(response => {
                this.$store.commit("UPDATE_AVATAR", response.data.user);
                this.button.avatar = 'Change avatar'
                this.$bvToast.toast('Profile update success', {
                    title: 'Profile Update',
                    variant: 'success'
                })
                this.button.save = 'Save'
                return;
            })
            .catch((error) => {
                this.allerrors = error.response.data.detail;
                // console.log(this.allerrors)
                this.button.save = 'Save'
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

