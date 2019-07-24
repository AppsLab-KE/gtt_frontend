<template>
    <div class="sticky-header fixed d-lg-none d-md-block">
            <div class="text-right">
                <div class="container mobile-menu-fixed pr-5"> 
                    <h1 class="logo-small navbar-brand"><a href="index.html" class="logo">Merinda</a></h1>
                    
                    <a class="author-avatar" href="index.html#"><img src="assets/images/author-avata-1.jpg" alt=""></a>

                    <ul class="social-network heading navbar-nav d-lg-flex align-items-center">                       
                        <li><a href="index.html#"><i class="icon-facebook"></i></a></li>
                    </ul>

                    <a href="javascript:void(0)" class="menu-toggle-icon">
                        <span class="lines"></span>
                    </a>
                </div> 
            </div>         

            <div class="mobi-menu">
                <div class="mobi-menu__logo">
                    <h1 class="logo navbar-brand"><a href="index.html" class="logo">Merinda</a></h1>
                </div>
                <form action="index.html#" method="get" class="menu-search-form d-lg-flex">                        
                    <input type="text" class="search_field" placeholder="Search..." value="" name="s">                    
                </form>
                <nav>
                    <ul>
                        <li class="current-menu-item"><a href="index.html">Home</a></li>
                        <li class="menu-item-has-children"><a href="categories.html">Categories</a>
                            <ul class="sub-menu">
                                <li><a href="categories.html">Politics</a></li>
                                <li><a href="categories.html">Health</a></li>
                                <li><a href="categories.html">Design</a></li>
                            </ul>
                        </li>
                        <li><a href="typography.html">Typography</a></li>
                        <li><a href="categories.html">Politics</a></li>
                        <li><a href="categories.html">Health</a></li>                             
                        <li><a href="contact.html">Contact</a></li>                           
                    </ul>
                </nav>                
            </div>
        </div>
</template>
