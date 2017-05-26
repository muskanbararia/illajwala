<!DOCTYPE html>
<html lang="en" id="lybrate" xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="content-type" content="text/html;charset=ISO-8859-1" />
<?php include "head.php"; ?>
<body>
    <?php include "header.php"; ?>
     <?php //include "after-login.php"; ?>
    <div class="container-fluid d-zeroGapContainer a-slideContainer" id="dotComLandingPage">
        <div class="outer-bg bookAppointmentBg_dld" style="background-repeat: no-repeat; background-size: cover; background-position: top right; ">

            <div class="row myriadpro-light">
                <?php include "fixed-spa.php"; ?>
                <?php include "spa.php"; ?>
            </div>
        </div>
        
        <?php include "red-strip.php"; ?>
        <?php include "why-us.php"; ?>
        <?php include "top-category.php"; ?>
        <?php include "cities.php"; ?>
        <?php include "tips.php";?>
        <div class="hidden-xs">
            <div class="hidden-xs" id="patientBlockSendSMS">
                <div class="container" style="padding: 40px;">
                    <div class="row">
                        <div class="col-sm-6 myriadpro-light" style="padding-top: 100px;">
                            <div>
                                <h2 style="font-size: 38px;">Smarter health care on the go!</h2>
                            </div>
                            <div>
                                <h2>
						Download India's #1 medical app and stay healthy!<br> It's
						free, easy and smart.
					</h2>
                            </div>
                            <div style="padding-top: 40px;">
                                <a href="https://play.google.com/store/apps/details?id=com.lybrate.phoenix" class="download_android_app" target="_blank" onclick="ga('send', 'event', 'Search', 'Android - Patient', 'Homepage Google Play Store Button')">
                                    <img src="../l2.lybcdn.com/img/download_android_app_badge.png" alt="Download Lybrate's Android app" class="android_download" style="padding-left: 10px;" />
                                </a>
                                <a href="https://itunes.apple.com/us/app/lybrate-find-best-doctors/id960716567" class="download_android_app" target="_blank" onclick="ga('send', 'event', 'Search', 'iPhone - Patient', 'Homepage Apple App Store Button')">
                                    <img src="../l4.lybcdn.com/img/download_iphone_app_badge.png" alt="Download Lybrate's iPhone app" style="padding-left: 10px;" />
                                </a>
                            </div>
                            <!-- <div class="sendAppLink"
					style="padding: 10px; border-bottom: 1px solid grey; padding-top: 40px;">
					<input class="input-lg" id="mobileForSendAppLink" type="tel"
						placeholder="Enter your mobile number"
						style="background-color: transparent; border: 0px; width: 60%; outline: none;" onkeypress="return isNumber(event)">
					<div class="btn btn-lg btn-success sendAppLinkBtn"
						style="font-size: 14px; float: right;">Send App Link</div>
				</div> -->
                            <div class="hide sendAppLinkSuccess" style="padding-top: 50px; color:green;">
                                <h2>Link sent!</h2>
                            </div>
                            <div class="hide enterValidPhone" style="color:red;">
                                <h2>Please enter a valid mobile number</h2>
                            </div>
                            <div style="padding-top: 20px;">
                                <h2>
						Give a missed call on <b>090&nbsp;&nbsp;2905&nbsp;&nbsp;9702</b>
					</h2>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div id="cf1">
                                <img src="./images/app-download-homepage-banner.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php include "featured.php";?>
        <div class="d-whiteItem text-center myriadpro-light doctorBlock">
            <div class="row">
                <h2 style="padding:40px; font-size:30px;">Are you a Doctor?</h2>
                <div class="col-sm-offset-2 col-sm-8">
                    <div class="d-title" style="letter-spacing: 1px;margin-bottom: 0px;font-size: 18px;font-weight: bold;color: #000000; text-align:center;">
                        Be a part of the next big thing in healthcare. Join us in our journey of revolutionizing healthcare delivery by harnessing technology to help millions lead healthier lives.
                    </div>
                </div>
                <div class="col-sm-4 col-sm-offset-4 col-xs-12" style="padding-bottom:30px; padding-top:30px;">
                    <button class="btn btn-lg btn-red" style="font-size:18px;" type="button" onclick="location.href = './doctor';">Know More</button>
                </div>
            </div>
        </div>
        <?php include "footer-about.php";?>
    </div>
<?php include "footer.php";?>
    
    <script type="text/javascript" src="./js/jquery.validate.min.js"></script>
    <script type="text/javascript" src="./js/jquery.maskedinput.min.js"></script>
    <script type="text/javascript" src="./js/pageJs.extraPages.js"></script>
    <script type="text/javascript" src="./js/patientAppPromoHeader.js"></script>
    <script type="text/javascript" src="./js/login.js"></script>
    <script type="text/javascript" src="./js/askQuestion.js"></script>
    
   
    <script type="text/javascript" src="./js/typeahead.js"></script>
    <script type="text/javascript" src="./js/jquery.maskedinput.min.js"></script>
    <script type="text/javascript" src="./js/featuresAndFunctionalities.js"></script>
    <script type="text/javascript" src="./js/commonArr.js"></script>
    <script type="text/javascript" src="./js/searchWidget.js"></script>
    <script type="text/javascript" src="./js/email-subscribe.js"></script>
    <script type="text/javascript" src="./js/lybrate.js"></script>
    <script type="text/javascript" src="./js/homePage.js"></script>

    
</body>


</html>