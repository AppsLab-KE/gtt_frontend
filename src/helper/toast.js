import Vue from 'vue'
import { ToastPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(ToastPlugin)
let toast = {
    success(msg = 'Message', title='Success',position='b-toaster-top-right', append = false){
        return this.$bvToast.toast( msg, {
            title: title,
            toaster: position,
            variant: 'success',
            solid: true,
            appendToast: append
          })
    },
    default(msg = 'Message', title='Default',position='b-toaster-top-right', append = false){
        return this.$bvToast.toast( msg, {
            title: title,
            toaster: position,
            variant: 'default',
            solid: true,
            appendToast: append
          })
    },
    primary(msg = 'Message', title='Primary',position='b-toaster-top-right', append = false){
        return this.$bvToast.toast( msg, {
            title: title,
            toaster: position,
            variant: 'primary',
            solid: true,
            appendToast: append
          })
    },
    secondary(msg = 'Message', title='Secondary',position='b-toaster-top-right', append = false){
        return this.$bvToast.toast( msg, {
            title: title,
            toaster: position,
            variant: 'secondary',
            solid: true,
            appendToast: append
          })
    },
    danger(msg = 'Message', title='Danger',position='b-toaster-top-right', append = false){
        return this.$bvToast.toast( msg, {
            title: title,
            toaster: position,
            variant: 'danger',
            solid: true,
            appendToast: append
          })
    },
    warning(msg = 'Message', title='Warning',position='b-toaster-top-right', append = false){
        return this.$bvToast.toast( msg, {
            title: title,
            toaster: position,
            variant: 'warning',
            solid: true,
            appendToast: append
          })
    },
    info(msg = 'Message', title='Info',position='b-toaster-top-right', append = false){
        return this.$bvToast.toast( msg, {
            title: title,
            toaster: position,
            variant: 'info',
            solid: true,
            appendToast: append
          })
    }
}

export default toast