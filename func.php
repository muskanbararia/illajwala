<?php


Class Sms{
    function send($no,$sms){
        $url = "http://sms.dworld.in/sendSMS?username=gtpindia1&message=".$sms."&sendername=ILJWAL&smstype=PROMO&numbers=".$no."&apikey=f900f2d4-62a6-45c1-98a5-61355d309f5d";
        
        $ch = curl_init();  
 
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
        $output=curl_exec($ch);
        curl_close($ch);
        return $output;
    }
    
    
}

Class User{
    function reg_init($name,$mobile,$otp){
        
   
            $query = mysql_query("INSERT INTO users (name,mobile,verified,otp) VALUES('$name','$mobile','0','$otp')");
            if($query){
                return true;
            }else{
                return false;
            }
     
        
        
    }
    
    function user_check($mobile){
        $conn = new PDO("mysql:host=localhost;dbname=illajwala", 'root', '');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql= "SELECT * FROM users WHERE mobile = :mobile";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':mobile', $mobile, PDO::PARAM_STR);
        $stmt->execute();
        $row =$stmt->fetchObject();
        if($row === false){
            return false;
        }else{
            return true;
        }
    }
    
     function getDocId($mobile){
        $conn = new PDO("mysql:host=localhost;dbname=illajwala", 'root', '');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $type ='1';
        $sql= "SELECT * FROM users WHERE mobile = :mobile AND usertype = :type ";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':mobile', $mobile, PDO::PARAM_STR);
        $stmt->bindParam(':type', $type, PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetchObject();
     
        if(empty($row)){
            return false;
        }else{
            return $row->id;
        }
    }
}