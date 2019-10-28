<template>
    <div v-once></div>
</template>

<script>
    import { pleaseWait } from 'please-wait'
    import 'please-wait/build/please-wait.css'

    export default {
        props: ['isLoading'],
        watch: {
            isLoading: {
                handler(isLoading) {
                    if (isLoading) {
                        this.open()
                    } else {
                        this.close()
                    }
                },
                immediate: true,
            }
        },
        methods: {
            open() {
                if (!this.pleaseWaitInstance) {
                    this.pleaseWaitInstance = pleaseWait({
                        logo: 'https://geekstalkthursday.co.ke/assets/images/2logo.png',
                        backgroundColor: '#2A9999',
                        loadingHtml: '<p class="loading-message">GTT is getting ready... </p>'
                    })
                }
            },
            close() {
                if (this.pleaseWaitInstance != null) {
                    this.pleaseWaitInstance.finish()
                    this.pleaseWaitInstance = null
                }
            }
        }
    }
</script>

<style>
    .loading-message {
        color: white;
    }
</style>