<template>
    <footer class="mt-5">
        <div class="container">
            <div class="divider"></div>
            <div class="row">
                <div class="col-md-6 copyright text-xs-center">            
                    <p>© {{year}} {{appName}} with ❤ from <a href="https://appslab.co.ke">Apps:Lab KE</a></p>
                </div>
                <div class="col-md-6">           
                    <ul class="social-network inline text-md-right text-sm-center">
                        <!-- <li class="list-inline-item"><a target="_blank" href="#"><i class="icon-facebook"></i></a></li> -->
                        <li class="list-inline-item"><a target="_blank" href="https://twitter.com/AppsLab_KE"><i class="icon-twitter"></i></a></li>
                        <li class="list-inline-item"><a target="_blank" href="https://github.com/GeeksTalk"><i class="fa fa-github"></i></a></li>
                        <li class="list-inline-item"><a target="_blank" href="https://join.slack.com/t/geekstalkthursday/shared_invite/enQtNDA1ODgxNTI0MTk5LWJmODg1MDczODVjNDQ0Y2JiM2I1N2RhY2QwMjFmN2E4MmIwYTI0MTFmN2ExMDczMjFjYWIyNGNkOWJmYWNjYmE"><i class="fa fa-slack"></i></a></li>
                    </ul>
                </div>
            </div>    
        </div>
    </footer>
</template>
<script>
import moment from 'moment';
export default {
    computed: {
        appName(){
            return process.env.VUE_APP_NAME
        },
        year(){
            return moment().format('YYYY');
        }
    }
}
</script>

