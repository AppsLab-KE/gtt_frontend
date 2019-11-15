
export function messaging (firebase){
    // let messo = null
    if(firebase.messaging.isSupported()){
        console.log('Messaging Supported');
        const messaging = firebase.messaging();
  
        messaging.usePublicVapidKey(process.env.VUE_APP_FIREBASE_PUBLIC_KEY); // 1. Generate a new key pair

        if (Notification.permission === "granted") {
            /* do our magic */
            console.log('allowed')
            messaging.getToken().then((token) => {
                //   console.log(token)
                sendTokenToServer(token);
            })
        } else if (Notification.permission === "blocked" || Notification.permission === "denied") {
            /* the user has previously denied push. Can't reprompt. */
            console.log('denied')
        }else if(Notification.permission === 'default') {
            console.log('default')
            // Request Permission of Notifications
            //? add window overay
            const el = document.getElementsByClassName('sidenav-overlay')[0];
            // console.log(el)
            const body = document.body;
            if (el){
                el.setAttribute("style", "display: block; opacity: 9; ");
                body.setAttribute("style", "overflow: hidden; ")
            }
            messaging.requestPermission().then(() => {
                console.log('Notification permission granted.');
                // console.log(process.env.VUE_APP_MESSAGING_TOPIC)
                // ? remove the window overlay
                if (el){
                    el.setAttribute("style", "display: none; opacity: 0; ");
                    body.style.removeProperty("overflow");
                }
                // Get Token
                messaging.getToken().then((token) => {
                    //   console.log(token)
                    sendTokenToServer(token);
                })
            }).catch((err) => {
                // ? remove window overlay
                if (el){
                    el.setAttribute("style", "display: none; opacity: 0; ");
                    body.style.removeProperty("overflow");
                }
                console.log('Unable to get permission to notify.', err);
            });
        }

        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(function() {
            messaging.getToken()
            .then(function(refreshedToken) {
            console.log('Token refreshed.');
            // Indicate that the new Instance ID token has not yet been sent 
            // to the app server.
            setTokenSentToServer(false);
            // Send Instance ID token to app server.
            sendTokenToServer(refreshedToken);
            })
            .catch(function(err) {
            console.log('Unable to retrieve refreshed token ', err);
            setTokenSentToServer(false);
            });
        });
        
        // Send the Instance ID token your application server, so that it can:
        // - send messages back to this app
        // - subscribe/unsubscribe the token from topics
        // eslint-disable-next-line no-inner-declarations
        function sendTokenToServer(currentToken) {
            if (!isTokenSentToServer()) {
            console.log('Sending token to server...');
            // TODO(developer): Send the current token to your server.
            setTokenToTopic(currentToken)
            setTokenSentToServer(true);
            } else {
            console.log('Token already sent to server so won\'t send it again ' +
                'unless it changes');
            }
        }
        
        // eslint-disable-next-line no-inner-declarations
        function isTokenSentToServer() {
            return window.localStorage.getItem('sentToServer_GTT') === '1';
        }
        
        // eslint-disable-next-line no-inner-declarations
        function setTokenSentToServer(sent) {
            window.localStorage.setItem('sentToServer_GTT', sent ? '1' : '0');
        }


        // eslint-disable-next-line no-inner-declarations
        function setTokenToTopic(token)
        {
            //   console.log(process.env.VUE_APP_SERVER_KEY)
            const headers = {
                'Authorization': 'key='+process.env.VUE_APP_SERVER_KEY,
                'Content-Type' : 'application/json'
            };
            let topic = process.env.VUE_APP_MESSAGING_TOPIC
            // eslint-disable-next-line no-undef
            axios.post('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic,null,{headers})
            // eslint-disable-next-line no-unused-vars
            .then(_response => {
                //   console.log('Subscribed to "'+topic+'"');
                console.log('Subscribed.');
                //   console.log(response)
            }).catch((err) => {
                console.log('Unable to subscribe ', err);
                // console.log(err.response.data)
                });
        }
    }else {
        console.log('Not Supported')
    }
     
}