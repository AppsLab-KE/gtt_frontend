import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('c9edd058') || '',
    currentUser: JSON.parse(localStorage.getItem('user')) || '',
    status: '',
    isTyping: false,
    savedDraft: JSON.parse(localStorage.getItem('userDraft')) || '',
    allPosts: [],
    latestPost: [],
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    AUTH_REQUEST: (state) => {
        state.status = 'loading'
      },
      AUTH_SUCCESS: (state, token) => {
        state.status = 'success'
        state.token = token
        state.currentUser = JSON.parse(localStorage.getItem('user'))
      },
      AUTH_LOGOUT: (state) => {
        state.status = ''
        state.token = ''
        state.currentUser = ''
      },
      AUTH_ERROR: (state) => {
        state.status = 'error'
      },
      UPDATE_AVATAR: (state, user) => {
        localStorage.setItem('user', JSON.stringify(user));
        state.currentUser = JSON.parse(localStorage.getItem('user'));
      }, 
      IS_TYPING: (state) => {
          state.isTyping = true;
      },
      NOT_TYPING: (state) => {
        state.isTyping = false;
     },
      SAVING_DRAFT: (state, payload) => {
        localStorage.setItem('userDraft', JSON.stringify(payload))
          state.savedDraft = payload
      },
      ALL_POSTS: (state, payload) => {
          state.allPosts = payload
      },
      LATEST_POST: (state, payload) => {
          state.latestPost = payload
      },
      UPDATE_POSTS: (state, payload) => {
        var existing = state.allPosts;
        payload.results.forEach( data => existing.results.push(data))
        existing.next = payload.next
        existing.previous = payload.previous
        existing.count = payload.count
        state.allPosts = existing
        // console.log(existing)
      },
  },
  actions: {
    AUTH_REQUEST: ({commit}, payload) => {
        return new Promise((resolve) => { // The Promise used for router redirect in login
            commit('AUTH_REQUEST')
            var token = payload.access_token
            localStorage.setItem('c9edd058', token) // store the token in localstorage
            localStorage.setItem('user', JSON.stringify(payload.user));
            // axios.defaults.headers.common['Authorization'] = 'Bearer' + token
            commit('AUTH_SUCCESS', token)
            resolve()
        })
      },
      AUTH_LOGOUT: ({commit}) => {
        return new Promise((resolve) => {
            commit('AUTH_LOGOUT')
            localStore();
            localStorage.removeItem('user')
            // remove the axios default header
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
    
  }
})

export default store
function localStore() {
    localStorage.removeItem('c9edd058');
}

