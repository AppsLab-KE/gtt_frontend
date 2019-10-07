/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

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
        if (error.response) {
        /*
        * The request was made and the server responded with a
        * status code that falls out of the range of 2xx
        */
            if (error.response.status == 401){
                store.dispatch('AUTH_LOGOUT');
                router.push({name: 'home'});
            }
            if (error.response.status == 500 || error.response.status == 502){
                router.push({name: 'server-error'});
            }
        } else if (error.request) {
            /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */
            // console.log(error.request);
            router.push({name: 'no-internet'});
        } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
            // router.push({name: 'no-internet'});
        }
        // console.log(error);
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