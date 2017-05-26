<?php include "head.php"; ?>
<body>
	<?php include "header.php"; ?>
	<style type="text/css">
		@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');
@media(min-width:768px) {
    body {
        margin-top: 50px;
    }
    /*html, body, #wrapper, #page-wrapper {height: 100%; overflow: hidden;}*/
}

#wrapper {
    padding-left: 0;    
}

#page-wrapper {
    width: 100%;        
    padding: 0;
    background-color: #fff;
}

@media(min-width:768px) {
    #wrapper {
        padding-left: 225px;
    }

    #page-wrapper {
        padding: 22px 10px;
    }
}

/* Top Navigation */

.top-nav {
    padding: 0 15px;
}

.top-nav>li {
    display: inline-block;
    float: left;
}

.top-nav>li>a {
    padding-top: 20px;
    padding-bottom: 20px;
    line-height: 20px;
    color: #fff;
}

.top-nav>li>a:hover,
.top-nav>li>a:focus,
.top-nav>.open>a,
.top-nav>.open>a:hover,
.top-nav>.open>a:focus {
    color: #fff;
    background-color: #1a242f;
}

.top-nav>.open>.dropdown-menu {
    float: left;
    position: absolute;
    margin-top: 0;
    /*border: 1px solid rgba(0,0,0,.15);*/
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background-color: #fff;
    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
}

.top-nav>.open>.dropdown-menu>li>a {
    white-space: normal;
}

/* Side Navigation */

@media(min-width:768px) {
    .side-nav {
        position: fixed;
        top: 60px;
        left: 225px;
        width: 225px;
        margin-left: -225px;
        border: none;
        border-radius: 0;
        border-top: 1px rgba(0,0,0,.5) solid;
        overflow-y: auto;
        background-color: #222;
        /*background-color: #5A6B7D;*/
        bottom: 0;
        overflow-x: hidden;
        padding-bottom: 40px;
    }

    .side-nav>li>a {
        width: 225px;
        border-bottom: 1px rgba(0,0,0,.3) solid;
    }

    .side-nav li a:hover,
    .side-nav li a:focus {
        outline: none;
        background-color: #1a242f !important;
    }
}

.side-nav>li>ul {
    padding: 0;
    border-bottom: 1px rgba(0,0,0,.3) solid;
}

.side-nav>li>ul>li>a {
    display: block;
    padding: 10px 15px 10px 38px;
    text-decoration: none;
    /*color: #999;*/
    color: #fff;    
}

.side-nav>li>ul>li>a:hover {
    color: #fff;
}

.navbar .nav > li > a > .label {
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  position: absolute;
  top: 14px;
  right: 6px;
  font-size: 10px;
  font-weight: normal;
  min-width: 15px;
  min-height: 15px;
  line-height: 1.0em;
  text-align: center;
  padding: 2px;
}

.navbar .nav > li > a:hover > .label {
  top: 10px;
}

