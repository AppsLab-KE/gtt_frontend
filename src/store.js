import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('c9edd058cd9ff48580f7f7723fbc37a542bf35b8') || '',
    currentUser: JSON.parse(localStorage.getItem('user')) || [],
    status: '',
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
      },
      AUTH_LOGOUT: (state, token) => {
        state.status = ''
        state.token = ''
        state.currentUser = []
      },
      AUTH_ERROR: (state) => {
        state.status = 'error'
      },
  },
  actions: {
    AUTH_REQUEST: ({commit, dispatch}, payload) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit('AUTH_REQUEST')
            var token = payload.access_token
            localStorage.setItem('c9edd058cd9ff48580f7f7723fbc37a542bf35b8', token) // store the token in localstorage
            localStorage.setItem('user', JSON.stringify(payload.user));
            axios.defaults.headers.common['Authorization'] = 'Bearer' + token
            commit('AUTH_SUCCESS', token)
            resolve()
        })
      },
      AUTH_LOGOUT: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit('AUTH_LOGOUT')
            localStorage.removeItem('c9edd058cd9ff48580f7f7723fbc37a542bf35b8')
            localStorage.removeItem('user')
            // remove the axios default header
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
    
  }
})

export default store
