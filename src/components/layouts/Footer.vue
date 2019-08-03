<template>
    <footer class="mt-5">
        <div class="container">
            <div class="divider"></div>
            <div class="row">
                <div class="col-md-6 copyright text-xs-center">            
                    <p>© 2019 {{appName}} with ❤ from <a href="https://appslab.co.ke">Apps:Lab KE</a></p>
                </div>
                <div class="col-md-6">           
                    <ul class="social-network inline text-md-right text-sm-center">
                        <li class="list-inline-item"><a href="#"><i class="icon-facebook"></i></a></li>
                        <li class="list-inline-item"><a href="#"><i class="icon-twitter"></i></a></li>
                        <li class="list-inline-item"><a href="#"><i class="icon-behance"></i></a></li>
                    </ul>
                </div>
            </div>    
        </div>
    </footer>
</template>
<script>
export default {
    computed: {
        appName(){
            return process.env.VUE_APP_NAME
        }
    }
}
</script>
