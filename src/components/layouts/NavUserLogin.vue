<template>
    <span class="top-menu heading d-lg-flex align-items-center">
        <a v-b-modal.my-modal-login class="btn">Login</a>
        
        <b-dropdown variant="link" toggle-tag='link' toggle-class="text-decoration-none" class="drop-manu" no-caret>
            <template slot="button-content">
                <span class="author-avatar" to="#"><img src="/assets/images/author-avata-1.jpg" alt=""></span>
            </template>
            <b-dropdown-item href="#">An item</b-dropdown-item>
            <b-dropdown-item href="#">Another item</b-dropdown-item>
        </b-dropdown>
        <!-- The modal -->
    </span>
</template>
<style scoped>
    .drop-manu{
        margin-top: -8px!important;
    }
</style>
