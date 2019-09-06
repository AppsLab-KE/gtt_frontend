/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFoundComponent from './views/errors/404'
import store from './store'

Vue.use(Router)

const ifNotAuthenticated = (_to, _from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
        next('/')
}
    

const ifAuthenticated = (_to, _from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
        next('/')
}

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior: function(to, _from, _savedPosition) {
    if (to.hash) {
        return {selector: to.hash}
    } else {
        return { x: 0, y: 0 }
    }
},
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/single', name: 'single', component: () => import('./views/SingleBlog.vue') },
    { path: '/search', name: 'search', component: () => import('./views/Search.vue') },
    { path: '/category', name: 'category', component: () => import('./views/Category.vue') },
    { path: '/about', name: 'about', component: () => import('./views/About.vue') },
    { path: '/contact', name: 'contact', component: () => import('./views/Contact.vue') },
    { path: '/oauth/complete/:provider', component: { template: '<div class="auth-component"></div>'}},
    // ? Accounts
    { path: '/:username(@\\w+)', name: 'profile', beforeEnter: ifAuthenticated, component: () => import('./views/account/Profile.vue') },
    { path: '/profile/edit', name: 'profile-edit', beforeEnter: ifAuthenticated, component: () => import('./views/account/EditProfile.vue') },
    //author
    { path: '/publish', name: 'publish', beforeEnter: ifAuthenticated, component: () => import('./views/account/author/CreatePost.vue') },
    // ? last route
    {
        path: 'index.html', // or '*' this is for PWA
        beforeEnter: (_to, _from, next) => {
          next('/')
        }
    },
    { path: '/not-found', component: NotFoundComponent },
    { path: '*', component: NotFoundComponent },
  ]
})

router.beforeEach((_to, _from, next) => {
    next()
});

router.afterEach((_to, _from) => {
    const el = document.getElementsByClassName("mobi-menu")[0];
    const el1 = document.getElementsByClassName("menu-toggle-icon")[0];
    if(el){
        el.classList.remove('act');
    }
    if(el1){
        el1.classList.remove('act');
    }
});

export default router;
