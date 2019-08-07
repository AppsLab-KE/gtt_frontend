<template>
    <div>
        <div class="content-widget">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-2 row">                               
                        <div class="box box-author m_b_2rem col-md-8">
                            <div class="post-author row-flex">
                                
                                <div class="author-content">
                                <div class="top-author">
                                    <form method='post'>
                                        <div class="form-contact">
                                            <p class="row">
                                                <input type="text" class="col-md-6" v-model="form.first_name" placeholder="First Name">
                                                <input type="text" class="col-md-6" v-model="form.last_name" placeholder="Last Name">
                                            </p> 
                                                <br>
                                            <p><input type="text" v-model="form.username" placeholder="Your Username"></p>
                                            <br>
                                            <p><textarea v-model="form.bio" cols="40" rows="" placeholder="Short Bio"></textarea></p>
                                            <p><input type="submit" :value="button.save"></p>
                                        </div>
                                    </form>
                                </div>
                                </div>
                            </div> 
                        </div>
                        <div class="col-md-4">
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
        this.form.username = currentUser.username
    },
    data(){
        return {
            form: {
                first_name : '',
                last_name : '',
                username : '',
                bio : ''
            },
            button: {
                save: 'Save'
            }
        }
    },
    computed: {
        currentUser(){
            return this.$store.state.currentUser
        }
    }
}
</script>

<style scoped>

</style>

