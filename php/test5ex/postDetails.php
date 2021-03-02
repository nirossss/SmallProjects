<?php 
    if(!isset($_GET['complainType']) || empty($_GET['complainType'])){
        echo "<h1>Error: complain type isnt set</h1>";
        exit;
    };
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ex php</title>
</head>
<body>
    <?php
        $problem = strtoupper(trim(htmlentities($_GET['complainType']))); 

        echo "<h1>complain about ";
        echo $problem . "</h1>" ;
    ?>

    <form action="" method="post">
        <input type="text" name="full_name" placeholder="Full name"><br />
        <input type="email" name="email" placeholder="Email"><br />
        <input type="number" name="phone" placeholder="Phone number"><br />
        male: <input type="radio" name="gender" value="male">
        female: <input type="radio" name="gender" value="female"><br/>
        <textarea name="user_text" cols="30" rows="10" maxlength="200" placeholder="Write your problem here"></textarea><br/>
        
        <input type="submit" value="send">
    </form>

    <?php
        if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['full_name']) && isset($_POST['email']) && isset($_POST['phone'])){
            $fullName = explode(" ", htmlentities($_POST['full_name']));
            $email = htmlentities($_POST['email']);
            $phone = (int)htmlentities($_POST['phone']);
            $userText = trim(htmlentities($_POST['user_text']));

            if(!isset($_POST['gender'])){
                echo "<p>please pick gender</p>";
                return;
            }
            $gender = htmlentities($_POST['gender']);

            if(count($fullName)<2){
                echo "<p>missing last name</p>";
                return;
            };
            if(empty($email)|| empty($phone)|| empty($gender)||empty($userText)){
                echo "<p>missing fields</p>";
                return;
            };
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                echo "<p>invalide email</p>";
                return;
            }

            $firstName = array_shift($fullName);
            $lastName = implode(" ", $fullName);

            echo "<p>Hello ";
            if($gender==="male"){
                echo "mr.";
            }elseif($gender==="female"){
                echo "mis.";
            };
            echo $lastName . "</p>";

            echo "<p>thank you, we got your msg:</p>";
            echo "<p>" . $userText . "</p>";

            echo "<p>email: " . $email . "</p>";
            echo "<p>phone: " . $phone . "</p>";
            echo "<p>gender: " . $gender . "</p>";
            echo "<p>full name: " . $firstName . " " . $lastName . "</p>";
        };
    ?>

</body>
</html>