.navbar-brand {
    padding: 5px 15px;
}
.panel.with-nav-tabs .panel-heading{
    padding: 5px 5px 0 5px;
}
.panel.with-nav-tabs .nav-tabs{
	border-bottom: none;
}
.panel.with-nav-tabs .nav-justified{
	margin-bottom: -1px;
}
/********************************************************************/
/*** PANEL DEFAULT ***/
.with-nav-tabs.panel-default .nav-tabs > li > a,
.with-nav-tabs.panel-default .nav-tabs > li > a:hover,
.with-nav-tabs.panel-default .nav-tabs > li > a:focus {
    color: #777;
}
.with-nav-tabs.panel-default .nav-tabs > .open > a,
.with-nav-tabs.panel-default .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-default .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-default .nav-tabs > li > a:hover,
.with-nav-tabs.panel-default .nav-tabs > li > a:focus {
    color: #777;
	background-color: #ddd;
	border-color: transparent;
}
.with-nav-tabs.panel-default .nav-tabs > li.active > a,
.with-nav-tabs.panel-default .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-default .nav-tabs > li.active > a:focus {
	color: #555;
	background-color: #fff;
	border-color: #ddd;
	border-bottom-color: transparent;
}
.with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu {
    background-color: #f5f5f5;
    border-color: #ddd;
}
.with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > li > a {
    color: #777;   
}
.with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
.with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > li > a:focus {
    background-color: #ddd;
}
.with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > .active > a,
.with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > .active > a:hover,
.with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > .active > a:focus {
    color: #fff;
    background-color: #555;
}
/********************************************************************/
/*** PANEL PRIMARY ***/
.with-nav-tabs.panel-primary .nav-tabs > li > a,
.with-nav-tabs.panel-primary .nav-tabs > li > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li > a:focus {
    color: #fff;
}
.with-nav-tabs.panel-primary .nav-tabs > .open > a,
.with-nav-tabs.panel-primary .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-primary .nav-tabs > li > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li > a:focus {
	color: #fff;
	background-color: #3071a9;
	border-color: transparent;
}
.with-nav-tabs.panel-primary .nav-tabs > li.active > a,
.with-nav-tabs.panel-primary .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li.active > a:focus {
	color: #428bca;
	background-color: #fff;
	border-color: #428bca;
	border-bottom-color: transparent;
}
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu {
    background-color: #428bca;
    border-color: #3071a9;
}
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a {
    color: #fff;   
}
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a:focus {
    background-color: #3071a9;
}
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a,
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > .active > a:focus {
    background-color: #4a9fe9;
}
/********************************************************************/
/*** PANEL SUCCESS ***/
.with-nav-tabs.panel-success .nav-tabs > li > a,
.with-nav-tabs.panel-success .nav-tabs > li > a:hover,
.with-nav-tabs.panel-success .nav-tabs > li > a:focus {
	color: #3c763d;
}
.with-nav-tabs.panel-success .nav-tabs > .open > a,
.with-nav-tabs.panel-success .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-success .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-success .nav-tabs > li > a:hover,
.with-nav-tabs.panel-success .nav-tabs > li > a:focus {
	color: #3c763d;
	background-color: #d6e9c6;
	border-color: transparent;
}
.with-nav-tabs.panel-success .nav-tabs > li.active > a,
.with-nav-tabs.panel-success .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-success .nav-tabs > li.active > a:focus {
	color: #3c763d;
	background-color: #fff;
	border-color: #d6e9c6;
	border-bottom-color: transparent;
}
.with-nav-tabs.panel-success .nav-tabs > li.dropdown .dropdown-menu {
    background-color: #dff0d8;
    border-color: #d6e9c6;
}
.with-nav-tabs.panel-success .nav-tabs > li.dropdown .dropdown-menu > li > a {
    color: #3c763d;   
}
.with-nav-tabs.panel-success .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
.with-nav-tabs.panel-success .nav-tabs > li.dropdown .dropdown-menu > li > a:focus {
    background-color: #d6e9c6;
}
.with-nav-tabs.panel-success .nav-tabs > li.dropdown .dropdown-menu > .active > a,
.with-nav-tabs.panel-success .nav-tabs > li.dropdown .dropdown-menu > .active > a:hover,
.with-nav-tabs.panel-success .nav-tabs > li.dropdown .dropdown-menu > .active > a:focus {
    color: #fff;
    background-color: #3c763d;
}
/********************************************************************/
/*** PANEL INFO ***/
.with-nav-tabs.panel-info .nav-tabs > li > a,
.with-nav-tabs.panel-info .nav-tabs > li > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li > a:focus {
	color: #31708f;
}
.with-nav-tabs.panel-info .nav-tabs > .open > a,
.with-nav-tabs.panel-info .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-info .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-info .nav-tabs > li > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li > a:focus {
	color: #31708f;
	background-color: #bce8f1;
	border-color: transparent;
}
.with-nav-tabs.panel-info .nav-tabs > li.active > a,
.with-nav-tabs.panel-info .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li.active > a:focus {
	color: #31708f;
	background-color: #fff;
	border-color: #bce8f1;
	border-bottom-color: transparent;
}
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu {
    background-color: #d9edf7;
    border-color: #bce8f1;
}
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > li > a {
    color: #31708f;   
}
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > li > a:focus {
    background-color: #bce8f1;
}
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > .active > a,
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > .active > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > .active > a:focus {
    color: #fff;
    background-color: #31708f;
}
/********************************************************************/
/*** PANEL WARNING ***/
.with-nav-tabs.panel-warning .nav-tabs > li > a,
.with-nav-tabs.panel-warning .nav-tabs > li > a:hover,
.with-nav-tabs.panel-warning .nav-tabs > li > a:focus {
	color: #8a6d3b;
}
.with-nav-tabs.panel-warning .nav-tabs > .open > a,
.with-nav-tabs.panel-warning .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-warning .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-warning .nav-tabs > li > a:hover,
.with-nav-tabs.panel-warning .nav-tabs > li > a:focus {
	color: #8a6d3b;
	background-color: #faebcc;
	border-color: transparent;
}
.with-nav-tabs.panel-warning .nav-tabs > li.active > a,
.with-nav-tabs.panel-warning .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-warning .nav-tabs > li.active > a:focus {
	color: #8a6d3b;
	background-color: #fff;
	border-color: #faebcc;
	border-bottom-color: transparent;
}
.with-nav-tabs.panel-warning .nav-tabs > li.dropdown .dropdown-menu {
    background-color: #fcf8e3;
    border-color: #faebcc;
}
.with-nav-tabs.panel-warning .nav-tabs > li.dropdown .dropdown-menu > li > a {
    color: #8a6d3b; 
}
.with-nav-tabs.panel-warning .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
.with-nav-tabs.panel-warning .nav-tabs > li.dropdown .dropdown-menu > li > a:focus {
    background-color: #faebcc;
}
.with-nav-tabs.panel-warning .nav-tabs > li.dropdown .dropdown-menu > .active > a,
.with-nav-tabs.panel-warning .nav-tabs > li.dropdown .dropdown-menu > .active > a:hover,
.with-nav-tabs.panel-warning .nav-tabs > li.dropdown .dropdown-menu > .active > a:focus {
    color: #fff;
    background-color: #8a6d3b;
}
/********************************************************************/
/*** PANEL DANGER ***/
.with-nav-tabs.panel-danger .nav-tabs > li > a,
.with-nav-tabs.panel-danger .nav-tabs > li > a:hover,
.with-nav-tabs.panel-danger .nav-tabs > li > a:focus {
	color: #a94442;
}
.with-nav-tabs.panel-danger .nav-tabs > .open > a,
.with-nav-tabs.panel-danger .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-danger .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-danger .nav-tabs > li > a:hover,
.with-nav-tabs.panel-danger .nav-tabs > li > a:focus {
	color: #a94442;
	background-color: #ebccd1;
	border-color: transparent;
}
.with-nav-tabs.panel-danger .nav-tabs > li.active > a,
.with-nav-tabs.panel-danger .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-danger .nav-tabs > li.active > a:focus {
	color: #a94442;
	background-color: #fff;
	border-color: #ebccd1;
	border-bottom-color: transparent;
}
.with-nav-tabs.panel-danger .nav-tabs > li.dropdown .dropdown-menu {
    background-color: #f2dede; /* bg color */
    border-color: #ebccd1; /* border color */
}
.with-nav-tabs.panel-danger .nav-tabs > li.dropdown .dropdown-menu > li > a {
    color: #a94442; /* normal text color */  
}
.with-nav-tabs.panel-danger .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
.with-nav-tabs.panel-danger .nav-tabs > li.dropdown .dropdown-menu > li > a:focus {
    background-color: #ebccd1; /* hover bg color */
}
.with-nav-tabs.panel-danger .nav-tabs > li.dropdown .dropdown-menu > .active > a,
.with-nav-tabs.panel-danger .nav-tabs > li.dropdown .dropdown-menu > .active > a:hover,
.with-nav-tabs.panel-danger .nav-tabs > li.dropdown .dropdown-menu > .active > a:focus {
    color: #fff; /* active text color */
    background-color: #a94442; /* active bg color */
}

