<template>
    <ul>
        <li class="current-menu-item"><router-link to="/">Home</router-link></li>
        <li class="menu-item-has-children"><a>Categories</a>
            <ul class="sub-menu">
                <li><router-link to="/category">Laravel</router-link></li>
                <li><router-link to="/category">Vue</router-link></li>
                <li><router-link to="/category">Django</router-link></li>
            </ul>
        </li>
        <!-- <li><a href="#">Typography</a></li>
        <li><a href="#">Politics</a></li>
        <li><a href="#">Health</a></li>
        <li><a href="#">Design</a></li> -->
        <li><router-link to="/search">Search</router-link></li>
        <li><router-link to="/single">Single</router-link></li>
        <li><router-link to="/about">About</router-link></li>                                
        <li><router-link to="/contact">Contact</router-link></li>                      
    </ul>
</template>
<style scoped>
    .menu-primary li{
        margin-right: 20PX;
    }
</style>
