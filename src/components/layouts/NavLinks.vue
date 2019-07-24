<template>
    <ul>
        <li class="current-menu-item"><router-link to="/">Home</router-link></li>
        <li class="menu-item-has-children"><a href="#">Categories</a>
            <ul class="sub-menu">
                <li><a href="#">Politics</a></li>
                <li><a href="#">Health</a></li>
                <li><a href="#">Design</a></li>
            </ul>
        </li>
        <li><a href="#">Typography</a></li>
        <li><a href="#">Politics</a></li>
        <li><a href="#">Health</a></li>
        <li><a href="#">Design</a></li>
        <li><a href="#">Startups</a></li>
        <li><router-link to="/about">About</router-link></li>                                
        <li><router-link to="/contact">Contact</router-link></li>                      
    </ul>
</template>
<style scoped>
    .menu-primary li{
        margin-right: 20PX;
    }
</style>