.img {
    width: 100%;
}

.media-object{
    width: 250px;
    margin: 1px 6px 1px 1px;
    float: left;
    display: block;
}

.p {
    font-family: 'Verdana','Geneva','sans-serif';
    text-align: justify;
    color: #333;
    display: block;
    -webkit-margin-before: 1em;
    -moz-margin-before: 1em;
    -webkit-margin-after: 1em;
    -moz-margin-after: 1em;
    -webkit-margin-start: 0px;
    -moz-margin-start: 0px;
    -webkit-margin-end: 0px;
    -moz-margin-end: 0px;
}


	</style>
	<script type="text/javascript">
		$(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $(".side-nav .collapse").on("hide.bs.collapse", function() {                   
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
    });
    $('.side-nav .collapse').on("show.bs.collapse", function() {                        
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");        
    });
})    
    
	</script>
	
<div id="noty-holder"></div>
<div id="wrapper">

     <!-- Navigation -->
    
        
        
      <div id="page-wrapper">  
    <div class="container-fluid">
        
      <!-- Page Heading -->
            <div class="row" id="main" >
                <div class="col-sm-12 col-md-12 well" id="content">
                    <h1>Welcome Word!</h1>
                </div>
                
            </div>
            <!-- /.row -->   
        
  <a href="#"> Gallery</a>      
        
	<div class="row">
   <div class="col-lg-12">	
            <div class="panel with-nav-tabs panel-primary">
                <div class="panel-heading">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#tab1primary" data-toggle="tab"><span class="glyphicon glyphicon-font"></span> Articole</a></li>
                            <li><a href="#tab2primary" data-toggle="tab"><span class="glyphicon glyphicon-heart-empty"></span> Galerie</a></li>
                            <li><a href="#tab3primary" data-toggle="tab">Primary 3</a></li>
                            <li class="dropdown">
                                <a href="#" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#tab4primary" data-toggle="tab">Primary 4</a></li>
                                    <li><a href="#tab5primary" data-toggle="tab">Primary 5</a></li>
                                </ul>
                            </li>
                        </ul>
                </div>
                <div class="panel-body">
                    <div class="tab-content">
                        <div class="tab-pane fade in active" id="tab1primary">
                          <div class="well">
      <div class="media">
      	<a class="pull-left" href="#">
    		<img class="media-object" src="http://i1.wp.com/www.moneybook.ro/wp-content/uploads/2016/02/polen-crud.jpg?resize=768%2C480">
  		</a>
  		<div class="media-body">
    		<h4 class="media-heading">APILARNILUL</h4>
          <p class="text">By Francisco</p>
          <p>Apilarnilul este un produs apicol natural, obținut din larvele de 
          trântor care constituie materia primă principală. Acestea la vârsta de
          7 zile sunt recoltate integral obținându-se astfel apilarnilul.În mod
          normal, sezonul apicol activ este în perioada mai-iulie. Asta într-o colonie
          de albine constituită ca o unitate biologică. Într-o astfel de colonie,
          numărul indivizilor masculi este de 400-1800 trântori rareori numărul lor
          depășind 2000. Într-o colonie de albine numărul de trântori pe care îi crește
          și îi tolerează este limitat și depinde de comportamentul coloniei ca un tot unitar.</p>
          <ul class="list-inline list-unstyled">
  			<li><span><i class="glyphicon glyphicon-calendar"></i> 1 days, 8 hours </span></li>
            <li>|</li>
            <span><i class="glyphicon glyphicon-comment"></i> 2 comments</span>
            <li>|</li>
            <li>
               <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star-empty"></span>
            </li>
            <li>|</li>
            <li>
            <!-- Use Font Awesome http://fortawesome.github.io/Font-Awesome/ -->
              <span><i class="fa fa-facebook-square"></i></span>
              <span><i class="fa fa-twitter-square"></i></span>
              <span><i class="fa fa-google-plus-square"></i></span>
            </li>
			</ul>
       </div>
    </div>
  </div>
                          <div class="well">
      <div class="media">
  		<a class="pull-left" href="#">
    		<img class="media-object" src="http://i0.wp.com/www.moneybook.ro/wp-content/uploads/2016/08/images_8.jpg?resize=299%2C224">
  		</a>
  		<div class="media-body">
    		<h4 class="media-heading">Ziua Femeii</h4>
          <p class="text-right">By Anailuj</p>
          <p>In fiecare an, pe 8 Martie, trebuie sa le spunem din toata inima La Multi Ani!
