<!DOCTYPE html>
<html lang="en" id="lybrate" xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="content-type" content="text/html;charset=ISO-8859-1" />
<?php include "head.php"; ?>
<body>
    <?php include "header.php"; ?>
     <style type="text/css">
         .be-detail-header { border-bottom: 1px solid #edeff2; margin-bottom: 50px; }
         .container2 {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
}
@media (min-width: 768px) {
  .container2 {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container2 {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container2 {
    width: 1200px;
  }
}
.container2-fluid {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

     </style>
     <div class="container2 be-detail-container">
    <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
            <br>
            <img src="https://cdn2.iconfinder.com/data/icons/luchesa-part-3/128/SMS-512.png" class="img-responsive" style="width:200px; height:200px;margin:0 auto;"><br>
            
            <h1 class="text-center">Verify your mobile number</h1><br>
            <p class="lead" style="align:center"></p><p> Thanks for giving your details. An OTP has been sent to your Mobile Number. Please enter the 4 digit OTP below for Successful Registration</p>  <p></p>
        <br>
       
            <form method="post" id="veryfyotp" action="verify.php">
                <div class="row">                    
                <div class="form-group col-sm-8">
                     <span style="color:red;"></span>                    <input type="text" class="form-control" name="otp" placeholder="Enter your OTP number" required="">
                </div>
                <button type="submit" class="btn btn-primary  pull-right col-sm-3">Verify</button>
                </div>
            </form>
        <br><br>
        </div>
    </div>        
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
<?php

    require('database/db.php');
    
    if(isset($_POST['mobile'],$_POST['otp'])){
        $mobile = $_POST['mobile'];
        $otp = $_POST['otp'];
        
        $sql= "SELECT * FROM users WHERE mobile = :mobile AND otp = :otp";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':mobile', $mobile, PDO::PARAM_STR);
        $stmt->bindParam(':otp', $otp, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0){
            $sql = "UPDATE users SET verified = '1' WHERE mobile = ".$mobile;
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':mobile', $mobile, PDO::PARAM_STR);
            $stmt->execute();
            if($stmt->rowCount() == 1){
                echo json_encode(['response'=>'OTP Verified']);
            }else{
                echo json_encode(['response'=>'Your mobile number is already verified']);
            }
            
            
        }else{
           echo json_encode(['response'=>'Wrong OTP']); 
        }
        
    }else{
        echo json_encode(['response'=>'Invalid Request']);
    }
    
    ?>