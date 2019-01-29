import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML =
    `<dom-module id="style">
        <template>
            <style>
                /*
Author: W3layout
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
*/
h4, h5, h6,
h1, h2, h3 {margin-top: 0; font-family: 'Lucida Grande', sans-serif;}
ul, ol {margin: 0;}
p {margin: 0; font-family: 'Lucida Grande', sans-serif;}
.btn-default, .btn-primary{
  font-family: 'Lucida Grande', sans-serif;
}

html, body{
  	font-family: 'Lucida Grande', sans-serif;
    font-size: 100%;
  	background:#000;
  	overflow-x: hidden;
}
body a{
	transition:0.5s all;
	-webkit-transition:0.5s all;
	-moz-transition:0.5s all;
	-o-transition:0.5s all;
	-ms-transition:0.5s all;
}

/*-- header --*/
.navbar .navbar-nav li a {
  padding: 0 10px;
  line-height: 56px;
  position: relative;
}
.nav>li>a:focus, .nav>li>a:hover {
  background-color:rgba(239, 85, 58, 0) !important;
}
.navbar .navbar-nav li a i {
  border: 1px solid #fff;
  padding: 8px 0;
  width: 32px;
  text-align: center;
  -webkit-border-radius: 50em;
  -moz-border-radius: 50em;
  border-radius: 50em;
  color: #fff;
  height: 32px;
}
.navbar .navbar-nav li .dropdown-menu {
  margin-top: 3px;
  border: none;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  border-radius: 0px;
  border: 1px solid #e1e6ef;
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.125);
  -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.125);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.125);
  padding: 0;
}
.navbar .navbar-nav li .dropdown-menu:before {
  position: absolute;
  top: -9.5px;
  right: 16px;
  display: inline-block;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #e1e6ef;
  border-left: 8px solid transparent;
  content: '';
}
.navbar .navbar-nav li .dropdown-menu li.dropdown-menu-header, .navbar .navbar-nav li .dropdown-menu li.dropdown-menu-footer {
  background:#f2f4f8;
}
.navbar .navbar-nav li.m_2 a {
  line-height:38px;
}
.navbar .navbar-nav li .dropdown-menu li a i {
  margin: 0 10px 0 -5px;
  border: none;
}
.dropdown-menu>li>a:focus, .dropdown-menu>li>a:hover {
  background-color: #f2f4f8 !important;
}
.navbar .navbar-nav li .dropdown-menu li a .label {
  position: absolute;
  right: 10px;
  top: 11px;
}
.label.label-info {
  background-color:#ef553a;
}
.label {
  padding: 4px 6px;
  border: none;
  text-shadow: none;
}
.warning_1, .warning_11{
	padding:10px 16px !important;
}
.warning_11, .warning_22, .warning_33, .warning_44{
	background-color: #337ab7 !important;
	border-color:#337ab7 !important;
}
.warning_11:hover, .warning_22:hover, .warning_33:hover, .warning_44:hover{
	background-color: #246AA6 !important;
	border-color:#246AA6 !important;
}
.warning_2, .warning_22{
	padding:6px 12px !important;
}
.warning_3, .warning_33{
	padding:5px 10px !important;
}
.warning_4, .warning_44{
	padding:1px 5px !important;
}	
.but_list, .tab-content{
	margin:1.5em 0 0 0;
}
.btn-group-lg>.btn, .btn-lg {
  border-radius:4px !important;
}
.navbar .navbar-nav li .dropdown-toggle.avatar img {
  height: 40px;
  -webkit-border-radius: 50em;
  -moz-border-radius: 50em;
  border-radius: 50em;
  border: 1px solid #c0cadd;
  margin-top: -4px;
}
.navbar .navbar-nav li .dropdown-menu li a i {
  margin: 0 10px 0 -5px;
  border: none;
  color:rgb(6, 217, 149);
}
.navbar .navbar-nav li .dropdown-menu li.dropdown-menu-header .progress, .navbar .navbar-nav li .dropdown-menu li.dropdown-menu-footer .progress {
  border: 1px solid #e1e6ef;
  background: white;
  box-shadow: none;
}
.progress.thin {
  height: 10px;
}
.progress {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  background: #f2f4f8;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.navbar .navbar-nav li .dropdown-menu li.avatar {
  min-width: 300px;
  height: 56px;
  padding: 0px 15px;
}
.navbar .navbar-nav li .dropdown-menu li {
  padding: 0;
  position: relative;
  min-width:100%;
  border-bottom: 1px solid #e1e6ef;
  line-height: 40px;
  padding: 0 15px;
  font-size: 14px;
  width:300px;
}
.navbar .navbar-nav li .dropdown-menu li.avatar a {
  line-height: 59px;
  height: 59px;
  padding: 9px 15px;
}
.navbar .navbar-nav li .dropdown-menu li a {
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  border-radius: 0px;
  line-height: 40px;
  height: 40px;
  margin: 0 -15px;
  padding: 0 15px;
}
.navbar .navbar-nav li .dropdown-menu li a img {
  height: 40px;
  -webkit-border-radius: 50em;
  -moz-border-radius: 50em;
  border-radius: 50em;
  border: 1px solid #e1e6ef;
  margin: 0px 10px 0 -5px;
  float: left;
}
.navbar .navbar-nav li .dropdown-menu li a div {
  font-size: 14px;
  line-height: 26px;
  font-weight: bold;
  color: #000;
}
.navbar .navbar-nav li .dropdown-menu li a small {
  display: block;
  line-height: 12px;
  font-size: 10px;
  margin-top: -3px;
  font-style: italic;
}
.small, small {
  color: #CFCFCF !important;
  font-weight: 300 !important;
}
.navbar .navbar-nav li .dropdown-menu li.avatar a .label {
  top: 20px;
}
.navbar .navbar-nav li a .badge {
  background: #ff5454;
  border: 2px solid white;
  position: absolute;
  top: 9px;
  right: 3px;
  font-size: 8px;
  line-height: 8px;
  padding: 4px 6px;
  -webkit-border-radius: 50em;
  -moz-border-radius: 50em;
  border-radius: 50em;
  min-width: 0;
}
.navbar-default.sidebar {
  background-color: #000;
  font-family: 'Lucida Grande', sans-serif;
}
nav.top1.navbar.navbar-default.navbar-static-top {
  background-color:rgb(6, 217, 149);
  font-family: 'Lucida Grande', sans-serif;
}
.navbar-default .navbar-brand {
  color: #fff !important;
  font-size: 30px;
  font-weight: 500;
}
.navbar-right {
  margin-right: 10px !important;
}
.navbar-right li{
	display:inline-block;
}
i.nav_icon {
  color: #fff;
  margin-right:6px;
}
.sidebar ul li a{
  color: #999;
  font-size:14px;
}
.form-control {
  background: none !important;
  border: 1px solid #fff !important;
  border-radius: 20px !important;
  box-shadow: none !important;
}
.navbar-form.navbar-right input[type="text"] {
  color: #fff;
}
form.navbar-form.navbar-right {
  margin:9px 0 0 0;
}
ul.nav.navbar-nav.navbar-right {
  height: 51px;
}
.sidebar-nav.navbar-collapse {
  margin: 2em 0 0 0;
}
.navbar-default .navbar-nav>.active>a, .navbar-default .navbar-nav>.active>a:focus, .navbar-default .navbar-nav>.active>a:hover {
  background-color:rgba(231, 231, 231, 0) !important;
}
.dropdown-menu {
  min-width: 202px !important;
}  
/* Active state */
.wrapper-dropdown-4.active i.dropdown-icon{
    background-position:-2px -2px;
}
.wrapper-dropdown-4.active .dropdown {
    max-height: 400px;
}
ul.dropdown {
	padding:0;
	margin:0;
	list-style:none;
}
.span_1{
  background: #fff;
  padding: 1em;
  margin: 0;
  position: fixed;
  height: 100%;
  overflow-y: auto;
  z-index: 100;
  top: 0;
}
.col-md-10.span_1_of_span_2 {
  padding:1em;
}
.col_1_of_2.span_1_of_2 {
  padding: 5px;
}
.col_1_of_2.span_1_of_2:hover .red{
	background:#E84F34;
}
.col_1_of_2.span_1_of_2:hover .blue1{
	background:#8D51A6;
}
.col_1_of_2.span_1_of_2:hover .fb2{
	background:#355290;
}
.col_1_of_2.span_1_of_2:hover .tw2{
	background:#03A5E2;
}
.span_4 {
  padding-right: 0;
}
.col_3 {
  margin-bottom:1em;
}
.col_3 h4{
  margin:0 0 2em;
  color: #fff;
  text-transform: uppercase;
  font-size: 0.85em;
}
.span_10{
  margin-bottom: 1em;
}
/**** icon dropdown ******/
.wrapper-dropdown-5 {
    /* Size & position */
    position: relative;
    margin: 0 auto;
    /* Styles */
    cursor: pointer;
    outline: none;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
}
.wrapper-dropdown-5 i.dropdown-icon{
  width: 15px;
  height: 12px;
  display: block;
  background: url(../images/up-down.png) no-repeat -3px -13px;
  float: left;
}
.wrapper-dropdown-5 .dropdown {
  position: absolute;
  top: 18px;
  right: -16px;
  width: 245px;
  background: #333;
  color: #fff;
  list-style: none;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  max-height: 0;
  overflow: hidden;
  z-index: 1;
}
.wrapper-dropdown-5 .dropdown li:first-child a{
	border-top:none;
}
.wrapper-dropdown-5 .dropdown li a {
    display: block;
    text-decoration: none;
    color:#fff;
    font-size:0.85em;
    border:none;
    padding:8px 15px;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    border-radius:0;
}
/* Hover state */
.wrapper-dropdown-5 .dropdown li:hover a {
    color: #FFF;
    background:#65cea7;
}
/* Active state */
.wrapper-dropdown-5.active i.dropdown-icon{
    background-position:-2px -2px;
}
.wrapper-dropdown-5.active .dropdown {
    max-height: 400px;
}
/**** icon dropdown ******/
.wrapper-dropdown-6, .wrapper-dropdown-7, .wrapper-dropdown-8, .wrapper-dropdown-9{
    /* Size & position */
    position: relative;
    margin: 0 auto;
    /* Styles */
    cursor: pointer;
    outline: none;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
}
.wrapper-dropdown-6 i.dropdown-icon, .wrapper-dropdown-7 i.dropdown-icon, .wrapper-dropdown-8 i.dropdown-icon, .wrapper-dropdown-9 i.dropdown-icon{
  width: 15px;
  height: 12px;
  display: block;
  background: url(../images/up-down.png) no-repeat -3px -13px;
  float: left;
}
.wrapper-dropdown-6 .dropdown, .wrapper-dropdown-7 .dropdown, .wrapper-dropdown-8 .dropdown, .wrapper-dropdown-9 .dropdown  {
  position: absolute;
  top: 20px;
  right: -16px;
  width: 245px;
  background: #333;
  color: #fff;
  list-style: none;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  max-height: 0;
  overflow: hidden;
  z-index: 1;
}
.wrapper-dropdown-6 .dropdown li:first-child a, .wrapper-dropdown-7 .dropdown li:first-child a, .wrapper-dropdown-8 .dropdown li:first-child a, .wrapper-dropdown-9 .dropdown li:first-child a{
	border-top:none;
}
.wrapper-dropdown-6 .dropdown li a, .wrapper-dropdown-7 .dropdown li a, .wrapper-dropdown-8 .dropdown li a, .wrapper-dropdown-9 .dropdown li a {
    display: block;
    text-decoration: none;
    color:#fff;
    font-size:0.85em;
    border:none;
    padding:8px 15px;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    border-radius:0;
}
/* Hover state */
.wrapper-dropdown-6 .dropdown li:hover a, .wrapper-dropdown-7 .dropdown li:hover a, .wrapper-dropdown-8 .dropdown li:hover a, .wrapper-dropdown-9 .dropdown li:hover a{
    color: #FFF;
    background:#65cea7;
}
/* Active state */
.wrapper-dropdown-6.active i.dropdown-icon, .wrapper-dropdown-7.active i.dropdown-icon, .wrapper-dropdown-8.active i.dropdown-icon, .wrapper-dropdown-9.active i.dropdown-icon{
    background-position:-2px -2px;
}
.wrapper-dropdown-6.active .dropdown, .wrapper-dropdown-7.active .dropdown, .wrapper-dropdown-8.active .dropdown, .wrapper-dropdown-9.active .dropdown {
    max-height: 400px;
}
section.accordation_menu {
  min-height: 800px;
}
.span_3{
  padding:0;
}
.col_1{
	margin:1em 0 0 0;
}
.one{
	width:150px;
}
.profile_img1 {
  float: left;
  margin-right: 10px;
  width: 83%;
  margin-bottom:2em;
}
.user-name1 {
  float:left;
}
.user-name1 p {
  font-size: 13px;
  color: #65cea7;
  line-height: 1em;
}
.tiles_info{
  color: #fff!important;
}
a.tiles_info:hover{
  text-decoration:none;
}
a.tiles_info, a.shortcut-tiles {
  background: 0 0;
}
.tiles-body{
	text-align:center;
}
.tiles_info, .shortcut-tiles {
  display: block;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
}
.red1{
  background: #ef553a;
}
.tiles_info .tiles-head {
  letter-spacing: normal;
  padding: 10px 10px;
  font-weight: 500;
  box-shadow: inset 0 -50px 0 0 rgba(255,255,255,.1);
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  text-transform: uppercase;
  text-align: center;
  font-size:0.85em;
}
.red{
  background: #ef553a;
}
.tiles_info .tiles-body-alt, .info-tiles .tiles-body {
  padding: 15px;
  font-weight: 300;
}
.tiles_info .tiles-body {
    font-size: 32px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
    padding: 19px 15px;
}
.tiles_info .tiles-body-alt .text-center, .info-tiles .tiles-body .text-center {
  margin-top: -5px;
}
.tiles_info.tiles_blue1 .tiles-body {
  background: #9358ac;
}
.tiles_blue1{
  background: #9358ac;
}
.blue1{
  background: #9358ac;
}
.fb1{
   background: #3b5998;
}
.fb2{
	background: #3b5998;
}
.tw1{
  background: #00aced;
}
.tw2{
  background: #00aced;
}
.content_bottom{
	margin-bottom:1em;
}
.grid-date {
  background:#78cd51;
  padding: 1.5em;
}
p.date-in {
  float: left;
  font-size: 1.2em;
  color: #fff;
}
span.date-on {
  float: right;
  font-size: 1.2em;
  color: #fff;
}
.grid-date h4 {
  color: #fff;
  font-size: 3.5em;
  text-align: center;
  padding: 48px 0 15px 0;
}
.grid-date h4 i {
  display: inline-block;
  vertical-align: middle;
}
p.monday {
  background: #fff;
  font-size: 1.1em;
  color: #000;
  padding: 1em;
  text-align: center;
}
h4.pull-left{
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  display: block;
}
.copy{
	background:#fff;
	text-align:center;
	padding:1.5em 0;
}
.copy p, .copy_layout p{
	font-size:0.85em;
	color:#555;
}
.copy p a, .copy_layout p a{
	color:#000;
}
/*-- circular progress --*/
.span_7 {
  padding-left: 0;
}
.span_8{
	text-align:center;
	padding-left: 0;
}
.col_2 {
  background-color: #fff;
  padding: 1em;
  margin-bottom: 1em;
}
.grid-1, .grid-2, .grid-3, .grid-4{
    display: inline-block;
}
.grid-1 {
  margin-bottom: 2em;
}
.grid-1, .grid-3{
	margin-right:10%;
	width: 27%;
}
.activity-row, .activity-row1{
  text-align: left;
}
i.text-info{
  float: left;
  line-height: 60px;
  font-size: 1.2em;
}
i.icon_13{
  color:#00aced;
}
.activity-img{
  text-align:center;
}
.activity-img img{
  display:inline-block;
}
.activity-desc h5{
	color:#000;
	font-size:1em;
	font-weight:500;
	margin-bottom: 5px;
}
.activity-desc h5 a{
	color:#000;
}
.activity-desc p{
	color:#999;
	font-size:0.85em;
	line-height:1.5em;
}
.activity-desc h6{
  color: #D8D8D8;
  font-size:12px;
  margin: 10px 0 0 0;
}
.activity-row{
	margin-bottom:2em;
}
.scrollbar{
	height:392px;
	background:#fff;
	overflow-y: scroll;
    padding:2em 1em;
}
.activity_box{
  background: #fff;
  min-height: 392px;
}
.icon_11{
  color: #ef553a;
}
.icon_12{
  color:#9358ac;
}
#style-2::-webkit-scrollbar-track
{
	
	background-color:#f0f0f0;
}

#style-2::-webkit-scrollbar
{
	width:5px;
	background-color: #f5f5f5;
}

#style-2::-webkit-scrollbar-thumb
{
	
	background-color:rgb(6, 217, 149);
}
/*-- General stats --*/
.stats-info{
  background-color: #fff;
}
.panel .panel-heading {
  padding: 20px;
  overflow: hidden;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: 0!important;
  height: 55px;
  font-size: 14px;
  font-weight: 600;
}
.panel .panel-heading .panel-title {
  font-size: 14px;
  float: left;
  margin: 0;
  padding: 0;
  font-weight: 600;
}
.panel-heading {
  padding:32px 15px 0px;
  border-top-left-radius:0 !important;
  border-top-right-radius: 0 !important;
}
.stats-info ul {
  margin: 0;
}
.list-unstyled {
  padding-left: 0;
  list-style: none;
}
.stats-info ul li {
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  font-size: 0.85em;
  color: #999;
}
.panel-title {
  font-size: 20px;
}
.stats-info ul li.last{
	border-bottom:0;
	padding-bottom:4px;
}
.text-success {
  color: #22BAA0;
}
.text-danger {
  color: #f25656;
}
/*-- col_3 --*/
.widget{
	padding:0;
}
.col-md-3.widget.widget1 {
  width: 23.5%;
}
.r3_counter_box {
  min-height: 100px;
  background: #ffffff;
  padding: 15px;
}
.stats {
  overflow: hidden;
}
.r3_counter_box .fa {
  margin-right: 0px;
  width: 66px;
  height: 66px;
  text-align: center;
  line-height: 65px;
}
.stats span{
	color:#999;
	font-size:15px;
}
.fa.pull-left {
  margin-right: 10% !important;
}
.icon-rounded{
  background-color:#9358ac;
  color: #ffffff;
  border-radius: 50px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  -o-border-radius: 50px;
  -ms-border-radius: 50px;
  font-size: 25px;
}
.r3_counter_box.stats {
  padding-left: 85px;
}
.r3_counter_box h5 {
  margin: 10px 0 5px 0;
  color:#000;
  font-weight:600;
  font-size: 20px;
}
i.user1{
	background:#ef553a;
}
i.user2{
	background:#3b5998;
}
i.dollar1{
	background:#00aced;
}
.widget1 {
  margin-right: 1.5%;
}
.widget{}
.world-map {
  width: 64%;
  float: left;
  background: #4597a8;
  position: relative;
  padding: 2em 2em 0 2em;
}
.world-map h3 {
  float: left;
  font-size: 1.9em;
  color: #fff;
  font-weight: 600;
  padding: 0em 0 0.5em 0;
}
.world-map p {
  float: right;
  font-size: 1.3em;
  color: #fff;
  font-weight: 300;
  padding: 0.5em 0 0.5em 0;
}
/*-- map --*/
#vmap {
  background-color: #fff !important;
}
.col_4, .col_5{
	padding-left:0;
}
.map_container, #chart, .span_6, .col_2, .weather_list, .cal1, .skills-info, .stats-info, .r3_counter_box, .activity_box, .bs-example1, .cloud, .copy{
  -ms-box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);
}
.span_11 {
  margin-bottom: 1em;
}
/*-- graphs --*/
.graphs{
  padding: 2em 1em;
  background: #f2f4f8;
  font-family: 'Roboto', sans-serif;
}
canvas#doughnut, canvas#line, canvas#polarArea, #bar, #pie, #radar{
  background-color: rgb(255, 255, 255);
}
.graph_box{
	margin-bottom:1em;
}
.grid_1{
	background:#fff;
}
.grid_2{
	padding:0 7px;
}
.grid_1 h3 {
  text-align: center;
  font-size: 1.5em;
  color: #000;
  font-weight: 300;
  padding:1em 0;
}
/* --  grids  -- */
.form-control1, .form-control_2.input-sm{
  border: 1px solid #e0e0e0;
  padding: 5px 8px;
  color: #616161;
  background: #fff;
  box-shadow: none !important;
  width: 100%;
  font-size: 0.85em;
  font-weight: 300;
  height: 40px;
  border-radius: 0;
  -webkit-appearance: none;
}
.control3{
	margin:0 0 1em 0;
}
.btn-warning {
  color: #fff;
  background-color:rgb(6, 217, 149);
  border-color:rgb(6, 217, 149);
  padding:8.5px 12px;
}
.tag_01{
  margin-right:5px;
}
.tag_02{
  margin-right:3px;
}
.btn-warning:hover{
  background-color:rgb(3, 197, 135);
  border-color:rgb(3, 197, 135);
}
.btn-success:hover{
  border-color:#E74225 !important;
  background:#E74225 !important;
}
.control2{
  height:200px;
}
.alert-info {
  color: #31708f;
  background-color:rgb(240, 253, 249);
  border-color:rgb(201, 247, 232);
}
.bs-example4 {
  background: #fff;
  padding: 2em;
}
button.note-color-btn {
  width: 20px !important;
  height: 20px !important;
  border: none !important;
}
.form-control1:focus {
  border: 1px solid #03a9f4;
  background: #fff;
  box-shadow: none;
}
.show-grid [class^=col-] {
  background: #fff;
  text-align: center;
  margin-bottom: 10px;
  line-height: 2em;
  border: 10px solid #f0f0f0;
}
.show-grid [class*="col-"]:hover {
  background: #e0e0e0;
}
.grid_3{
	margin-bottom:2em;
}
.xs h3, .widget_head{
	color:#000;
	font-size:1.7em;
	font-weight:300;
	margin-bottom: 1em;
}
.grid_3 p{
  color: #999;
  font-size: 0.85em;
  margin-bottom: 1em;
  font-weight: 300;
}
/*-- Typography --*/
.grid_4{
	background:#fff;
	padding:2em 2em 1em 2em;
}
.label {
  font-weight: 300 !important;
  border-radius:4px;
}  
.grid_5{
	background:#fff;
	padding:2em;
}
.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
  border-top: none !important;
}
.tab-content > .active {
  display: block;
  visibility: visible;
}
.progress {
  height: 8px;
  box-shadow: none;
}
.progress {
  overflow: hidden;
  height: 20px;
  margin-bottom: 20px;
  background-color: #eeeeee;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}
.progress-bar {
  float: left;
  width: 0%;
  height: 100%;
  font-size: 12px;
  line-height: 20px;
  color: #ffffff;
  text-align: center;
  background-color: #03a9f4;
  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: width 0.6s ease;
  -o-transition: width 0.6s ease;
  transition: width 0.6s ease;
}
.progress-bar {
  box-shadow: none;
}
.progress-bar-primary {
  background-color: #03a9f4;
}
.progress-bar-info {
  background-color: #00bcd4;
}
.progress-bar-success {
  background-color:rgb(6, 217, 149);
}
.progress-bar-warning {
  background-color: #ffc107;
}
.progress-bar-danger {
  background-color: #e51c23;
}
.progress-bar-inverse {
  background-color: #757575;
}
.page_1{
	padding:0;
}
.pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus {
  background-color:rgb(6, 217, 149) !important;
  border-color:rgb(6, 217, 149) !important;
}
.breadcrumb li{
	font-size:0.85em;
}
.breadcrumb li a{
	color:rgb(6, 217, 149);
}
.badge-primary {
  background-color: #03a9f4;
}
.badge-success {
  background-color: #8bc34a;
}
.badge-warning {
  background-color: #ffc107;
}
.badge-danger {
  background-color: #e51c23;
}
.tab-container .tab-content {
  border-radius: 0 2px 2px 2px;
  border: 1px solid #e0e0e0;
  padding: 16px;
  background-color: #ffffff;
}
.nav-tabs {
  margin-bottom: 1em;
}
.well {
  padding: 9px;
  font-size: 0.85em;
  color: #555;
  line-height: 1.8em;
}
.bs-example-modal {
  background-color: #fff !important;
  border-color:#fff !important;
}
.modal {
  overflow-y:auto !important;
}
.btn-primary{
  background-color: rgb(0, 200, 135) !important;
  border-color: rgb(0, 200, 135) !important;
  color: #fff;
}
.btn-primary:hover{
  background-color: #fff !important;
  border-color: #fff !important;
  color:rgb(6, 217, 149) !important;
}
h2.modal-title {
  font-size: 1.3em;
  color:#999;
  font-weight: 300;
}
.modal-content {
  -ms-box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  border: 0px solid #e0e0e0;
}
.modal-body h2{
  color:#555;
  font-size:1.5em;
  font-weight:300;
}
.modal-body p{
  color: #888;
  font-size: 0.85em;
  font-weight: 300;
  line-height: 1.8em;
}
.modal-body p img{
	margin:1em 0;
}
.form-horizontal .control-label {
  text-align: right;
  color: #000;
  font-weight: 300;
  font-size: 0.85em;
}
.checkbox-inline1{
  position: relative;
  display:block;
  margin-bottom: 0;
  font-weight: 400;
  vertical-align: middle;
  cursor: pointer;
}
.help-block {
  color: #999;
  font-size: 0.85em;
}
.radio label, .checkbox label, label{
  font-size: 0.85em;
  font-weight:300;
  vertical-align: middle;
}
.checkbox1{
  font-size: 0.85em;
  font-weight: 300;
}
select[multiple] {
  padding: 7px 9px !important;
}
.has-success .form-control1{
  background-color: #f1f8e9;
  border-color: #c5e1a5 !important;
}
.has-error .form-control1{
  background-color: #fde0dc;
  border-color: #f69988 !important;
}
.input-icon.right > i, .input-icon.right .icon {
  right:12px;
  float: right;
}
.input-icon > i, .input-icon .icon {
  position: absolute;
  display: block;
  margin: 10px 8px;
  line-height: 14px;
  color: #999;
}
.has-success .help-block, .has-success .control-label, .has-success .radio, .has-success .checkbox, .has-success .radio-inline, .has-success .checkbox-inline, .has-success.radio label, .has-success.checkbox label, .has-success.radio-inline label, .has-success.checkbox-inline label {
  color: #7cb342;
}
.has-error .help-block, .has-error .control-label, .has-error .radio, .has-error .checkbox, .has-error .radio-inline, .has-error .checkbox-inline, .has-error.radio label, .has-error.checkbox label, .has-error.radio-inline label, .has-error.checkbox-inline label {
  color: #dd191d;
}
/* -- validation --*/
.well1{
	background:#fff;
	padding:2em;
}
/*-- Basic_tables --*/
.bs-example1{
  background:#fff;
  padding:2em;
}
.panel-body1{
  background: #fff;
  padding:2em;
  margin: 2em 0 0 0;
}
.panel-warning {
  margin-top: 2em;
}
.panel.panel-midnightblue {
  border-color: #263238;
}
.panel.panel-midnightblue .panel-heading {
  color: #eceff1;
  background-color: #37474f;
  border-color: #263238;
}
.panel.panel-warning {
  border-color: #fdd835;
}
.panel.panel-warning .panel-heading {
  color: #fffde7;
  background-color: #ffc107;
  border-color: #fdd835;
}
.panel .panel-heading .panel-ctrls {
  margin-right: -8px;
}
.panel .panel-heading .panel-ctrls {
  width: auto;
  float: right;
  padding: 0;
  margin: 0;
  line-height: 0;
}
.panel .panel-heading h2 {
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
}
/*-- inbox --*/
.mail-header {
  padding: 15px;
}
.mail-title {
  font-size: 20px;
  line-height: 32px;
  display: block;
  float: left;
  height: 34px;
  margin: 0 10px 0 0;
}
.btn-group, .btn-group-vertical {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.float-right, .pull-right {
  float: right!important;
}
.pad0A {
  padding: 0!important;
}
.input-group {
  position: relative;
  display: table;
  width: 100%;
  border-collapse: separate;
  margin-bottom: 1em;
}
.has-success .input-group-addon {
  border-color:#A4E7A5 !important;
}
.has-feedback label~.form-control-feedback {
  top: 28px !important;
}
div[id^=uniform-] input {
  position: absolute;
  top: 0;
  left: 0;
  display: -moz-inline-box;
  display: inline-block;
  zoom: 1;
  opacity: 0;
  border: none;
  background: 0 0;
  filter: alpha(opacity=0);
  -moz-opacity: 0;
}
.email-list1{
  padding: 0; 
}
ul.collection {
  margin: 0;
  list-style: none;
  background:#fff;
  padding:2em;
}
ul.collection li{
	margin-bottom:2em;
}
ul.collection li.email_last{
	margin-bottom:0;
}
#email-list .collection .collection-item.avatar {
  height: auto;
  
  position: relative;
}
#email-list .collection .collection-item.avatar .icon {
  position: absolute;
  width: 42px;
  height: 42px;
  overflow: hidden;
  left: 15px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  top: 20px;
}
.email-unread .email-title {
  font-weight: 500;
}
.ultra-small {
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  color: #999;
}
span.badge {
  min-width: 3rem;
  padding: 2px 9px;
  text-align: center;
  font-size: 0.85;
  line-height: inherit;
  color: #fff;
  position: absolute;
  right:38px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 2px;
}
span.blue{
	background-color:#00aced;
}
span.red{
	background-color:#ef553a;
}
span.blue1{
	background-color:#9358ac;
}
i.icon_1{
  float: left;
  color: #00aced;
  line-height: 2em;
  margin-right: 1em;
}
i.icon_2{
  float: left;
  color:#ef553a;
  line-height: 2em;
  margin-right: 1em;
  font-size: 20px;
}
i.icon_3{
  float: left;
  color:#9358ac;
  line-height: 2em;
  margin-right: 1em;
  font-size: 20px;
}
.avatar_left {
  float: left;
}
i.icon_4{
  width: 45px;
  height: 45px;
  background: #F44336;
  float: left;
  color: #fff;
  text-align: center;
  border-radius: 40px;
  font-size: 1.5em;
  line-height: 44px;
  font-style: normal;
  margin-right: 1em;
}
i.icon_5{
  background-color: #3949ab;
}
i.icon_6{
  background-color: #03a9f4;
}
.blue-text {
  color: #2196F3 !important;
  float:right;
}
.content-box-wrapper{
	background:#fff;
	padding:2em;
	margin: 1em 0 0;
}
.status-badge {
  position: relative;
  display: inline-block;
}
.mrg10A {
  margin: 10px!important;
}
.small-badge {
  overflow: hidden;
  width: 12px;
  height: 12px;
  padding: 0;
  border: 2px solid #fff!important;
  border-radius: 20px;
  background-color: red;
}
.status-badge .small-badge {
  position: absolute;
  right: 1px;
  bottom: 1px;
}
.badge-danger{
  color: #fff;
  border-color: #e73629;
  background: #F44336;
}
.badge-success{
  color: #fff;
  border-color: #3fa243;
  background: #4CAF50;
}
.bg-green1{
  color: #fff;
  border-color: #3fa243;
  background: #4CAF50;
}
h4.content-box-header{
  color: #000; 
  font-size: 1.3em; 
  font-weight: 300; 
  margin-bottom: 1em; 
  text-align:left;
}
.editor{
  background:#fff;
  padding: 1em 2em 2.5em 2em;
}
.mailbox-content {
  background: #fff;
  padding: 2em;
}
.widget-footer.clearfix {
  margin: 1em 0 0 0;
}
div.selector, div.selector span, div.checker span, div.radio span, div.uploader, div.uploader span.action, div.button, div.button span {
  background: #fff;
  background-repeat: no-repeat;
  -webkit-font-smoothing: antialiased;
  border: 1px solid #CDCDCD;
}
div.checker, div.checker span, div.checker input {
  width: 19px;
  height: 19px;
}
div.checker span {
  display: -moz-inline-box;
  display: inline-block;
  zoom: 1;
  text-align: center;
  background-position: 0 -260px;
}
div.checker input {
  opacity: 0;
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  border: none;
  background: none;
  display: -moz-inline-box;
  display: inline-block;
  zoom: 1;
}
.m-r-sm {
  margin-right: 15px;
  font-weight:400;
  font-size: 14px;
}
.icon-state-warning {
  color: rgb(6, 217, 149);
}
.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
  font-size: 0.85em;
  color: #999;
} 
.mailbox-content table tbody tr:hover {
  background: #FAFAFA;
}
.table td, .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
  padding:15px !important;
}
.table > thead > tr > th {
  border-bottom: 1px solid #ddd !important;
}
.badge-success, .bg-green, .bootstrap-switch-success, .btn-success {
  border-color: #ef553a;
  background: #ef553a;
  padding:8.5px 12px;
}
.btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active, .open .dropdown-toggle.btn-success {
  color: #fff;
  background-color:rgb(6, 217, 149);
  border-color:rgb(6, 217, 149);
}
.btn-toolbar {
  margin-left: 0 !important;
}
.note-editor {
  border: 1px solid #DCE1E4;
  border-radius: 0;
}
.note-editor .note-toolbar {
  border-bottom: 0;
  background: #fff;
  padding: 10px;
}
.note-editor .note-editable {
  padding: 10px 15px 15px;
  overflow: auto;
  outline: 0;
}
.note-editor .note-statusbar .note-resizebar {
  border: 0;
}
.note-editor .note-statusbar .note-resizebar {
  width: 100%;
  height: 8px;
  cursor: ns-resize;
  border-top: 1px solid #a9a9a9;
}
.col-md-8.inbox_right {
  padding-right: 0;
}
.editor1 {
  margin: 2em 0 0 0;
}
.mail-toolbar.clearfix {
  border-bottom: 1px solid #f0f0f0;
  padding: 2em 0;
}
.compose-message {
  overflow: hidden;
  padding: 0 0 10px;
}
.note-editor .note-statusbar {
  background: 0 0;
}
.note-editor .note-statusbar .note-resizebar {
  border: 0;
}
.note-editor .note-statusbar .note-resizebar {
  width: 100%;
  height: 8px;
  cursor: ns-resize;
}
.note-editor .note-statusbar .note-resizebar .note-icon-bar {
  width: 20px;
  margin: 1px auto;
  border-top: 1px solid #a9a9a9;
}
.note-editor {
  border: 1px solid #DCE1E4;
  border-radius: 0;
}
.note-editor .note-codable {
  display: none;
  width: 100%;
  padding: 10px;
  margin-bottom: 0;
  font-size: 14px;
  color: #ccc;
  background-color: #222;
  border: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  box-shadow: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  resize: none;
}
i.icon_8{
  font-size: 13px;
  color: #555;
}
.btn_1{
	float:left;
}
a.btn.btn-default.mrg5R {
  float: left;
}
.float-left, .pull-left {
  float: left!important;
  width: 50%;
  cursor: pointer;
}
.mrg5R {
  margin-right: 5px!important;
}
.dropdown-menu > li > a {
  font-size:13px;
}
.font-red, .has-error .help-block, .parsley-required, .text-danger {
  color: #F44336 !important;
}
i.icon_9{
  margin-right:10px;
}
.checkbox {
  position: relative;
  top:-3px;
  margin: 0 1rem 0 0;
  cursor: pointer;
}
.checkbox:before {
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  content: "";
  position: absolute;
  left: 0;
  z-index: 1;
  width: 19px;
  height: 19px;
  border: 1px solid #CDCDCD;
}
.checkbox:after {
  content: "";
  position: absolute;
  top: -0.125rem;
  left: 0;
  width: 1.1rem;
  height: 1.1rem;
  background: #fff;
  cursor: pointer;
}
.checkbox:checked:before {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  height: .5rem;
  border-color: #F44336;
  border-top-style: none;
  border-right-style: none;
}
blockquote {
  margin: 0 !important;
  border-left: 5px solid #eee;
}
.copy_layout{
  padding:1.5em 0;
  background:#fff;
  text-align:center;
  margin: 4em 0 0em 0;
}
.login{
	background:none;
	padding:0;
	margin:11em 0 0 0;
}
.register{
	margin:2em 0 0 0;
}
/* -- widgets --*/
.bg-info {
  background:#78cd51;
  padding: 3px 8px;
  color: #ffffff;
}
.tile-progress {
  padding: 30px;
  margin-bottom:1em;;
}
.col-sm-3.widget_1_box {
  padding: 0 5px;
}
.col-md-4.widget_1_box1 {
  padding: 0 0px 0 5px;
}
.tile-progress h4 {
  color: #ffffff;
  margin: 0px;
  text-align: center;
  white-space: nowrap;
  font-weight:300;
}
.tile-progress .progress {
  margin: 15px 0 10px 0;
  height: 7px;
  background: rgba(50, 50, 58, 0.5);
}
.progress {
  background: #f5f5f5;
  background-image: none;
  -webkit-box-shadow: inset 0 -1px 2px rgba(150, 150, 150, .1);
  -moz-box-shadow: inset 0 -1px 2px rgba(150, 150, 150, .1);
  box-shadow: inset 0 -1px 2px rgba(150, 150, 150, .1);
  border-radius: 0px;
  -o-border-radius: 0px;
  -ms-border-radius: 0px;
  -moz-border-radius: 0px;
  -webkit-border-radius: 0px;
}
.tile-progress span {
  color: #fff;
  display: block;
  text-align: center;
  margin: 0px;
  font-size: 14px;
  font-weight: 300;
}
.bg-success {
  background:#eae874;
  color: #ffffff;
}
.bg-danger {
  background:rgba(80, 204, 240, 1);
  color: #ffffff;
}
.bg-secondary {
  background:#fabb3d;
  color: #555555;
}
.tile-progress .progress .progress-bar {
  background: #ffffff;
}
.wid-social {
  display: inline-block;
  width: 100%;
  padding: 15px 15px 15px 15px;
  margin: 0px 0 1em 0;
}
.facebook {
  background-color:#3b5998 !important;
  color: #ffffff !important;
}
.icon-xlg {
  font-size: 70px;
}
.social-info h3 {
  display: inline-block;
}
.wid-social .social-info h3, .wid-social .social-info h4 {
  margin: 0px 0 15px 0;
  font-size: 15px;
}
span.percent {
  font-size: 13px;
  font-weight: 300;
}
h3.count.text-light {
  color: #fff;
  font-weight: 300;
  font-size: 40px;
}
.twitter {
  background-color:#00aced !important;
  color: #ffffff !important;
}
.google-plus {
  background-color: #313131 !important;
  color: #ffffff !important;
}
.dribbble {
  background-color:#ea4c89 !important;
  color: #ffffff !important;
}
.linkedin {
  background-color: #007bb5 !important;
  color: #ffffff !important;
}
.youtube {
  background-color: #e02f2f !important;
  color: #ffffff !important;
}
.skype {
  background-color: #00aaf1 !important;
  color: #ffffff !important;
}
.flickr {
  background-color: #ed1983 !important;
  color: #ffffff !important;
}
.coffee-top {
  position: relative;
  text-align: center;
}
.doe {
  position: absolute;
  top: 37%;
  text-align: center;
  width: 100%;
}
.doe h6 {
  color: #fff;
  font-size: 1em;
}
.doe p {
  color: #DC483A;
  font-size: 1em;
}
.coffee-top i {
  position: absolute;
  top: 84%;
  background: url(../images/1.png)no-repeat center;
  width: 80px;
  height: 80px;
  display: block;
  border-radius: 100px;
  left: 39%;
}
.follow {
  padding: 3em 1em 1em;
  background: #fff;
}
.two p {
  font-size: 0.875em;
  color: #2d2d2d;
}
.two span {
  font-size: 1.5em;
  color: #DC483A;
}
.online-top {
  background: #fff;
  padding:12px;
  border-bottom: 1px solid #E1E1E1;
}
.panel-body2 {
  padding: 21px;
}
.widget_1_box2{
	padding:0 5px;
}
.top-at {
  float: left;
  width: 20%;
}
.top-on {
  float: right;
  width: 71%;
  margin-top: 7px;
}
.top-on1 {
  float: left;
}
label.round {
  background: #DC483A;
  width: 10px;
  height: 10px;
  display: block;
  float: right;
  border-radius: 100px;
  margin-top: 8%;
}
.online-top:hover {
  background: #f9f9f9;
}
.top-on1 span {
  font-size: 0.9em;
  color: #dc483a;
}
.top-on1 p {
  font-size: 1em;
  color: #000;
  font-weight:500;
}
.stats-info1{
	box-shadow:none;
}
.online-top1{
	border-bottom:none;
}
.widget_5{
	margin:1em 0 0 0;
}
.wid_blog{
	background:rgb(6, 217, 149);
	padding:3em 2em;
}
.wid_blog h1{
  color: #fff;
  font-size: 1.5em;
  line-height: 1.5em;
  font-weight: 300;
  margin-bottom: 0;
}
.wid_blog-desc{
	background:#fff;
	padding:2.6em 2em;
}
.wid_blog-left{
  float: left;
  width: 20%;
  margin-right: 5%;
}
.wid_blog-right{
  float: left;
  width:75%;
}
.wid_blog-right h2{
  color:#000;
  font-size:1.3em;
  font-weight:300;
}
.wid_blog-right p{
  color:#999;
  font-size:0.85em;
  font-weight:300;
  line-height:1.5em;
}
.list-inline {
  margin:1em 0 0 0;
}
.text-muted {
  color: #999999;
}
.text-orange {
  color:#DC483A;
}
.link1{
	padding:5px 8px;
	color:#000;
}
.editor-input.ng-scope p{
	color:#999;
	font-size:0.85em;
	line-height:1.8em;
}
.list-inline>li a{
   font-size:0.85em;	
}
/*-- media --*/
.bs-example5{
   background:#fff;
   padding:2em;
}
.media-heading {
  color: #000;
}
.sidebard-panel .feed-element, .media-body, .sidebard-panel p {
  font-size:0.85em;
  color:#999;
}
.example_6{
	margin:1em 0 0 0;
}
.demolayout {
  background:rgb(6, 217, 149);
  width: 60px;
  overflow: hidden;
}
.padding-5 {
  padding: 5px;
}
.demobox {
  background:#f0f0f0;
  color: #333;
  font-size: 13px;
  text-align: center;
  line-height:30px;
  display: block;
}
.padding-l-5 {
  padding-left: 5px;
}
.padding-r-5 {
  padding-right: 5px;
}
.padding-t-5 {
  padding-top: 5px;
}
.padding-b-5 {
  padding-bottom: 5px;
}
code {
  background:rgb(246, 255, 252);
  padding: 2px 2px;
  color: #000;
  border: 1px solid rgb(198, 255, 236);
}
.media_1-left{
  padding-left:0;
  background-color: #fff;
}
.media_1-right{
  padding-right:0;
}
.media_1{
	margin:1em 0 0 0;
}
.media_box{
	margin-bottom:2em;
}
.media_box1{
	margin-top:2em;
}
.media {
  margin-top:40px !important;
}
.media:first-child {
  margin-top: 0 !important;
}
.panel_2{
	padding:2em 2em 0;
	background:#fff;
}
.panel_3{
	padding-bottom:1px;
}
.panel_2 h3{
	color:#000;
	font-size:1.1em;
}
.panel_2 p{
	color:#555;
	font-size:0.85em;
	margin-bottom:1em;
}
td.head {
  color: #000 !important;
  font-size: 1.2em !important;
}
/*-- login --*/
.login-logo {
  margin: 0;
  text-align: center;
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  display: inline-block;
  width: 100%;
  padding: 50px 0;
}
h2.form-heading {
  margin: 0;
  text-align: center;
  color:#000;
  font-size: 18px;
  text-transform: uppercase;
  display: inline-block;
  width: 100%;
}
body#login{
  background: url(../images/bg.jpg)no-repeat;
  background-size:cover;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  -o-background-size:cover;
  -ms-background-size:cover;
  min-height:850px;
}
.app-cam {
  width:22%;
  margin:3em auto auto auto;
}
.app-cam input[type="text"] {
  width: 100%;
  padding: 15px;
  color: #999;
  font-size: 0.85em;
  outline: none;
  font-weight: 300;
  border: none;
  background:#222224;
  margin:0 0 1em 0;
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  -o-border-radius: 2px;
}
.app-cam input[type="password"] {
  width: 100%;
  padding: 15px;
  color:#999;
  font-size: 0.85em;
  outline: none;
  font-weight: 300;
  border: none;
  background:#222224;
  margin:0 0 1em 0;
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  -o-border-radius: 2px;
}
.app-cam input[type="submit"], .btn-success1{
  font-size: 14px;
  font-weight: 300 !important;
  color: #fff;
  cursor: pointer;
  outline: none;
  padding: 10px 15px;
  width: 100%;
  border: none;
  background: rgb(6, 217, 149);
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  -o-border-radius: 2px;
  text-transform: uppercase;
}
.app-cam input[type="submit"]:hover, .btn-success1:hover{
  background:rgb(1, 200, 136);
  color:#fff !important;
}
.login-social-link {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 15px;
  width: 100%;
}
.login-social-link a {
  color: #fff;
  padding: 13px 38px;
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  -o-border-radius: 2px;
  width: 46.5%;
  text-align: center;
}
.login-social-link a.facebook {
  background: #3b5999;
  margin-right: 22px;
  float: left;
}
.login-social-link a:hover.facebook{
  background:#2B4886 !important;
  text-decoration:none;
}
.login-social-link a.twitter {
  background: #63c6ff;
  float: left;
}
.login-social-link a:hover.twitter{
  background:#46ACE7 !important;
  text-decoration:none;
}
ul.new {
  margin:2em 0 0 0;
  list-style:none;
  padding:0;
}
ul.new li.new_left{
  float: left;
}
ul.new li.new_left p, p.sign{
  font-weight:300;
} 
p.sign a, ul.new li.new_left p a{
  color:#000;
}
ul.new li.new_right{
  float: right;
}
.app-cam p {
  color:#000;
  font-size: 14px;
  margin: 1em 0;
}
.form-signin a, .registration, .login-body label {
  margin: 1em 0 0 0;
  font-weight: 300;
  font-size: 0.85em;
  text-align:center;
}
.radios input[type="radio"] {
  margin: 4px 0 0 0;
  vertical-align: top;
  cursor: pointer;
  color:#fff;
}
.radios label:first-child {
  margin-left: 0;
}
.radios label{
  margin-left: 15px;
}
 /*-- responsive design --*/
@media (max-width:1366px){
.col-xs-8.activity-desc {
  width: 64.666667%;
  padding: 0;
}	
.activity-desc h5 {
  font-size: 0.85em;
}  
.svg{
  width: 600px !important;
  height: 400px;
}
canvas#doughnut, canvas#line, canvas#polarArea, #bar, #pie, #radar {
  width: 342px !important;
  height:260px !important;
}
.avatar_left {
  width: 65%;
}
.float-left, .pull-left {
  width: 47%;
}
.login-social-link a.facebook {
  margin-right: 20px;
}
}
@media (max-width:1280px){
.col-xs-8.activity-desc {
  width: 63.666667%;
}	
.activity-desc p {
  font-size: 12px;
}
.activity-desc h6 {
  font-size: 11px;
}
i.text-info {
  line-height: 39px;
  font-size: 1em;
}
.float-left, .pull-left {
  width: 42%;
}
.login-social-link a {
  padding: 13px 25px;
  width: 45.5%;
}
}
@media (max-width:1024px){	
.r3_counter_box .fa {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
.r3_counter_box {
  padding: 10px;
  min-height: 70px;
}
.r3_counter_box h5 {
  font-size: 15px;
}
.stats span {
  font-size: 13px;
}
.activity-img {
  padding: 0 10px;
}
.col-xs-8.activity-desc {
  width: 58.666667%;
}
.scrollbar {
  padding: 10px;
}
.col-xs-1 {
  padding: 0;
}
.activity-row {
  margin-bottom: 1em;
}
.activity_box {
  min-height: 281px;
}
.scrollbar {
  height: 278px;
}
.panel-body {
  padding:10px;
}
.panel-title {
  font-size: 15px;
}
.panel-heading {
  padding: 20px 0px 0px;
}
.stats-info ul li {
  padding: 7.4px 0;
  font-size: 12px;
}
div#vmap {
  height: 300px !important;
}
.bs-example1 {
  padding: 10px;
}
.table td, .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
  padding: 12px !important;
}
.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
  font-size: 12px;
}
.col_2 {
  padding: 5px;
}  
.tiles_info .tiles-head {
  padding: 5px 5px;
  font-size: 11px;
}
.tiles_info .tiles-body {
  font-size: 22px;
  padding: 15px 15px;
}
.grid-date {
  padding: 10px;
}
p.date-in, span.date-on{
  font-size: 1em;
}  
.grid-date h4 {
  font-size: 3.5em;
  padding: 44px 0 15px 0;
}
canvas#doughnut, canvas#line, canvas#polarArea, #bar, #pie, #radar {
  width: 222px !important;
  height: 160px !important;
}
#page-wrapper {
  background: #f2f4f8;
}
.activity-desc h5 {
  font-size: 13px;
}
ul.collection, .mailbox-content{
  padding: 10px;
}
.float-left, .pull-left {
  width: 35%;
}
.m-r-sm {
  margin-right: 0px;
}
.mrg10A {
  margin:1px!important;
}  
.tile-progress {
  padding: 15px;
}
i.fa.fa-facebook, i.fa.fa-twitter, i.fa.fa-google-plus, i.fa.fa-dribbble, i.fa.fa-linkedin, i.fa.fa-youtube, i.fa.fa-skype, i.fa.fa-flickr{
  font-size: 30px;
}
h3.count.text-light {
  font-size: 30px;
}
.coffee-top i {
  top: 70%;
  background: url(../images/1.png)no-repeat center;
  left: 31%;
  background-size: 70%;
}
.follow {
  padding: 3em 0px 2em;
}
.two p {
  font-size: 12px;
}
.two span {
  font-size: 1.3em;
}
.top-on1 p {
  font-size: 0.85em;
}
.wid_blog h1 {
  font-size: 1.3em;
}
.wid_blog {
  padding: 2em;
}
.editor {
  padding: 1em 1em 1.5em 1em;
}
.link1 {
  padding: 5px 5px;
}
.wid_blog-desc {
  padding:2.4em 1em;
}
.panel_2 {
  padding: 2em 1em 0;
}
.online-top {
  padding: 11px;
}
.app-cam {
  width: 27%;
}
.navbar-right {
  margin-right: -10px;
}
.content-box-wrapper {
  padding: 1em;
}
i.icon_4 {
  margin-right: 10px;
}
span.badge {
  right: 10px;
}
}
@media (max-width:768px){	
.navbar-right {
  margin-right:3px !important;
}
.col-md-3.widget {
  width:100%;
  float:none;
}
.span_7, .span_8, .col_4{
  padding:0;
}
.span_8, .stats-info, .col_4{
  margin-bottom:1em;
}
.span_4 {
  padding: 0;
  margin:1em 0;
}
.col_1_of_2.span_1_of_2 {
  width: 50%;
  float: left;
}
.graph_box {
  text-align: center;
}
.grid_2 {
  padding: 0;
  margin-bottom: 1em;
}
.graph_box1 {
  text-align: center;
}
.col-md-8.inbox_right {
  padding: 0;
  margin-top:1em;
}
.col-md-4.widget_1_box1 {
  margin-bottom: 1em;
}
.follow {
  padding: 1em;
}
.coffee-top{
	text-align:center;
}
.coffee-top img{
  display:inline-block;
}
.stats-info3{ 
  padding:0;
  margin-bottom:1em;
}
.widget_1_box2 {
  padding: 0;
  margin-top: 1em;
}
.wid_blog-desc {
  padding: 1em;
}
.copy_layout {
  margin: 1em 0 0em 0;
}
.login-social-link a.facebook {
  margin-right: 10px;
}
.app-cam {
  width: 30%;
}
.login-social-link a {
  padding: 10px 15px;
  width: 47.5%;
}
ul.new li.new_left, ul.new li.new_right {
  float: none;
}
.coffee-top i {
  top: 88%;
  background: url(../images/1.png)no-repeat center;
  left: 44%;
  background-size: 70%;
}

.logo-element {
  padding: 17px 0;
}
.col-md-3.widget.widget1 {
  width:100%;
}
.grid_box1 {
  margin-bottom: 5px;
}
.grid_4, .grid_5{
  padding: 20px 10px;
}
.modal-dialog {
  width: 400px !important;
}
.bs-example4, .bs-example5{
  padding: 1em;
}
ul.new {
  margin: 1em 0 0 0;
  text-align: center;
}
}
@media (max-width:736px){
.navbar-right~.navbar-right {
  display: block;
}
.navbar-right {
  display: none;
}
p.monday {
  font-size: 1em;
}
.grid-date h4 {
  font-size:2.5em;
  padding:20px 0 0px 0;
}
.copy {
  padding: 1em 0;
}
ul.new {
  text-align: center;
}
.grid_box1{
  margin-bottom:5px;
}
.navbar-default .navbar-toggle {
  border-color:#000;
  background-color:#000 !important;
}
.navbar-default .navbar-toggle .icon-bar {
  background-color: #fff;
}
.navbar-default .navbar-collapse, .navbar-default .navbar-form {
  border-color: rgb(6, 217, 149);
}
form.navbar-form.navbar-right {
  margin: 0;
}
.sidebar-nav.navbar-collapse {
  margin: 0;
}
.media_1-right {
  padding:0;
}
}
@media (max-width:480px){
.pagination {
  margin: 6px 0;
}
span.label.label-default{
  line-height: 2em;
}
button.btn.btn-lg, button.btn{
  margin-bottom:10px;
}
.modal-dialog {
  width: 370px !important;
}
.coffee-top i {
  top: 82%;
  left: 39%;
}
.well1 {
  padding: 1em;
}
.panel-body1 {
  margin: 1em 0 0 0;
}
.panel-warning {
  margin-top: 1em;
}
.app-cam {
  width: 50%;
  margin: 2em auto auto auto;
}
.app-cam input[type="text"], .app-cam input[type="password"]{
  padding: 10px;
}  
.login-logo {
  padding: 40px 0;
}
.float-left, .pull-left {
  width: 50%;
}
.mail-toolbar.clearfix {
  padding: 1em 0;
}
.copy_layout {
  padding: 10px;
}
button.btn.btn-success {
  padding:9px 12px;
}
.xs h3, .widget_head {
  font-size: 1.5em;
  margin-bottom: 15px;
}
.follow {
  padding: 1em 0;
}
.widget_1_box2 {
  margin-top: 0;
}
.wid_blog h1 {
  font-size: 1em;
}
.wid_blog {
  padding: 1em;
}
.widget_5 {
  margin: 0;
}
.table td, .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
  padding: 5px !important;
}
td.head {
  font-size:1em !important;
}
}
@media (max-width:320px){
.graphs {
  padding: 20px 10px;
}
.login-logo {
  padding:20px 0;
}
.login-logo img{
  width:40%;
}
.app-cam {
  width: 70%;
  margin: 1em auto auto auto;
}
h2.form-heading {
  font-size: 16px;
}  
.login-social-link a {
  padding: 8px 15px;
}
.pagination-lg>li>a, .pagination-lg>li>span {
  padding: 6px 13px;
  font-size: 16px;
}
.modal-dialog {
  width:240px !important;
}
.grid_3 {
  margin-bottom: 1em;
}
ul.collection li {
  margin-bottom: 1em;
}
.m-r-sm {
  font-size: 13px;
}
a.btn.btn-default.dropdown-toggle {
  padding: 3px 6px;
  font-size: 13px;
}
a.btn.btn-default {
  padding: 3px 9px;
}
.btn.btn_1.btn-default.mrg5R {
  padding: 3px 10px;
}
a#home-tab {
  padding: 7px 5px;
}
.btn-warng1{
  padding:5px;
}
.coffee-top i {
  top: 73%;
  left: 37%;
}
body#login {
  min-height: 500px;
}
h1#h1{
  font-size:17px !important;
}
h2#h2{
  font-size:16px !important;
}
h3#h3{
  font-size:15px !important;
}
h4#h4{
  font-size:14px !important;
}
button.btn.btn_5 {
  font-size: 13px;
  padding: 8px 10px;
}
button.btn.btn-lg, button.btn {
  margin-bottom: 3px;
}
span.btn_6{
  font-size: 55%;
}
span.btn_7{
  font-size: 64%;
}
}
            </style>
        </template>
    </dom-module>`;

document.head.appendChild($_documentContainer.content);