De cand se serbeaza Ziua Femeii?
Am putea spune ca Ziua femeii, Ziua mamei se serbeaza inca de pe vremea grecilor antici.
In fiecare primavara, ei o serbau pe Rhea, mama tuturor zeilor.
In cultura multor tari, 8 Martie s-a transformat dintr-o simpla zi a calendarului in sarbatoarea primaverii,
in ziua in care mamele, bunicile, sotiile, prietenele, surorile, fiicele, colegele,
primesc flori si mici daruri simbolice care subliniaza rolul lor acasa, in familie, in societate.
1907 – La Copenhaga a avut loc prima Conferinta a femeilor socialiste, la initiativa ziaristei germane Clara Zetkin,
care conducea din 1890 revista “Die Gleichheit” (Egalitatea).</p>
          <ul class="list-inline list-unstyled">
  			<li><span><i class="glyphicon glyphicon-calendar"></i> 2 days, 8 hours </span></li>
            <li>|</li>
            <span><i class="glyphicon glyphicon-comment"></i> 2 comments</span>
            <li>|</li>
            <li>
               <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star-empty"></span>
            </li>
            <li>|</li>
            <li>
            <!-- Use Font Awesome http://fortawesome.github.io/Font-Awesome/ -->
              <span><i class="fa fa-facebook-square"></i></span>
              <span><i class="fa fa-twitter-square"></i></span>
              <span><i class="fa fa-google-plus-square"></i></span>
            </li>
			</ul>
       </div>
    </div>
                        
                        
                        
                        
                        
                        </div>
                        </div>
                        <div class="tab-pane fade" id="tab2primary">
                          <div class="well">
      <div class="media">
      	<a class="pull-left" href="#">
    		<img class="media-object" src="http://www.moneybook.ro/moneybook-feed.png">
  		</a>
  		<div class="media-body">
    		<h4 class="media-heading">Galerie</h4>
          <p class="text">By Manager</p>
          <p><img width="300" height="300" src="http://i1.wp.com/www.moneybook.ro/wp-content/uploads/2016/08/maieu-ALB_1.jpg?resize=300%2C300"
          class="attachment-image" alt="image1" title="image"
          sizes="(max-width: 300px) 100vw, 300px">
          <img width="300" height="300" src="http://i1.wp.com/www.moneybook.ro/wp-content/uploads/2015/11/8Martie.png?resize=300%2C265"
          class="attachment-image" alt="image1" title="image"
          sizes="(max-width: 300px) 100vw, 300px">
          <img width="300" height="300" src="http://i0.wp.com/www.moneybook.ro/wp-content/uploads/2014/12/pisici.jpg?w=537"
          class="attachment-image" alt="image1" title="image"
          sizes="(max-width: 300px) 100vw, 300px">
          <img width="300" height="300" src="http://i0.wp.com/www.moneybook.ro/wp-content/uploads/2014/10/beagle1.jpg?w=448"
          class="attachment-image" alt="image1" title="image"
          sizes="(max-width: 300px) 100vw, 300px">
          </p>
          <ul class="list-inline list-unstyled">
  			<li><span><i class="glyphicon glyphicon-calendar"></i> 1 days, 8 hours </span></li>
            <li>|</li>
            <span><i class="glyphicon glyphicon-comment"></i> 2 comments</span>
            <li>|</li>
            <li>
               <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star-empty"></span>
            </li>
            <li>|</li>
            <li>
            <!-- Use Font Awesome http://fortawesome.github.io/Font-Awesome/ -->
              <span><i class="fa fa-facebook-square"></i></span>
              <span><i class="fa fa-twitter-square"></i></span>
              <span><i class="fa fa-google-plus-square"></i></span>
            </li>
			</ul>
       </div>
    </div>
  </div>
                          <div class="well">
      <div class="media">
  		<a class="pull-left" href="#">
    		<img class="media-object" src="http://www.moneybook.ro/moneybook-feed.png">
  		</a>
  		<div class="media-body">
    		<h4 class="media-heading">Galerie2</h4>
          <p class="text-right">By Manager</p>
          <p><img width="300" height="300" src="http://dev.webofiice.ro/anunt/oc-content/uploads/0/7_thumbnail.jpg"
          class="attachment-image" alt="image1" title="image"
          sizes="(max-width: 300px) 100vw, 300px">
          <img width="300" height="300" src="http://dev.webofiice.ro/anunt/oc-content/uploads/0/6_thumbnail.jpg"
          class="attachment-image" alt="image1" title="image"
          sizes="(max-width: 300px) 100vw, 300px">
          <img width="300" height="300" src="http://i0.wp.com/www.moneybook.ro/wp-content/uploads/2014/12/pisici.jpg?w=537"
          class="attachment-image" alt="image1" title="image"
          sizes="(max-width: 300px) 100vw, 300px">
          <img width="300" height="300" src="http://i0.wp.com/www.moneybook.ro/wp-content/uploads/2014/10/beagle1.jpg?w=448"
          class="attachment-image" alt="image1" title="image"
          sizes="(max-width: 300px) 100vw, 300px"></p>
          <ul class="list-inline list-unstyled">
  			<li><span><i class="glyphicon glyphicon-calendar"></i> 2 days, 8 hours </span></li>
            <li>|</li>
            <span><i class="glyphicon glyphicon-comment"></i> 2 comments</span>
            <li>|</li>
            <li>
               <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star-empty"></span>
            </li>
            <li>|</li>
            <li>
            <!-- Use Font Awesome http://fortawesome.github.io/Font-Awesome/ -->
              <span><i class="fa fa-facebook-square"></i></span>
              <span><i class="fa fa-twitter-square"></i></span>
              <span><i class="fa fa-google-plus-square"></i></span>
            </li>
			</ul>
       </div>
    </div>
                        
                        
                        
                        
                        
                        </div>
                        </div>
                        <div class="tab-pane fade" id="tab3primary">Primary 3</div>
                        <div class="tab-pane fade" id="tab4primary">Primary 4</div>
                        <div class="tab-pane fade" id="tab5primary">Primary 5</div>
                </div>
            </div>
        </div>
	</div>
</div>	
	
	
    <!-- /#wrapper -->

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>




 </div>
</div>	
    <!-- /#page-wrapper -->
</div><!-- /#wrapper -->	
	
	
	
	
	

</body>