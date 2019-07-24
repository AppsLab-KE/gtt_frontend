<template>
    <b-modal id="my-modal-login"
     centered hide-footer
     title="Login with"
     size='sm'
    :header-text-variant="'dark'">
    <div class="col-md-12 text-center">
        <a class="btn btn-block btn-social btn-bitbucket text-center">
            <span class="fa fa-bitbucket"></span> Bitbucket
        </a> or
        <a class="btn btn-block btn-social btn-github text-center">
            <span class="fa fa-github"></span> Github
        </a>
            or
        <a class="btn btn-block btn-social btn-gitlab text-center">
            <span class="fa fa-gitlab"></span> Gitlab
        </a>
    </div>

    
    </b-modal>
</template>
<style scoped>
.btn-social{
    color: #fff!important;
}
</style>
