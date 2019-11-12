<template>
    <div class="border p-5 bg-lightblue mb-5">
        <div class="row justify-content-between">
            <div class="col-md-5 mb-2 mb-md-0">
                <h5 class="font-weight-bold secondfont mb-3 mt-0">Subscribe to Emails</h5>
                <p class="small-text">Get the latest news right in your inbox. We never spam!</p>
            </div>
            <div class="col-md-7">
                <form method='post' @submit.prevent='subscribe'>
                    <div class="row">
                        <div class="col-md-12">
                            <ValidationProvider  ref="myinput" rules="required|email" v-slot="{ errors }" name="email">
                                <input type="text" class="form-control" v-model='form.email' placeholder="Enter your e-mail address">
                                    <small class="text-danger">{{ errors[0] }}</small>
                            </ValidationProvider>
                        </div>
                        <div class="col-md-12 mt-2">
                            <button type="submit" class="btn btn-success btn-block">
                                <span>Subscribe</span>
                                <ClipLoader v-if="!button" :color="spinner.color" :size="spinner.size"/>
                            </button>
                        </div>
                        <small v-if="failed != ''" class='text-danger'>{{failed}}</small>
                        <small v-if="message != ''" class='text-success'>{{message}}</small>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
export default {
    components: {
        'ClipLoader': ClipLoader
    },
    data() {
        return {
            form : {
                email : ''
            },
            button : true,
            spinner: {
               size: '18px',
               color: '#2ec9d7'
            },
            failed : '',
            message : '',
        }
    },
    methods: {
        async subscribe(){
            const isValid = await this.$refs.myinput.validate();
            if (!isValid){
                return ;
            }else{ 
                this.button = false;
                const email = this.$data.form.email;
                const list_id = process.env.VUE_APP_MAILCHIMP_LIST_ID;
                const key = process.env.VUE_APP_MAILCHIMP_API_KEY;

    // merge_vars[FNAME]=John&merge_vars[LNAME]=Doe&
                const url = "https://us18.api.mailchimp.com/2.0/lists/subscribe.json?apikey="+key+"&id="+list_id+"&email[email]="+email+"&double_optin=false&send_welcome=true";

                const headers = {
                    'Access-Control-Allow-Origin' : process.env.VUE_APP_APP_URL,
                    'Access-Control-Allow-Methods' : 'POST'
                };

                this.axios.post(url, null, {headers}).then((response) => {
                    this.message = 'Subscribed. Thank you'
                    this.failed = ''
                    // console.log(response)
                    this.button = true
                    // this.$data.form.email = null
                    return
                }).catch(error => {
                    this.button = true
                    if (error.response) {
                        // if(error.response.status == 500 ){
                        //     this.failed = "Subscription failed"
                        //     this.message = ''
                        // }
                        this.failed = ""
                        this.message = 'User subscribed successfully'
                        /*

                        * The request was made and the server responded with a
                        * status code that falls out of the range of 2xx
                        */
                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                    } else if (error.request) {
                        /*
                        * The request was made but no response was received, `error.request`
                        * is an instance of XMLHttpRequest in the browser and an instance
                        * of http.ClientRequest in Node.js
                        */
                        // console.log("req "+error.request);
                        this.failed = ""
                        this.message = 'User Already subscribed'
                    } else {
                        this.failed = "Error Occured"
                        this.message = ''
                        // Something happened in setting up the request and triggered an Error
                        // console.log('Error', error.message);
                    }
                    // console.log(error.config);
                });
            }
        }
    }
}
</script>

