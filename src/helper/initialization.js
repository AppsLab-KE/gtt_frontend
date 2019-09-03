
export function initialize(store, router) {

    // before a request is made start the nprogress
    axios.interceptors.request.use(config => {
        if (store.getters.isAuthenticated) {
            config.headers['Authorization'] = `Bearer ${store.state.token}`
        }
        // console.log('Starting Request', config)
        return config
    })

// before a response is returned stop nprogress
    axios.interceptors.response.use(response => {
        return response
    });

    axios.interceptors.response.use(null,(error) => {
        if (error.response.status == 401){
            store.commit('AUTH_LOGOUT');
        //    router.push('/');
        }
        return Promise.reject(error);
    });

    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

}

// export function setAuthorization(token) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
// }

// const token = localStorage.getItem('c9edd058')
// if (token) {
//   axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
// }