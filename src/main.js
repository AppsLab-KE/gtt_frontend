import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios';

import {initialize} from './helper/initialization'

import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: process.env.VUE_APP_API_BASE_URL, // Your API domain
//   tokenPath: 'p_token',
//   tokenName: 'token',
  providers: {
    github: {
      clientId: process.env.VUE_APP_GITHUB_CLIENT_ID,
      redirectUri: process.env.VUE_APP_APP_URL + '/oauth/complete/github/' // Your client app URL
    },
    bitbucket: {
        clientId: process.env.VUE_APP_BITBUCKET_CLIENT_ID,
        redirectUri: process.env.VUE_APP_APP_URL + '/oauth/complete/bitbuket/' // Your client app URL
    },
    google: {
        clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        redirectUri: process.env.VUE_APP_APP_URL + '/oauth/complete/google/' // Your client app URL
    }
  }
})
//Use the window object to make it available globally.
window.axios = axios;
initialize(store, router)

import VueAnalytics from 'vue-analytics'

const isProd = process.env.NODE_ENV === 'production'

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GOOGLE_ANALYTICS_TRACKING_ID,
  checkDuplicatedScript: true,
  router,
  autoTracking: {
    screenview: true,
    exception: true,
    exceptionLogs: false
  },
  debug: {
    enabled: !isProd,
    trace: isProd,
    sendHitTask: isProd
  }
});

Vue.use(BootstrapVue)
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css'
Vue.use(VueCroppie);

import MediumEditor from 'vuejs-medium-editor'
Vue.component('medium-editor', MediumEditor)
import 'medium-editor/dist/css/medium-editor.css'
import 'vuejs-medium-editor/src/themes/default.css'

import { ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import en from 'vee-validate/dist/locale/en';
// loop over all rules
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: en.messages[rule] // add its message
  });
}
// Register it globally
Vue.component('ValidationProvider', ValidationProvider);

import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading, { /* options */ });

require('./../public/assets/css/prettify.css');
// require('./../public/assets/js/prettify');

import firebase from './services/Firebase';
import {messaging} from './services/Messaging';
messaging(firebase);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  lazyComponent: true
});

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
